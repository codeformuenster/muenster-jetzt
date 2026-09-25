from scraping.spiders.ics import ICalendarSpider


class HafenkaesereiSpider(ICalendarSpider):
    name = "hafenkaeserei"

    defaults = {
        "source": "Genusshafen Münster GmbH",
        "source_license": None,
    }

    ics_url = "https://hafenkaeserei.de/?ical=1"
