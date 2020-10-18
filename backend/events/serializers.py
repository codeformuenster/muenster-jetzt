from rest_framework import serializers

from .models import Event, EventSource, Location, Organizer


class EventSerializer(serializers.ModelSerializer):

    class Meta:
        model = Event
        fields = "__all__"
        extra_fields = ['images']
        depth = 1

    def get_field_names(self, *args):
        return super().get_field_names(*args) + self.Meta.extra_fields


class EventSourceSerializer(serializers.ModelSerializer):

    class Meta:
        model = EventSource
        fields = "__all__"


class LocationSerializer(serializers.ModelSerializer):

    class Meta:
        model = Location
        fields = "__all__"


class OrganizerSerializer(serializers.ModelSerializer):

    class Meta:
        model = Organizer
        fields = "__all__"
