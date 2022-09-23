from datetime import datetime, timedelta

import scrapy

from scrapy.http import FormRequest
from scraping.spiders import EventSpider


class StadtMuensterKalenderSpider(EventSpider):

    name = "stadt_muenster_kalender"

    defaults = {
        "source": "Stadt Münster",
        "source_license": None,
    }

    def start_requests(self):
        URL = "https://www.muenster.de/veranstaltungskalender/scripts/frontend/suche.php"

        yield scrapy.Request(
            URL,
            errback=self.handle_error,
        )

    def parse(self, response):
        start_date = datetime.now()
        end_date = start_date + timedelta(days=5)
        formdata = {
            "zeitraum": "heute",  # use string "zeitraum"(!) instead of "heute" to get results for all days, not only for the first
            "datum_von": start_date.strftime("%d.%m.%Y"),
            "datum_bis": end_date.strftime("%d.%m.%Y"),
            "suchstring": "",
            "volltextsuche-verknuepfung": "und",
            "zielgruppe": "alle",
            "submit": "Suchen",
        }

        self.logger.debug(
            "-----------------------------------------------------------------------> formdata: %s",
            formdata,
        )

        yield FormRequest.from_response(
            response,
            formdata=formdata,
            clickdata={"name": "submit"},
            callback=self.parse_eventlist,
        )

    def parse_eventlist(self, response):
        for event in response.css("div.eintrag div.location"):
            event_link = event.css("a.intern::attr(href)").get()
            yield response.follow(event_link, callback=self.parse_event)

    def parse_event(self, response):
        for element in response.css("div.veranstaltungs-details"):

            title = element.css("div.titel::text").get().strip()

            # Parse a date string like "Freitag, 23.9.2022, 20.00 Uhr"
            date_complete = (
                element.css("div.datum-uhrzeit::text").get().strip()
            )
            dateparts = date_complete.split(",")
            date_day = dateparts[0].strip()  # e.g. "Montag"
            date_date = dateparts[1].strip()
            date_time = dateparts[2].strip().replace(".", ":")[0:5]

            parsed_date = str(datetime.strptime(date_date, "%d.%m.%Y"))[0:10]

            self.logger.debug("event: %s", title)
            self.logger.debug(
                "date: '%s' ---> '%s' '%s'",
                date_complete,
                parsed_date,
                date_time,
            )

            location = element.css("div.location-adresse::text").get().strip()

            # TODO: What to do with these values?
            untertitel = element.css("div.untertitel").get()
            link = element.css("div.detail-link").get()

            # TODO: We should parse the date string format for end time, instead of setting it to None
            end_datetime = None

            yield {
                "source_event_id": str(response.request.url),
                "name": title,
                "description": element.css("div.detailbeschreibung::text")
                .get()
                .strip(),
                "url": response.request.url,
                "start_date": parsed_date,
                "start_time": (date_time if date_time else None),
                "end_date": end_datetime,
                "end_time": end_datetime,
                "location": location,
                # "mode": None,
                "organizer": element.css("div.location::text").get().strip(),
            }
