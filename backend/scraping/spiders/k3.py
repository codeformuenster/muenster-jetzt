import os
from datetime import date

import scrapy

from scraping.spiders import EventSpider


class K3Spider(EventSpider):

    name = "k3"

    defaults = {
        "source": "k3",
        "source_license": "CC BY 3.0 DE",
    }

    def start_requests(self):

        URL = "http://download.k3.de/OpenData/Open_Data_Veranstaltungen_von_k3_stadtfuehrungen_FMPXMLRESULT.xml"

        yield scrapy.Request(
            URL,
            errback=self.handle_error,
        )

    def parse(self, response):
        response.selector.register_namespace(
            "k3", "http://www.filemaker.com/fmpxmlresult"
        )

        fields = [
            field.xpath("@NAME").get()
            for field in response.xpath(
                "//k3:FMPXMLRESULT/k3:METADATA/k3:FIELD"
            )
        ]

        for item in response.xpath("//k3:FMPXMLRESULT/k3:RESULTSET/k3:ROW"):

            raw_data = [
                i.xpath("text()").get() for i in item.xpath("k3:COL/k3:DATA")
            ]

            if raw_data[1] != "Münster":
                continue

            event_data = dict(zip(fields, raw_data))

            # address = query by nominatim
            # start parse + format

            event = {
                "source_event_id": str(event_data["Nummer"]),
                "name": (
                    f"{event_data['Veranstaltung']} {event_data['Stadt']}"
                ).strip(),
                "description": event_data["Beschreibung"],
                "url": event_data["Buchungslink"],
                "start_date": event_data["Datum"],
                "start_time": event_data["UhrzeitBeginn"],
                "end_date": event_data["Datum"],
                "end_time": event_data["UhrzeitEnde"],
                # "location": address,
                "mode": event_data["Veranstaltung"],
                "organizer": "K3 Stadtführungen",
            }

            yield event
