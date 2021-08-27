from setuptools import setup

import mj


setup(
    name="mj",
    version=mj.__version__,
    description="Database management, data import, and API for muenster-jetzt",
    url="https://muenster-jetzt.de/",
    packages=["mj", "events", "scraping"],
    install_requires=[
        "bleach",
        "click",
        "django",
        "django-cors-headers",
        "django-filter",
        "djangorestframework",
        "djangorestframework-camel-case",
        "gunicorn",
        "icalendar",
        "markdown",
        "psycopg2-binary",
        "python-dotenv",
        "pyyaml",
        "scrapy",
        "uritemplate",
        "uvicorn[standard]",
    ],
)
