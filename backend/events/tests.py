from unittest.mock import patch
from urllib.parse import parse_qs, urlsplit

from django.db import DatabaseError
from django.test import SimpleTestCase

from . import links

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
