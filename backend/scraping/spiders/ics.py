import scrapy

from icalendar import Calendar
from scraping.spiders import EventSpider


def str_or_none(vevent_item, key):

    v = vevent_item.get(key)

    if v is None:
        return v

    return str(v)


class ICalendarSpider(EventSpider):
    def start_requests(self):
        yield scrapy.Request(
            self.ics_url,
            errback=self.handle_error,
        )

    @staticmethod
    def parse(self, response):

        ics_data = Calendar.from_ical(response.text)

        for item in ics_data.walk("vevent"):

            clean_name = str(item["SUMMARY"])
            prefix = f"{item['DTSTART'].dt.strftime('%d.%m.%Y')} - "
            if clean_name.startswith(prefix):
                clean_name = clean_name.replace(prefix, "")

            event = {
                "source_event_id": str(item["UID"]),
                "name": clean_name.strip(),
                "description": str_or_none(item, "DESCRIPTION"),
                "url": str_or_none(item, "URL"),
                "start_date": item["DTSTART"].dt.date(),
                "start_time": item["DTSTART"].dt.time(),
                "end_date": item["DTEND"].dt.date(),
                "end_time": item["DTEND"].dt.time(),
                "location": str_or_none(item, "LOCATION"),
                # "mode": event_data["Veranstaltung"],
                "organizer": str_or_none(item, "ORGANIZER"),
            }

            yield event



class PengImproSpider(ICalendarSpider):

    name = "kshg"

    defaults = {
        "source": "Eine-Welt-Forum Münster e.V.",
        "source_license": None,
    }

    ics_url = "https://www.peng-impro.de/termine/liste/?ical=1"  # noqa
