import datetime
from typing import Optional

from fastapi_camelcase import CamelModel
from pydantic import Field


class Location(CamelModel):
    id: int
    description: str


class Organizer(CamelModel):
    id: int
    name: str


class EventSource(CamelModel):
    id: int
    name: str


class Event(CamelModel):
    id: int

    source: EventSource = Field(
        description='Web source from which event was scraped')
    source_event_id: str = Field(
        title="Source Event ID", description="Event ID used at source")
    source_url: Optional[str] = Field(
        None, title="Source URL", description="Event details URL at source")
    source_license: Optional[str] = Field(
        None,
        title="Source License",
        description="License under which source published event data")

    name: str
    description: str
    url: Optional[str] = Field(None, title="URL")
    start_date: datetime.date = Field(title="Start Date")
    start_time: Optional[datetime.time] = Field(None, title="Start Time")
    end_date: Optional[datetime.date] = Field(None, title="End Date")
    end_time: Optional[datetime.time] = Field(None, title="End Time")
    location: Location
    performer: Optional[str] = None
    mode: Optional[str] = None
    organizer: Optional[Organizer] = None
