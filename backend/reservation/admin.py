from django.contrib import admin
from .models import TimeSlot, Location, AgentLocation, Reservation, MeetingPoint

admin.site.register(TimeSlot)
admin.site.register(Location)
admin.site.register(AgentLocation)
admin.site.register(Reservation)
admin.site.register(MeetingPoint)

