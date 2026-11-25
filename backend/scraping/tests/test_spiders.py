import json
import os
import unittest
from datetime import date, datetime, time
from pathlib import Path
from types import SimpleNamespace
from unittest.mock import patch
from urllib.parse import parse_qs, unquote

from scrapy.exceptions import CloseSpider, DropItem
from scrapy.http import HtmlResponse, Request, TextResponse, XmlResponse
from scrapy.settings import Settings
from scrapy.spiderloader import SpiderLoader

from scraping.spiders import SanitizeHTMLPipeline, SpiderDefaultsPipeline
from scraping.spiders.ics import str_or_none
from scraping.spiders.ics.hafenkaeserei import HafenkaesereiSpider
from scraping.spiders.ics.peng_impro import PengImproSpider
from scraping.spiders.ics.rare_guitar import RareGuitarSpider
from scraping.spiders.ics.studierendenwerk_ms import (
    StudierendenwerkMsSpider,
)
from scraping.spiders.k3 import K3Spider
from scraping.spiders.muensterland import MuensterlandSpider
from scraping.spiders.muensterland_ev import MuensterlandEvSpider
from scraping.spiders.stadt_muenster_veranstaltungskalender import (
    StadtMuensterKalenderSpider,
)

FIXTURES = Path(__file__).parent / "fixtures"
K3_URL = (
    "http://download.k3.de/OpenData/"
    "Open_Data_Veranstaltungen_von_k3_stadtfuehrungen_FMPXMLRESULT.xml"
)
STADT_URL = (
    "https://www.muenster.de/veranstaltungskalender/scripts/frontend/"
    "suche.php"
)
DETAIL_URL = (
    "http://www.muenster.de/veranstaltungskalender/scripts/frontend/mm2/"
    "top-veranstaltung.php?id=11150&guestID=101"
)

ICS_SNAPSHOTS = (
    (
        HafenkaesereiSpider,
        "hafenkaeserei.ics",
        "Werksverkauf 2.0",
        date(2026, 11, 26),
    ),
    (
        PengImproSpider,
        "peng_impro.ics",
        "Stark-Strom-Impro",
        date(2026, 11, 30),
    ),
    (
        RareGuitarSpider,
        "rare_guitar.ics",
        "Electric Gypsies",
        date(2026, 11, 27),
    ),
    (
        StudierendenwerkMsSpider,
        "studierendenwerk_ms.ics",
        "Art Session",
        date(2026, 11, 26),
    ),
)

MINIMAL_ICS = """BEGIN:VCALENDAR
VERSION:2.0
BEGIN:VEVENT
UID:minimal@example.test
DTSTART:20261201T100000Z
DTEND:20261201T110000Z
SUMMARY:Minimal
END:VEVENT
END:VCALENDAR
"""


def fixture(name):
    return (FIXTURES / name).read_bytes()


def xml_response(name, url="http://example.test/feed.xml"):
    return XmlResponse(url, body=fixture(name))


def json_response(name, url="http://example.test/feed.json"):
    return TextResponse(url, body=fixture(name))


def html_response(name, url, request=None):
    return HtmlResponse(url, body=fixture(name), request=request)


class SpiderDiscoveryTests(unittest.TestCase):
    def test_all_spiders_are_discoverable_once(self):
        loader = SpiderLoader(
            Settings({"SPIDER_MODULES": ["scraping.spiders"]})
        )
        names = loader.list()
        self.assertEqual(
            set(names),
            {
                "hafenkaeserei",
                "k3",
                "muensterland",
                "muensterland_ev",
                "peng_impro",
                "rare_guitar",
                "stadt_muenster_kalender",
                "studierendenwerk_ms",
            },
        )
        self.assertEqual(len(names), len(set(names)))


class PipelineTests(unittest.TestCase):
    def test_defaults_only_fill_missing_values(self):
        item = {"source": "custom"}
        spider = SimpleNamespace(
            defaults={"source": "default", "source_license": "CC BY 4.0"}
        )
        self.assertEqual(
            SpiderDefaultsPipeline().process_item(item, spider),
            {"source": "custom", "source_license": "CC BY 4.0"},
        )

    def test_sanitize_keeps_allowed_tags_only_in_formatted_description(self):
        item = {"description": "<b>Safe</b><script>bad()</script>"}
        cleaned = SanitizeHTMLPipeline().process_item(item, object())
        self.assertEqual(cleaned["description"], "Safebad()")
        self.assertEqual(cleaned["formatted_description"], "<b>Safe</b>bad()")

    def test_unexpected_html_in_plain_field_drops_item(self):
        with self.assertRaises(DropItem):
            SanitizeHTMLPipeline().process_item(
                {"name": "<b>bad</b>"}, object()
            )


