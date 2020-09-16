import os

import dotenv
import peewee
from playhouse.postgres_ext import PostgresqlExtDatabase

dotenv.load_dotenv()
db = PostgresqlExtDatabase(
    os.getenv('DB_NAME'),
    user=os.getenv('DB_USER'),
    password=os.getenv('DB_PASSWORD'),
    host=os.getenv('DB_HOST'),
    port=os.getenv('DB_PORT'),
)


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


class EventImage(MJModel):
    id = peewee.AutoField()
    event = peewee.ForeignKeyField(Event, backref='images')
    url = peewee.CharField(max_length=4095)
    description = peewee.CharField(max_length=4095, null=True)
    source = peewee.CharField(max_length=1023, null=True)
