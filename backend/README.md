# muenster-jetzt database management, data import, and API

Based on [peewee](https://peewee-orm.com/), [Scrapy](https://scrapy.org/), and
[FastAPI](https://fastapi.tiangolo.com/).

## Development Quickstart

1. Copy `.env.example` to `.env` and edit it to match your local setup.
2. Create and activate a virtual environment. e.g. with: `python -m virtualenv .venv && .venv/bin/activate`

   Run only `.venv/bin/activate` to activate an existing environment

3. Install all dependencies via `pip install -r requirements.txt`
4. Run `python -m mj migrate` to migrate your database.
5. Run `python -m mj crawl` to crawl events and store them in your database.
6. Run `python -m mj serve` to start the API.

## Naming Convention

Whenever you need to name a property, try to use the name that is used in https://schema.org/ e.g. for events take a look at: https://schema.org/Event

## Dependency management

We're using [pip-tools](https://github.com/jazzband/pip-tools) to make sure all deployments are using the same dependency versions.
