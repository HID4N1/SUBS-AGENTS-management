from rest_framework import serializers
from .models import Location, MeetingPoint, TimeSlot, AgentLocation, Reservation


class MeetingPointSerializer(serializers.ModelSerializer):
    class Meta:
        model = MeetingPoint
        fields = ['id', 'name', 'address', 'latitude', 'longitude', 'description']


class LocationSerializer(serializers.ModelSerializer):
    meeting_points = MeetingPointSerializer(many=True, read_only=True, source='meeting_point')
    meeting_points_ids = serializers.PrimaryKeyRelatedField(
        many=True,
        queryset=MeetingPoint.objects.all(),
        source='meeting_point',
        write_only=True,
        required=False
    )

    class Meta:
        model = Location
        fields = ['id', 'name', 'address', 'description', 'meeting_points', 'meeting_points_ids']


class TimeSlotSerializer(serializers.ModelSerializer):
    class Meta:
        model = TimeSlot
        fields = ['id', 'start_time', 'end_time', 'is_available']


class AgentLocationSerializer(serializers.ModelSerializer):
    agent = serializers.StringRelatedField()
    location = LocationSerializer()
    time_slot = TimeSlotSerializer()
    mission = serializers.StringRelatedField()

    class Meta:
        model = AgentLocation
        fields = ['id', 'agent', 'location', 'time_slot', 'mission', 'is_active', 'is_available']


class ReservationSerializer(serializers.ModelSerializer):
    time_slots = TimeSlotSerializer(many=True)
    location = LocationSerializer()
    meeting_point = MeetingPointSerializer()

    class Meta:
        model = Reservation
        fields = ['id', 'client_name', 'client_phone', 'client_email', 'time_slots', 'location', 
                  'meeting_point', 'status', 'reservation_date']
