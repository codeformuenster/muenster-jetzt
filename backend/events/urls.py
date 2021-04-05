from django.urls import include, path
from django.views.generic import TemplateView

from . import views


router = views.DocumentedRouter(trailing_slash=False)
router.register(r"events", views.EventsViewSet)

urlpatterns = [
    path("", include(router.urls)),
    path("openapi.json", views.schema_json, name="openapi.json"),
    path("openapi.yml", views.schema_yml),
    path(
        "docs/",
        TemplateView.as_view(
            template_name="swagger-ui.html",
            extra_context={"schema_url": "openapi.json"},
        ),
        name="swagger-ui",
    ),
    path(
        "redoc/",
        TemplateView.as_view(
            template_name="redoc.html",
            extra_context={"schema_url": "openapi.json"},
        ),
        name="redoc",
    ),
]
