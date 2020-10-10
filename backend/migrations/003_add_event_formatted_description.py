"""Peewee migrations -- 003_add_event_formatted_description.py. """

import peewee as pw


def migrate(migrator, database, fake=False, **kwargs):  # skipcq: PYL-W0613
    migrator.add_fields(
        "event",
        formatted_description=pw.TextField(default=""),
    )


def rollback(migrator, database, fake=False, **kwargs):  # skipcq: PYL-W0613
    migrator.remove_fields("event", "formatted_description")
