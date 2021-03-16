from django.urls import include, path

from rest_framework import routers

from . import views


router = views.DocumentedRouter(trailing_slash=False)
router.register(r"events", views.EventsViewSet)

urlpatterns = [
    path("", include(router.urls)),
    path("openapi.json", views.schema_json),
    path("openapi.yml", views.schema_yml),
]
