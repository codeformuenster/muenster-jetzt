# muenster-jetzt database management, data import, and API

Based on [Django](https://www.djangoproject.com/), [Django REST
framework](https://www.django-rest-framework.org/), and
[Scrapy](https://scrapy.org/).


## Development Quickstart

1. Copy `.env.example` to `.env` and edit it to match your local setup.
2. Create and activate a virtual environment. e.g. with: `python -m virtualenv .venv && .venv/bin/activate`

   Run only `.venv/bin/activate` to activate an existing environment

3. Install all dependencies via `pip install -r requirements.txt`
4. Run `./manage.py migrate` to migrate your database.
5. Run `./manage.py crawl` to crawl events and store them in your database.
6. Run `./manage.py runserver` to start the API. Append `0.0.0.0:8000` if you want to expose the dev server.


# Database schema

The database schema is managed via Django. If you need to alter it, just add a
new model in `events/models.py` (or edit an existing one) and run `./manage.py
makemigrations` to create a new migration.


## Naming Convention

Whenever you need to name a property, try to use the name that is used in https://schema.org/ e.g. for events take a look at: https://schema.org/Event


## Dependency management

We're using [pip-tools](https://github.com/jazzband/pip-tools) to make sure all deployments are using the same dependency versions.

If you want to add a new dependency, add it into the `setup.py` file and run `pip-compile`. Don't forget to run `pip install -r requirements.txt` to install your added/updated dependency.
