from django.contrib import admin

from .models import Event


@admin.register(Event)
class SalesAdmin(admin.ModelAdmin):

    list_display = [
        "id",
        "name",
        "start_date",
        "location",
        "organizer",
        "source",
        "visible",
    ]
    list_display_links = ["id", "name"]
    list_filter = ["location", "organizer", "source", "visible"]
    search_fields = ["id", "name"]
