from urllib.parse import parse_qs, urlsplit

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


class OpenAPISchemaTests(SimpleTestCase):
    def test_schema_contains_external_link(self):
        response = self.client.get("/openapi.json")
        self.assertEqual(response.status_code, 200)
        event = response.json()["components"]["schemas"]["Event"]
        self.assertIn("externalLink", event["properties"])
