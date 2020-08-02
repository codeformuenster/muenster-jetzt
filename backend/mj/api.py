import datetime
from typing import Optional

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from playhouse.shortcuts import model_to_dict

import mj
from mj.db import Event


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=['*'],
    allow_methods=['*'],
    allow_headers=['*'],
)


@app.get('/')
def root():
    return {'version': f'mj-{mj.__version__}'}


@app.get('/events')
def events(
        min_date: Optional[datetime.date] = None,
        max_date: Optional[datetime.date] = None,
        page: int = 1, limit: int = 50):
    """
    Get events. Retrieves events ordered by start_date and start_time.
    """
    events = Event.select().order_by(Event.start_date, Event.start_time)
    if min_date:
        events = events.where(Event.start_date >= min_date)
    if max_date:
        events = events.where(Event.start_date <= max_date)
    events = events.paginate(page, limit)
    return {'events': [model_to_dict(e) for e in events]}
