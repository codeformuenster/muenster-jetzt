"""Peewee migrations -- 002_event_images.py."""

import peewee as pw


def migrate(migrator, database, fake=False, **kwargs):  # skipcq: PYL-W0613
    @migrator.create_model
    class EventImage(pw.Model):  # skipcq: PYL-W0612
        id = pw.AutoField()
        event = pw.ForeignKeyField(
            backref="images",
            column_name="event_id",
            field="id",
            model=migrator.orm["event"],
        )
        url = pw.CharField(max_length=4095)
        description = pw.CharField(max_length=4095, null=True)
        source = pw.CharField(max_length=1023, null=True)

        class Meta:
            table_name = "eventimage"


def rollback(migrator, database, fake=False, **kwargs):  # skipcq: PYL-W0613
    migrator.remove_model("eventimage")
