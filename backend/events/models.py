from django import forms
from django.contrib.postgres.fields import ArrayField
from django.db import models


class ChoiceArrayField(ArrayField):
    def formfield(self, **kwargs):
        defaults = {
            "form_class": forms.MultipleChoiceField,
            "widget": forms.CheckboxSelectMultiple,
            "choices": self.base_field.choices,
        }
        defaults.update(kwargs)
        return super(ArrayField, self).formfield(**defaults)


class Location(models.Model):
    def __str__(self):
        return self.description

    description = models.CharField(
        max_length=1023,
        unique=True,
        help_text="Description of event location (address or similar)",
    )
    lat = models.FloatField(
        null=True,
        blank=True,
        help_text="Latitude of the event location",
    )
    lon = models.FloatField(
        null=True,
        blank=True,
        help_text="Longitude of the event location",
    )
    geometry_source = models.CharField(
        max_length=1023,
        null=True,
        blank=True,
        help_text="Source of the geometry in lat and lon fields",
    )


class Organizer(models.Model):
    def __str__(self):
        return self.name

    name = models.CharField(
        max_length=255,
        unique=True,
        help_text="Name of event organizer",
    )


class EventSource(models.Model):
    def __str__(self):
        return self.name

    name = models.CharField(
        max_length=255,
        unique=True,
        help_text="Name of event source",
    )


class Event(models.Model):
    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=["source", "source_event_id"], name="unique_event"
            ),
        ]
        ordering = ["start_date", "start_time"]

    def __str__(self):
        return f"{self.name} ({self.start_date})"

    source = models.ForeignKey(
        "EventSource",
        on_delete=models.CASCADE,
        related_name="events",
        help_text="Source from which this event was gathered",
    )
    source_event_id = models.CharField(
        max_length=255,
        help_text="Event ID used at source",
    )
    source_url = models.CharField(
        max_length=4095,
        null=True,
        blank=True,
        help_text="Event details URL at source",
    )
    source_license = models.CharField(
        max_length=255,
        null=True,
        blank=True,
        help_text="License under which source published event data",
    )

    name = models.CharField(max_length=255, help_text="Event title")
    description = models.TextField(
        null=True,
        blank=True,
        help_text="Plain text event description and details",
    )
    formatted_description = models.TextField(
        null=True,
        blank=True,
        help_text=(
            "HTML event description and details (if available from source, "
            "otherwise matches plain text description). Will only contain "
            "these HTML tags: b, br, em, i, li, p, span, strong, ul."
        ),
    )
    url = models.CharField(
        max_length=4095,
        null=True,
        blank=True,
        help_text="Event website",
    )
    start_date = models.DateField(
        help_text="Start date as YYYY-MM-DD",
    )
    start_time = models.TimeField(
        null=True,
        blank=True,
        help_text="Start time as HH:MM:SS (optional)",
    )
    end_date = models.DateField(
        null=True,
        blank=True,
        help_text="Ende date as YYYY-MM-DD (optional)",
    )
    end_time = models.TimeField(
        null=True,
        blank=True,
        help_text="End time as HH:MM:SS (optional)",
    )
    location = models.ForeignKey(
        "Location",
        on_delete=models.CASCADE,
        related_name="events",
    )
    performer = models.CharField(
        max_length=255,
        null=True,
        blank=True,
        help_text="Main event performer (e.g. speaker, band, etc.)",
    )
    mode = models.CharField(
        max_length=255,
        null=True,
        blank=True,
        help_text="Event mode (e.g. presentation, meetup, etc.)",
    )
    organizer = models.ForeignKey(
        "Organizer",
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="events",
    )

    OVERRIDABLE_FIELDS = [
        (field, field)
        for field in [
            "source_url",
            "source_license",
            "name",
            "description",
            "formatted_description",
            "url",
            "start_date",
            "start_time",
            "end_date",
            "end_time",
            "location",
            "performer",
            "mode",
            "organizer",
        ]
    ]

    dirty_fields = ChoiceArrayField(
        models.CharField(max_length=63, choices=OVERRIDABLE_FIELDS),
        default=list,
        blank=True,
    )
    visible = models.BooleanField(default=True)


class EventImage(models.Model):

    event = models.ForeignKey(
        "Event", on_delete=models.CASCADE, related_name="images"
    )
    url = models.CharField(max_length=4095)
    description = models.CharField(max_length=4095, null=True, blank=True)
    source = models.CharField(max_length=4095, null=True, blank=True)
