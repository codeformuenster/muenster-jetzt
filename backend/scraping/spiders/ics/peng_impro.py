from scraping.spiders.ics import ICalendarSpider


class PengImproSpider(ICalendarSpider):

    name = "peng_impro"

    defaults = {
        "source": "Peng! Improvisationstheater GbR.",
        "source_license": None,
    }

    ics_url = "https://www.peng-impro.de/termine/liste/?ical=1"  # noqa
