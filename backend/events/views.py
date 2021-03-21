from django_filters import FilterSet
from django_filters import rest_framework as filters
from rest_framework import viewsets, routers
from rest_framework.renderers import JSONOpenAPIRenderer, OpenAPIRenderer
from rest_framework.schemas import get_schema_view

import mj

from .models import Event
from .serializers import EventSerializer


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
    """
    Anfragen an die `/events` Schnittstelle geben die aktuell in der Datenbank
    verfügbare Veranstaltungen zurück.
    """

    queryset = Event.objects.filter(visible=True)
    serializer_class = EventSerializer
    filterset_class = EventsFilterSet


class MünsterJetztView(routers.APIRootView):
    """
    ## Willkommen auf der API-Dokumentation zu [Münster Jetzt].

    Über die [Münster Jetzt] API können Anwendungen maschinenlesbare
    Veranstaltungsinformationen abrufen.

    Herzstück des Datenschemas sind die [Events](/events).

    [Münster Jetzt]: https://muenster-jetzt.de
    """

    pass


class DocumentedRouter(routers.DefaultRouter):
    APIRootView = MünsterJetztView
