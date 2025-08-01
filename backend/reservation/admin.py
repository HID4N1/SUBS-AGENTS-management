from django.contrib import admin
from .models import TimeSlot, Location, AgentLocation, Reservation

admin.site.register(TimeSlot)
admin.site.register(Location)
admin.site.register(AgentLocation)
admin.site.register(Reservation)