class K3SpiderTests(unittest.TestCase):
    def test_start_request_uses_the_opendata_url(self):
        self.assertEqual(next(K3Spider().start_requests()).url, K3_URL)

    def test_parses_munster_german_events_and_skips_others(self):
        events = list(K3Spider().parse(xml_response("k3.xml")))
        self.assertEqual(
            [event["source_event_id"] for event in events],
            ["50943", "51370"],
        )
        self.assertEqual(events[0]["name"], "Stadtrundfahrt Münster")
        self.assertEqual(events[0]["start_date"], datetime(2019, 1, 1))
        self.assertEqual(events[0]["start_time"], datetime(1900, 1, 1, 9, 50))
        self.assertEqual(events[0]["end_time"], datetime(1900, 1, 1, 17, 50))
        self.assertEqual(events[0]["location"], "Münster")
        self.assertEqual(events[0]["organizer"], "K3 Stadtführungen")


class MuensterlandSpiderTests(unittest.TestCase):
    def test_start_request_uses_the_configured_token(self):
        with patch.dict(os.environ, {"MUENSTERLAND_API_TOKEN": "token"}):
            request = next(MuensterlandSpider().start_requests())
        self.assertEqual(
            request.url,
            "https://www.digitalhub.ms/api/events?api_token=token",
        )

    def test_start_request_requires_a_token(self):
        with patch.dict(os.environ, {}, clear=True):
            with self.assertRaises(CloseSpider):
                list(MuensterlandSpider().start_requests())

    def test_parses_events_and_fills_missing_end_date(self):
        events = list(
            MuensterlandSpider().parse(json_response("digitalhub_events.json"))
        )
        self.assertEqual(
            [event["source_event_id"] for event in events],
            ["2507", "2506", "2508"],
        )
        self.assertEqual(events[0]["name"], "Hub Feuer - Jahresausklang")
        self.assertEqual(events[0]["start_date"], "2026-12-10")
        self.assertEqual(events[0]["start_time"], "18:00")
        self.assertEqual(events[0]["end_date"], "2026-12-10")
        self.assertEqual(events[0]["end_time"], "20:00")
        self.assertEqual(events[2]["end_date"], None)


class MuensterlandEvSpiderTests(unittest.TestCase):
    def test_start_request_requires_credentials(self):
        with patch.dict(os.environ, {}, clear=True):
            with self.assertRaises(ConnectionError):
                list(MuensterlandEvSpider().start_requests())

    def test_start_request_builds_a_basic_auth_url(self):
        with patch.dict(
            os.environ,
            {"DATENPORTAL_USER": "user", "DATENPORTAL_PASSWORD": "secret"},
        ):
            request = next(MuensterlandEvSpider().start_requests())
        self.assertTrue(
            request.url.startswith(
                "https://www.datenportal-muensterland.de/api/v1/events?"
            )
        )
        query = parse_qs(request.url.split("?", 1)[1])
        today = date.today().strftime("%Y-%m-%d")
        self.assertEqual(unquote(query["filter[starts_after]"][0]), today)
        self.assertEqual(query["sort"], ["events.start_datetime"])
        self.assertEqual(query["page[size]"], ["200"])
        self.assertTrue(
            request.headers["Authorization"].decode().startswith("Basic ")
        )

    @unittest.skipUnless(
        (FIXTURES / "datenportal_events.json").exists(),
        "Provide a real Datenportal API response snapshot to enable this",
    )
    def test_parses_a_real_datenportal_response(self):
        payload = json.loads(fixture("datenportal_events.json").decode())
        response = TextResponse(
            "http://example.test/events",
            body=json.dumps(payload).encode("utf-8"),
        )
        events = list(MuensterlandEvSpider().parse(response))
        self.assertEqual(len(events), len(payload["data"]))

        raw = payload["data"][0]
        event = events[0]
        address = raw["poi"]["name"]
        postal_code = raw["poi"]["address"]["postal_code"]
        city = raw["poi"]["address"]["city"]
        if postal_code and city:
            address += f", {postal_code} {city}"

        self.assertEqual(event["source_event_id"], str(raw["id"]))
        self.assertEqual(event["name"], raw["name"])
        self.assertEqual(event["description"], raw["description_text"])
        self.assertEqual(event["url"], raw["external_link"])
        self.assertEqual(
            event["start_date"], raw["start_datetime"].split("T")[0]
        )
        self.assertEqual(
            event["start_time"], raw["start_datetime"].split("T")[1]
        )
        self.assertEqual(event["end_date"], raw["end_datetime"].split("T")[0])
        self.assertEqual(event["end_time"], raw["end_datetime"].split("T")[1])
        self.assertEqual(event["location"], address)
        self.assertEqual(
            event["mode"],
            raw["types"][0]["name"] if raw.get("types") else None,
        )
        self.assertEqual(
            event["organizer"],
            (
                raw["event_organizers"][0]["name"]
                if raw.get("event_organizers")
                else None
            ),
        )


