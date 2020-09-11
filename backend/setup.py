from setuptools import setup

import mj


setup(
    name='mj',
    version=mj.__version__,
    description='Database management, data import, and API for muenster-jetzt',
    url='https://muenster-jetzt.de/',
    packages=['mj'],
    install_requires=[
        'click',
        'python-dotenv',
        'fastapi',
        'fastapi-camelcase',
        'peewee',
        'psycopg2-binary',
        'requests',
        'scrapy',
        'uvicorn',
    ],
)
