import datetime
from typing import List, Optional

from fastapi import FastAPI, Query
from fastapi_camelcase import CamelModel
from fastapi.middleware.cors import CORSMiddleware
from playhouse.shortcuts import model_to_dict

import mj
from mj import schema
from mj.db import Event


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=['*'],
    allow_methods=['*'],
    allow_headers=['*'],
)


class RootResponse(CamelModel):
    version: str


@app.get('/', response_model=RootResponse)
def root():
    return {'version': f'mj-{mj.__version__}'}


class EventsResponse(CamelModel):
    events: List[schema.Event]


@app.get('/events', response_model=EventsResponse)
def events(
        min_date: Optional[datetime.date] = Query(
            None, alias="minDate", description="Earliest start date"),
        max_date: Optional[datetime.date] = Query(
            None, alias="maxDate", description="Latest start date"),
        page: int = Query(1, description="Page number"),
        limit: int = Query(50, description="Results per page")):
    events = Event.select().order_by(Event.start_date, Event.start_time)
    if min_date:
        events = events.where(Event.start_date >= min_date)
    if max_date:
        events = events.where(Event.start_date <= max_date)
    events = events.paginate(page, limit)
    return {'events': [model_to_dict(e) for e in events]}