class StadtMuensterKalenderSpiderTests(unittest.TestCase):
    def test_start_request_uses_the_search_url(self):
        self.assertEqual(
            next(StadtMuensterKalenderSpider().start_requests()).url,
            STADT_URL,
        )

    def test_parse_submits_the_expected_form(self):
        response = html_response("stadt_suche.html", STADT_URL)
        request = next(StadtMuensterKalenderSpider().parse(response))
        self.assertEqual(request.method, "POST")
        self.assertEqual(
            request.url,
            "https://www.muenster.de/veranstaltungskalender/scripts/"
            "frontend/sucheVerarbeiten.php",
        )
        data = {k: v[0] for k, v in parse_qs(request.body.decode()).items()}
        self.assertEqual(data["zeitraum"], "heute")
        self.assertEqual(
            data["datum_von"], datetime.now().strftime("%d.%m.%Y")
        )
        self.assertEqual(data["volltextsuche-verknuepfung"], "und")
        self.assertEqual(data["zielgruppe"], "alle")
        self.assertEqual(data["submit"], "Suchen")

    def test_parse_eventlist_follows_detail_links(self):
        response = html_response(
            "stadt_results.html", "http://example.test/results.html"
        )
        requests = list(
            StadtMuensterKalenderSpider().parse_eventlist(response)
        )
        self.assertEqual(len(requests), 1)
        self.assertTrue(requests[0].url.endswith("id=11150&guestID=101"))

    def test_parse_event_extracts_title_date_and_description(self):
        response = html_response(
            "stadt_detail.html",
            DETAIL_URL,
            request=Request(DETAIL_URL),
        )
        events = list(StadtMuensterKalenderSpider().parse_event(response))
        self.assertEqual(len(events), 1)
        event = events[0]
        self.assertEqual(event["source_event_id"], DETAIL_URL)
        self.assertEqual(event["name"], "Frühjahrssend")
        self.assertEqual(event["start_date"], "2020-03-14")
        self.assertEqual(event["start_time"], "19:30")
        self.assertEqual(event["end_date"], None)
        self.assertEqual(event["location"], "")
        self.assertEqual(event["organizer"], "Schlossplatz")
        self.assertIn("Schaustellerbetriebe", event["description"])


class ICalendarSpiderTests(unittest.TestCase):
    def test_start_requests_use_each_calendar_url(self):
        for spider_class, _, _, _ in ICS_SNAPSHOTS:
            with self.subTest(spider=spider_class.name):
                spider = spider_class()
                self.assertEqual(
                    next(spider.start_requests()).url, spider.ics_url
                )

    def test_parses_real_calendar_snapshots(self):
        for spider_class, filename, needle, start in ICS_SNAPSHOTS:
            with self.subTest(spider=spider_class.name):
                response = TextResponse(
                    "http://example.test/events.ics", body=fixture(filename)
                )
                events = list(spider_class().parse(response))
                self.assertTrue(events)
                event = events[0]
                self.assertTrue(event["source_event_id"])
                self.assertIn(needle, event["name"])
                self.assertEqual(event["start_date"], start)
                self.assertIsInstance(event["start_time"], time)
                self.assertIsInstance(event["end_date"], date)
                self.assertIsInstance(event["end_time"], time)
                self.assertTrue(event["description"])

    def test_missing_optional_fields_are_none(self):
        response = TextResponse(
            "http://example.test/minimal.ics",
            body=MINIMAL_ICS.encode("utf-8"),
        )
        event = next(PengImproSpider().parse(response))
        self.assertEqual(event["name"], "Minimal")
        self.assertEqual(event["description"], None)
        self.assertEqual(event["url"], None)
        self.assertEqual(event["location"], None)
        self.assertEqual(event["organizer"], None)
        self.assertEqual(str_or_none({}, "SUMMARY"), None)
