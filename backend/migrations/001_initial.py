"""Peewee migrations -- 001_initial.py. """

import peewee as pw


def migrate(migrator, database, fake=False, **kwargs):  # skipcq: PYL-W0613
    @migrator.create_model
    class EventSource(pw.Model):  # skipcq: PYL-W0612
        id = pw.AutoField()
        name = pw.CharField(max_length=255, unique=True)

        class Meta:
            table_name = "eventsource"

    @migrator.create_model
    class Location(pw.Model):  # skipcq: PYL-W0612
        id = pw.AutoField()
        description = pw.CharField(max_length=255, unique=True)

        class Meta:
            table_name = "location"

    @migrator.create_model
    class Organizer(pw.Model):  # skipcq: PYL-W0612
        id = pw.AutoField()
        name = pw.CharField(max_length=255, unique=True)

        class Meta:
            table_name = "organizer"

    @migrator.create_model
    class Event(pw.Model):  # skipcq: PYL-W0612
        id = pw.AutoField()
        source = pw.ForeignKeyField(
            backref="event_set",
            column_name="source_id",
            field="id",
            model=migrator.orm["eventsource"],
        )
        source_event_id = pw.CharField(max_length=255)
        source_url = pw.CharField(max_length=4095, null=True)
        source_license = pw.CharField(max_length=255, null=True)
        name = pw.TextField()
        description = pw.TextField()
        url = pw.CharField(max_length=4095, null=True)
        start_date = pw.DateField()
        start_time = pw.TimeField(null=True)
        end_date = pw.DateField(null=True)
        end_time = pw.TimeField(null=True)
        location = pw.ForeignKeyField(
            backref="event_set",
            column_name="location_id",
            field="id",
            model=migrator.orm["location"],
        )
        performer = pw.CharField(max_length=255, null=True)
        mode = pw.CharField(max_length=255, null=True)
        organizer = pw.ForeignKeyField(
            backref="event_set",
            column_name="organizer_id",
            field="id",
            model=migrator.orm["organizer"],
            null=True,
        )

        class Meta:
            table_name = "event"
            indexes = [(("source", "source_event_id"), True)]


def rollback(migrator, database, fake=False, **kwargs):  # skipcq: PYL-W0613
    migrator.remove_model("event")
    migrator.remove_model("organizer")
    migrator.remove_model("location")
    migrator.remove_model("eventsource")
