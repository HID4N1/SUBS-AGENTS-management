# reservation/models.py
from django.db import models
from users.models import User  # Link to User model (client)

class TimeSlot(models.Model):
    start_time = models.DateTimeField()
    end_time = models.DateTimeField()
    is_available = models.BooleanField(default=True)  # To track availability

    def __str__(self):
        return f"{self.start_time} - {self.end_time}"

class Location(models.Model):
    name = models.CharField(max_length=100)
    address = models.CharField(max_length=255)
    latitude = models.FloatField()  # Latitude for the location
    longitude = models.FloatField()  # Longitude for the location
    description = models.TextField(blank=True, null=True)  

    def __str__(self):
        return f"{self.name} - {self.address}"

class AgentLocation(models.Model):
    agent = models.ForeignKey(User, on_delete=models.CASCADE, related_name='assigned_locations')  # Link to Agent (User)
    location = models.ForeignKey(Location, on_delete=models.CASCADE)  # Link to Location
    time_slot = models.ForeignKey(TimeSlot, on_delete=models.CASCADE)  # Link to TimeSlot
    mission = models.ForeignKey('missions.Mission', on_delete=models.CASCADE, related_name='agent_locations', null=True, blank=True)  # Link to Mission (optional
    is_active = models.BooleanField(default=True)  # Whether the agent is actively assigned to this location/time slot
    is_available = models.BooleanField(default=True)  # Whether the agent is available at this location/time slot

    def __str__(self):
        return f"Agent {self.agent.first_name} at {self.location.name} during {self.time_slot.start_time}"


class Reservation(models.Model):
    STATUS_CHOICES = [
        ('Pending', 'Pending'),
        ('Confirmed', 'Confirmed'),
        ('Cancelled', 'Cancelled'),
    ]
    SUBSCRIPTION_CHOICES = [    
    ]
    
    client_name = models.CharField(max_length=100, null=True, blank=True)  
    client_phone = models.CharField(max_length=15, null=True, blank=True)  
    client_email = models.EmailField(null=True, blank=True) 
    time_slots = models.ManyToManyField('TimeSlot') 
    location = models.ForeignKey('Location', on_delete=models.CASCADE)  # Link to the selected meeting point
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='Pending')  # Reservation status
    subscription_type = models.CharField(max_length=20, choices=SUBSCRIPTION_CHOICES, default='Regular')  # Add subscription type
    reservation_date = models.DateTimeField(auto_now_add=True)  # Date when the reservation was made

    def __str__(self):
        return f"Reservation {self.id} for {self.client_name} {self.client_phone} ({self.status})"
