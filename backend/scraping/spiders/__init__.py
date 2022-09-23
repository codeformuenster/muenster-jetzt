"""General spider functionality."""

import logging

import bleach
import scrapy
from geopy import Point
from django.db import transaction
from geopy.geocoders import Nominatim
from scrapy.exceptions import DropItem

from events.models import Event, EventSource, Location, Organizer


logger = logging.getLogger(__name__)


class SpiderDefaultsPipeline:
    def process_item(self, item, spider):
        for k, v in spider.defaults.items():
            item.setdefault(k, v)
        return item


class SanitizeHTMLPipeline:
    """Removes HTML tags from specified fields and ensures all other fields
    contain no HTML tags."""

    # Event fields to sanitize HTML from - dictionary values are a list of
    # allowed tags. All other fields are expected to be clean of HTML, and
    # items will be rejected if they contain unexpected HTML
    SANITIZE_FIELDS = {
        "description": [],
        "formatted_description": [
            "b",
            "br",
            "em",
            "i",
            "li",
            "p",
            "span",
            "strong",
            "ul",
        ],
    }

    def process_item(self, item, spider):  # skipcq: PYL-W0613
        if "description" in item:
            item["formatted_description"] = item["description"]
        for field in list(item):
            if not isinstance(item[field], str):
                continue
            cleaned_value = bleach.clean(
                item[field],
                tags=self.SANITIZE_FIELDS.get(field, []),
                strip=True,
            )
            if field in self.SANITIZE_FIELDS:
                item[field] = cleaned_value
            elif item[field] != cleaned_value.replace("&amp;", "&"):
                # The replace may seem quick-and-dirty-ish but it's the same
                # thing bleach does internally when checking HTML attributes
                logger.error(
                    "Item contains unexpected HTML in field '%s': %s",
                    field,
                    item,
                )
                raise DropItem(f"Unexpected HTML in {field}")
        return item


class DatabaseExportPipeline:
    def process_item(self, item, spider):
        with transaction.atomic():
            values = item.copy()

            # check if location is in DB. if not, geocode and add.
            try:
                location_description = item["location"]
                values["location"] = Location.objects.get(
                    description=location_description
                )
            except Location.DoesNotExist:
                logger.debug(f"Geocoding description {item['location']}...")
                # geocode location
                geolocator = Nominatim(
                    user_agent="muenster-jetzt",
                    view_box=[Point(51.8375, 7.471), Point(52.061, 7.775)],
                )
                location = geolocator.geocode(item["location"])
                if location:
                    # write location to database
                    values["location"], _ = Location.objects.get_or_create(
                        description=location_description,
                        geometry_source="Nominatim",
                        lat=location.latitude,
                        lon=location.longitude,
                    )
                else:
                    values["location"], _ = Location.objects.get_or_create(
                        description=location_description
                    )

            if item["organizer"]:
                values["organizer"], _ = Organizer.objects.get_or_create(
                    name=item["organizer"]
                )
            values["source"], _ = EventSource.objects.get_or_create(
                name=item["source"]
            )
            try:
                event = Event.objects.get(
                    source=values["source"],
                    source_event_id=values["source_event_id"],
                )
            except Event.DoesNotExist:
                event = Event()
            for k, v in values.items():
                if k not in event.dirty_fields:
                    setattr(event, k, v)
            event.save()
        return item


class EventSpider(scrapy.Spider):

    custom_settings = {
        "ITEM_PIPELINES": {
            "scraping.spiders.SpiderDefaultsPipeline": 100,
            "scraping.spiders.SanitizeHTMLPipeline": 200,
            "scraping.spiders.DatabaseExportPipeline": 900,
        },
        "CLOSESPIDER_ERRORCOUNT": 1,
    }

    defaults = {}

    def handle_error(self, failure):
        raise Exception("Scrapy returned the following error:", failure)
