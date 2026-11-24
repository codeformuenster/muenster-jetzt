from scraping.spiders.ics import ICalendarSpider


class RareGuitarSpider(ICalendarSpider):
    name = "rare_guitar"

    defaults = {
        "source": "Rare Guitar",
        "source_license": None,
    }

    ics_url = "https://bar.rareguitar.de/?ical=1&tribe_display=list"
