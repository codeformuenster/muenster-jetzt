from django.urls import include, path

from rest_framework import routers

from . import views


router = routers.DefaultRouter(trailing_slash=False)
router.register(r"events", views.EventsViewSet)
router.register(r"sources", views.EventSourcesViewSet)
router.register(r"locations", views.LocationsViewSet)
router.register(r"organizers", views.OrganizersViewSet)

urlpatterns = [
    path("", include(router.urls)),
    path("openapi.json", views.schema_json),
    path("openapi.yml", views.schema_yml),
]
