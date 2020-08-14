import datetime
from typing import Optional

from fastapi_camelcase import CamelModel


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

    source: EventSource
    source_event_id: str
    source_url: Optional[str] = None
    source_license: Optional[str] = None

    name: str
    description: str
    url: Optional[str] = None
    start_date: datetime.date
    start_time: Optional[datetime.time] = None
    end_date: Optional[datetime.date] = None
    end_time: Optional[datetime.time] = None
    location: Location
    performer: Optional[str] = None
    mode: Optional[str] = None
    organizer: Optional[Organizer] = None
