from scraping.spiders.ics import ICalendarSpider


class StudierendenwerkMsSpider(ICalendarSpider):

    name = "studierendenwerk_ms"

    defaults = {
        "source": "Studierendenwerk Münster",
        "source_license": None,
    }

    ics_url = "https://stw-muenster.de/events/?ical=1"
