from scraping.spiders.ics import ICalendarSpider


class PengImproSpider(ICalendarSpider):
    name = "peng_impro"

    defaults = {
        "source": "Peng! Improvisationstheater GbR.",
        "source_license": None,
    }

    ics_url = "https://www.yesticket.org/ical/peng-impro.ics"
