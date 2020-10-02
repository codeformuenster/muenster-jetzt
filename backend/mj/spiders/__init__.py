import scrapy

from mj.db import db, Event, EventSource, Location, Organizer


class SpiderDefaultsPipeline:
    def process_item(self, item, spider):
        for k, v in spider.defaults.items():
            item.setdefault(k, v)
        return item


class DatabaseExportPipeline:
    def process_item(self, item, spider):
        with db.transaction():
            values = item.copy()
            values["location"], _ = Location.get_or_create(
                description=item["location"]
            )
            if item["organizer"]:
                values["organizer"], _ = Organizer.get_or_create(
                    name=item["organizer"]
                )
            values["source"], _ = EventSource.get_or_create(
                name=item["source"]
            )
            try:
                event = Event.get(
                    source=values["source"],
                    source_event_id=values["source_event_id"],
                )
            except Event.DoesNotExist:
                event = Event()
            for k, v in values.items():
                setattr(event, k, v)
            event.save()
        return item


class EventSpider(scrapy.Spider):

    custom_settings = {
        "ITEM_PIPELINES": {
            "mj.spiders.SpiderDefaultsPipeline": 100,
            "mj.spiders.DatabaseExportPipeline": 900,
        },
    }

    defaults = {}
