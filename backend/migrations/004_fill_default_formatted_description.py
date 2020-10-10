"""Peewee migrations -- 004_fill_default_formatted_description.py. """


def migrate(migrator, database, fake=False, **kwargs):  # skipcq: PYL-W0613
    Event = migrator.orm["event"]
    Event.update({Event.formatted_description: Event.description}).execute()


def rollback(migrator, database, fake=False, **kwargs):  # skipcq: PYL-W0613
    pass
