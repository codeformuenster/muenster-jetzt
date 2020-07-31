# muenster-jetzt database management, data import, and API

Based on [peewee](https://peewee-orm.com/), [Scrapy](https://scrapy.org/), and
[FastAPI](https://fastapi.tiangolo.com/).

## Development Quickstart

1. Copy `.env.example` to `.env` and edit it to match your local setup.
2. Run `python -m virtualenv .venv && .venv/bin/activate` to create an activate
   a virtual environment for Python packages.

   (Whenever you want to develop, run `.venv/bin/activate` to activate the
   existing environment.)
3. Install all dependencies via `pip install -r requirements.txt`.
4. Run `python -m mj migrate` to migrate your database.
5. Run `python -m mj crawl` to crawl events and store them in your database.
6. Run `python -m mj serve` to start the API.


## Naming Convention

Whenever you need to name a property, try to use the name that is used in https://schema.org/ e.g. for events take a look at: https://schema.org/Event
