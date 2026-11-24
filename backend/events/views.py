from django.db import DatabaseError, connection
from django.db.migrations.loader import MigrationLoader
from django.db.migrations.recorder import MigrationRecorder
from django.http import (
    HttpResponseForbidden,
    HttpResponseRedirect,
    JsonResponse,
)
from django.views.decorators.http import require_safe
from django_filters import FilterSet
from django_filters import rest_framework as filters
from rest_framework import viewsets, routers
from rest_framework.renderers import JSONOpenAPIRenderer, OpenAPIRenderer
from rest_framework.schemas import get_schema_view

import mj

from . import links
from .models import Event, EventSource, Location, Organizer
from .serializers import (
    EventSerializer,
    EventSourceSerializer,
    LocationSerializer,
    OrganizerSerializer,
)

schema_metadata = {
    "title": "Münster Update API",
    "description": (
        "This is the OpenAPI v3 schema specification of the "
        "[Münster Update](https://muenster-update.de) API.<br>"
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
    verfügbaren Veranstaltungen zurück.

    Über die Parameter `minDate` und `maxDate` lässt sich die Rückgabemenge
    bezüglich des Anfangs der Veranstaltungen beschränken.
    Datumsformat hier ist `JJJJ-MM-DD` (ISO 8601).

    Mittels Parametern `location` und `organizer` lassen sich Veranstaltungen
    für bestimmte [Orte](/locations) und oder [Veranstalter](/organizers)
    filtern. Beide Parameter

    Weitere Informationen zum Rückgabeschema und Parametern im
    [Swagger UI](/docs/) oder [ReDoc](/redoc/).
    """

    queryset = Event.objects.filter(visible=True)
    serializer_class = EventSerializer
    filterset_class = EventsFilterSet


class EventSourcesViewSet(viewsets.ReadOnlyModelViewSet):
    """
    Anfragen an die `/sources` Schnittstelle geben die aktuell in der Datenbank
    verfügbaren Quellen von Veranstaltungen zurück.

    Weitere Informationen zum Rückgabeschema und Parametern im
    [Swagger UI](/docs/) oder [ReDoc](/redoc/).
    """

    queryset = EventSource.objects.all()
    serializer_class = EventSourceSerializer


class LocationsViewSet(viewsets.ReadOnlyModelViewSet):
    """
    Anfragen an die `/locations` Schnittstelle geben die aktuell in der
    Datenbank verfügbaren Orte von Veranstaltungen zurück.

    Die im Feld `id` enthaltene ID eines Ortes kann als `location` Parameter
    in der [`/events`](/events) Schnittstelle verwendet werden.

    Weitere Informationen zum Rückgabeschema und Parametern im
    [Swagger UI](/docs/) oder [ReDoc](/redoc/).
    """

    queryset = Location.objects.all()
    serializer_class = LocationSerializer


class OrganizersViewSet(viewsets.ReadOnlyModelViewSet):
    """
    Anfragen an die `/organizers` Schnittstelle geben die aktuell in der
    Datenbank verfügbaren Veranstalter von Veranstaltungen zurück.

    Die im Feld `id` enthaltene ID eines Veranstalters kann als `organizer`
    Parameter in der [`/events`](/events) Schnittstelle verwendet werden.

    Weitere Informationen zum Rückgabeschema und Parametern im
    [Swagger UI](/docs/) oder [ReDoc](/redoc/).
    """

    queryset = Organizer.objects.all()
    serializer_class = OrganizerSerializer


class MünsterJetztView(routers.APIRootView):
    """
    ## Willkommen auf der API-Dokumentation zu [Münster Update].

    Über die [Münster Update] API können Anwendungen maschinenlesbare
    Veranstaltungsinformationen abrufen.

    Herzstück des Datenschemas sind die [Events](/events).

    [Münster Update]: https://muenster-update.de
    """

    pass


class DocumentedRouter(routers.DefaultRouter):
    APIRootView = MünsterJetztView


@require_safe
def healthz(request):
    return JsonResponse({"status": "ok"})


def pending_migrations():
    loader = MigrationLoader(connection, ignore_no_migrations=True)
    applied = MigrationRecorder(connection).applied_migrations()
    return {
        node
        for leaf in loader.graph.leaf_nodes()
        for node in loader.graph.forwards_plan(leaf)
    } - applied


@require_safe
def readyz(request):
    try:
        pending = pending_migrations()
    except DatabaseError:
        return JsonResponse({"status": "database unavailable"}, status=503)
    if pending:
        return JsonResponse({"status": "migrations pending"}, status=503)
    return JsonResponse({"status": "ok"})


@require_safe
def external_redirect(request):
    """Redirect to an external event website, only for backend-signed URLs."""
    url = request.GET.get("url", "")
    signature = request.GET.get("sig", "")
    if not (links.is_redirectable(url) and links.verify(url, signature)):
        return HttpResponseForbidden("Invalid link", content_type="text/plain")
    response = HttpResponseRedirect(url)
    response["Referrer-Policy"] = "no-referrer"
    response["X-Robots-Tag"] = "noindex"
    return response
