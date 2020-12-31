import os
from datetime import date

import scrapy
from w3lib.http import basic_auth_header

from scraping.spiders import EventSpider


class MuensterlandEvSpider(EventSpider):

    name = "muensterland_ev"

    defaults = {
        "source": "Münsterland e.V.",
        "source_license": None,
    }

    def start_requests(self):

        if not (
            os.getenv("DATENPORTAL_USER") and os.getenv("DATENPORTAL_PASSWORD")
        ):
            message = "Set DATENPORTAL_USER & DATENPORTAL_PASSWORD in .env"
            self.logger.error(message)
            raise ConnectionError(message)

        URL = "https://www.datenportal-muensterland.de/api/v1/events"
        USER = os.getenv("DATENPORTAL_USER")
        PASSWORD = os.getenv("DATENPORTAL_PASSWORD")

        # read events from API
        today = date.today()
        event_api_url = (
            URL
            + "?filter[starts_after]="
            + today.strftime("%Y-%m-%d")
            + "&sort=events.start_datetime"
            + "&page[size]=200"
        )

        auth = basic_auth_header(USER, PASSWORD)

        yield scrapy.Request(event_api_url, headers={"Authorization": auth})

    def parse(self, response):
        for event in response.json()["data"]:
            start_datetime = event["start_datetime"].split("T")
            end_datetime = event["end_datetime"].split("T")
            address = event["poi"]["name"]
            if (
                event["poi"]["address"]["postal_code"]
                and event["poi"]["address"]["city"]
            ):
                address += (
                    f', {event["poi"]["address"]["postal_code"]} '
                    f'{event["poi"]["address"]["city"]}'
                )

            yield {
                "source_event_id": str(event["id"]),
                "name": event["name"],
                "description": event["description_text"],
                "url": event["external_link"],
                "start_date": start_datetime[0],
                "start_time": start_datetime[1],
                "end_date": end_datetime[0],
                "end_time": end_datetime[1],
                "location": address,
                "mode": (
                    event["types"][0]["name"]
                    if ("types" in event) and len(event["types"]) > 0
                    else None
                ),
                "organizer": (
                    event["event_organizers"][0]["name"]
                    if ("event_organizers" in event)
                    and len(event["event_organizers"]) > 0
                    else None
                ),
            }
