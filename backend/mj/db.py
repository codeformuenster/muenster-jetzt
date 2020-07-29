import os

import peewee
from playhouse.db_url import connect


DATABASE_URL = os.getenv(
    'DATABASE_URL', 'postgres://postgres:pgpass@localhost:5432/muensterjetzt')


db = connect(DATABASE_URL)


class MJModel(peewee.Model):
    class Meta:
        database = db


class Location(MJModel):
    id = peewee.AutoField()
    description = peewee.CharField(unique=True)


class Organizer(MJModel):
    id = peewee.AutoField()
    name = peewee.CharField(unique=True)


class EventSource(MJModel):
    id = peewee.AutoField()
    name = peewee.CharField(unique=True)


class Event(MJModel):
    class Meta:
        indexes = (
            (('source', 'source_event_id'), True),
        )

    id = peewee.AutoField()

    source = peewee.ForeignKeyField(EventSource)
    source_event_id = peewee.CharField()
    source_url = peewee.CharField(max_length=4095, null=True)
    source_license = peewee.CharField(null=True)

    name = peewee.TextField()
    description = peewee.TextField()
    url = peewee.CharField(max_length=4095, null=True)
    start_date = peewee.DateField()
    start_time = peewee.TimeField(null=True)
    end_date = peewee.DateField(null=True)
    end_time = peewee.TimeField(null=True)
    location = peewee.ForeignKeyField(Location)
    performer = peewee.CharField(null=True)
    mode = peewee.CharField(null=True)
    organizer = peewee.ForeignKeyField(Organizer, null=True)