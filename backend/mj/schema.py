import datetime
from typing import List, Optional

from fastapi_camelcase import CamelModel
from pydantic import Field


class Location(CamelModel):
    id: int
    description: str = Field(title="The description of the location")


class Organizer(CamelModel):
    id: int
    name: str = Field(title="The name of the organizer")


class EventSource(CamelModel):
    id: int
    name: str = Field(title="The name of the event source")


class EventImage(CamelModel):
    id: int
    url: str
    description: Optional[str] = None
    source: Optional[str] = None


class Event(CamelModel):
    id: int = Field(title="Event ID")

    source: EventSource = Field(
        description="Web source from which event was scraped"
    )
    source_event_id: str = Field(
        title="Source Event ID", description="Event ID used at source"
    )
    source_url: Optional[str] = Field(
        None, title="Source URL", description="Event details URL at source"
    )
    source_license: Optional[str] = Field(
        None,
        title="Source License",
        description="License under which source published event data",
    )

    name: str
    description: str
    url: Optional[str] = Field(
        None, title="URL containing more information on the source page"
    )
    start_date: datetime.date = Field(
        title="Start Date formatted as ISO8601 (YYYY-MM-DD)"
    )
    start_time: Optional[datetime.time] = Field(
        None, title="Start Time (optional) formatted as (HH:MM:SS)"
    )
    end_date: Optional[datetime.date] = Field(
        None, title="End Date (optional) formatted as ISO8601 (YYYY-MM-DD)"
    )
    end_time: Optional[datetime.time] = Field(
        None, title="End Time (optional) formatted as (HH:MM:SS)"
    )
    location: Location
    performer: Optional[str] = None
    mode: Optional[str] = Field(
        None,
        title="The mode of the event",
        description="This field describes the mode of the event. Like some sort of category",
    )
    organizer: Optional[Organizer] = None
    images: List[EventImage]
