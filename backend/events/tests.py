from unittest.mock import MagicMock, patch
from urllib.parse import parse_qs, urlsplit

from django.conf import settings
from django.db import DatabaseError
from django.middleware.csrf import CsrfViewMiddleware
from django.test import RequestFactory, SimpleTestCase

from . import links
from .views import pending_migrations

EVENT_URL = "https://www.muenster.de/veranstaltungen/?id=1&lang=de"


class ExternalLinkTests(SimpleTestCase):
    def _query(self, link):
        return {k: v[0] for k, v in parse_qs(urlsplit(link).query).items()}

    def test_link_roundtrip_redirects(self):
        link = links.external_link(EVENT_URL)
        self.assertTrue(link.startswith("/external/?"))
        self.assertEqual(self._query(link)["url"], EVENT_URL)

        response = self.client.get(link)
        self.assertEqual(response.status_code, 302)
        self.assertEqual(response["Location"], EVENT_URL)
        self.assertEqual(response["Referrer-Policy"], "no-referrer")

    def test_unsigned_url_is_rejected(self):
        response = self.client.get(
            "/external/", {"url": "https://spam.example/"}
        )
        self.assertEqual(response.status_code, 403)

    def test_signature_of_other_url_is_rejected(self):
        sig = links.sign(EVENT_URL)
        response = self.client.get(
            "/external/", {"url": "https://spam.example/", "sig": sig}
        )
        self.assertEqual(response.status_code, 403)

    def test_unusable_urls_get_no_link(self):
        bad = (None, "", "javascript:alert(1)", "//spam.example", "ftp://x")
        for url in bad:
            self.assertIsNone(links.external_link(url), url)

    def test_post_not_allowed(self):
        link = links.external_link(EVENT_URL)
        self.assertEqual(self.client.post(link).status_code, 405)


class HealthTests(SimpleTestCase):
    def test_health_endpoint(self):
        response = self.client.get("/healthz")
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json(), {"status": "ok"})


class ReadinessTests(SimpleTestCase):
    @patch("events.views.pending_migrations", return_value=set())
    def test_ready_without_pending_migrations(self, _):
        response = self.client.get("/readyz")
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json(), {"status": "ok"})

    @patch(
        "events.views.pending_migrations",
        return_value={("events", "0001_initial")},
    )
    def test_not_ready_with_pending_migrations(self, _):
        response = self.client.get("/readyz")
        self.assertEqual(response.status_code, 503)

    @patch(
        "events.views.pending_migrations",
        side_effect=DatabaseError("down"),
    )
    def test_not_ready_when_database_is_unavailable(self, _):
        response = self.client.get("/readyz")
        self.assertEqual(response.status_code, 503)
        self.assertEqual(response.json(), {"status": "database unavailable"})


class OpenAPISchemaTests(SimpleTestCase):
    def test_schema_contains_external_link(self):
        response = self.client.get("/openapi.json")
        self.assertEqual(response.status_code, 200)
        event = response.json()["components"]["schemas"]["Event"]
        self.assertIn("externalLink", event["properties"])


class PendingMigrationTests(SimpleTestCase):
    def test_applied_migrations_from_recorder_are_a_dict(self):
        graph = MagicMock()
        graph.leaf_nodes.return_value = [("events", "0002_second")]
        graph.forwards_plan.return_value = [
            ("events", "0001_initial"),
            ("events", "0002_second"),
        ]

        with (
            patch("events.views.MigrationLoader") as loader,
            patch("events.views.MigrationRecorder") as recorder,
        ):
            loader.return_value.graph = graph
            recorder.return_value.applied_migrations.return_value = {
                ("events", "0001_initial"): "2026-01-01 00:00:00"
            }

            self.assertEqual(pending_migrations(), {("events", "0002_second")})


class CsrfOriginTests(SimpleTestCase):
    def _request(self, origin):
        return RequestFactory().post(
            "/admin/login/",
            HTTP_HOST="testserver",
            HTTP_ORIGIN=origin,
            HTTP_X_FORWARDED_PROTO="https",
        )

    def test_same_https_origin_is_accepted(self):
        self.assertTrue(
            CsrfViewMiddleware(lambda request: None)._origin_verified(
                self._request("https://testserver")
            )
        )

    def test_foreign_origin_is_rejected(self):
        self.assertFalse(
            CsrfViewMiddleware(lambda request: None)._origin_verified(
                self._request("https://evil.example")
            )
        )


class SettingsTests(SimpleTestCase):
    def test_localhost_is_not_a_trusted_csrf_origin(self):
        self.assertNotIn("https://localhost", settings.CSRF_TRUSTED_ORIGINS)

    def test_trusted_csrf_origins_include_a_scheme(self):
        self.assertTrue(
            all(
                origin.startswith("https://")
                for origin in settings.CSRF_TRUSTED_ORIGINS
            )
        )

    def test_proxy_tls_header_is_enabled(self):
        self.assertEqual(
            settings.SECURE_PROXY_SSL_HEADER,
            ("HTTP_X_FORWARDED_PROTO", "https"),
        )


class LoggingTests(SimpleTestCase):
    def test_access_logs_go_to_stdout(self):
        self.assertEqual(
            settings.LOGGING["loggers"]["django.server"]["handlers"],
            ["stdout"],
        )
        self.assertEqual(
            settings.LOGGING["handlers"]["stdout"]["stream"],
            "ext://sys.stdout",
        )

    def test_request_errors_go_to_stderr(self):
        self.assertEqual(
            settings.LOGGING["loggers"]["django.request"]["handlers"],
            ["stderr"],
        )
        self.assertEqual(
            settings.LOGGING["handlers"]["stderr"]["stream"],
            "ext://sys.stderr",
        )
