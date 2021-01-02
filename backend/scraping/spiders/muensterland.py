import os

import scrapy
from scrapy.exceptions import CloseSpider

from scraping.spiders import EventSpider


class MuensterlandSpider(EventSpider):

    name = "muensterland"

    defaults = {
        "source": "münsterLAND.digital",
        "source_license": "CC BY-SA 4.0",
    }

    def start_requests(self):
        api_token = os.getenv("MUENSTERLAND_API_TOKEN")
        if not api_token:
            self.logger.error(
                "Please set the MUENSTERLAND_API_TOKEN environment variable"
            )
            raise CloseSpider("missing_auth")
        yield scrapy.Request(
            f"https://www.muensterland.digital/api/"
            f"events?api_token={api_token}",
            errback=self.handle_error,
        )

    @staticmethod
    def parse(response):
        for event in response.json()["data"]:
            if event["end_time"] and not event["end_date"]:
                event["end_date"] = event["start_date"]
            yield {
                "source_event_id": str(event["id"]),
                "name": event["title"],
                "description": event["desc"],
                "url": event["link_url"],
                "start_date": event["start_date"],
                "start_time": event["start_time"],
                "end_date": event["end_date"],
                "end_time": event["end_time"],
                "location": event["address"],
                "performer": event["speaker"],
                "mode": event["mode"],
                "organizer": event["organizer"],
            }
