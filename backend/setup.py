from setuptools import setup

import mj

setup(
    name="mj",
    version=mj.__version__,
    description="Database management, data import, and API for "
    "muenster-update",
    url="https://muenster-update.de/",
    packages=["mj", "events", "scraping"],
    install_requires=[
        "black",
        "bleach",
        "click",
        "django>=5.2,<6",  # 5.2 LTS
        "django-cors-headers",
        "django-filter<25",  # 25.x dropped DRF schema generation support
        "djangorestframework",
        "djangorestframework-camel-case",
        "flake8",
        "geopy",
        "gunicorn",
        "icalendar",
        "inflection",  # OpenAPI schema generation (DRF)
        "markdown",
        "pip-tools",
        "psycopg2-binary",
        "python-dotenv",
        "pyyaml",
        "scrapy",
        "uritemplate",
        "uvicorn[standard]",
    ],
)
