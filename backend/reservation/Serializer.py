from rest_framework import serializers
from .models import TimeSlot
from .models import Location, AgentLocation, Reservation

class TimeSlotSerializer(serializers.ModelSerializer):
    class Meta:
        model = TimeSlot
        fields = ['id', 'start_time', 'end_time', 'is_available']

class LocationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Location
        fields = ['id', 'name', 'address', 'latitude', 'longitude', 'description']
        
class AgentLocationSerializer(serializers.ModelSerializer):
    agent = serializers.StringRelatedField()  # You can use a nested serializer if needed
    location = LocationSerializer()
    time_slot = TimeSlotSerializer()
    mission = serializers.StringRelatedField()  # You can nest a Mission serializer here if needed

    class Meta:
        model = AgentLocation
        fields = ['id', 'agent', 'location', 'time_slot', 'mission', 'is_active', 'is_available']

class ReservationSerializer(serializers.ModelSerializer):
    time_slots = TimeSlotSerializer(many=True)  # Many-to-many relation to TimeSlot
    location = LocationSerializer()  # ForeignKey to Location

    class Meta:
        model = Reservation
        fields = ['id', 'client_name', 'client_phone', 'client_email', 'time_slots', 'location', 
                  'status', 'subscription_type', 'reservation_date']
