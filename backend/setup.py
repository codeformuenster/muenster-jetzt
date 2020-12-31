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
        "djangorestframework",
        "djangorestframework-camel-case",
        "django-filter",
        "gunicorn",
        "python-dotenv",
        "psycopg2-binary",
        "scrapy",
        "uritemplate",
        "uvicorn[standard]",
        "pyyaml",
    ],
)
