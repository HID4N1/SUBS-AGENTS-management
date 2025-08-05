# missions/models.py
from django.db import models
from users.models import CustomUser  # Link to User model (agent)
from reservation.models import Location  # Link to Reservation and Location models

class Mission(models.Model):
    STATUS_CHOICES = [
        ('Pending', 'Pending'),
        ('In Progress', 'In Progress'),
        ('Completed', 'Completed'),
    ]
    
    reservations = models.ManyToManyField('reservation.Reservation', related_name='missions')  # Link multiple reservations to one mission
    agent = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='assigned_missions', null=True, blank=True)  # Link mission to agent
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='Pending')
    location = models.ForeignKey(Location, on_delete=models.CASCADE, related_name='missions', null=True, blank=True)  # Link mission to location
    feedback = models.TextField(blank=True, null=True)  # Agent feedback
    mission_date = models.DateTimeField()  # Date and time of the mission

    def __str__(self):
        return f"Mission {self.id} for {self.reservation.client_name} {self.reservation.client.phone} ({self.status}), Agent: {self.agent.first_name} {self.agent.last_name}, Date: {self.mission_date}"
