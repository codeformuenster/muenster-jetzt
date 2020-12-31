from django_filters import FilterSet
from django_filters import rest_framework as filters
from rest_framework import viewsets
from rest_framework.renderers import JSONOpenAPIRenderer, OpenAPIRenderer
from rest_framework.schemas import get_schema_view

import mj

from .models import Event, EventSource, Location, Organizer
from .serializers import (
    EventSerializer,
    EventSourceSerializer,
    LocationSerializer,
    OrganizerSerializer,
)


schema_metadata = {
    "title": "Münster Jetzt API",
    "description": (
        "This is the OpenAPI v3 schema specification of the "
        "[Münster Jetzt](https://muenster-jetzt.de) API.<br>"
        "For more information, check out the "
        "[source code](https://github.com/codeformuenster/muenster-jetzt)."
    ),
    "version": mj.__version__,
}
schema_json = get_schema_view(
    **schema_metadata,
    renderer_classes=[JSONOpenAPIRenderer],
)
schema_yml = get_schema_view(
    **schema_metadata,
    renderer_classes=[OpenAPIRenderer],
)


class EventsFilterSet(FilterSet):

    location = filters.NumberFilter(label="Location ID to filter events for")
    organizer = filters.NumberFilter(label="Organizer ID to filter events for")
    minDate = filters.DateFilter(
        field_name="start_date",
        lookup_expr="gte",
        label="Earliest event start date",
    )
    maxDate = filters.DateFilter(
        field_name="start_date",
        lookup_expr="lte",
        label="Latest event start date",
    )


class EventsViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Event.objects.filter(visible=True)
    serializer_class = EventSerializer
    filterset_class = EventsFilterSet


class EventSourcesViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = EventSource.objects.all()
    serializer_class = EventSourceSerializer


class LocationsViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Location.objects.all()
    serializer_class = LocationSerializer


class OrganizersViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Organizer.objects.all()
    serializer_class = OrganizerSerializer
