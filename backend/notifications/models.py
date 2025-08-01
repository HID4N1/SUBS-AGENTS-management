# notifications/models.py
from django.db import models
from users.models import User  # Link to User model (client or agent)

class Notification(models.Model):
    STATUS_CHOICES = [
        ('Sent', 'Sent'),
        ('Failed', 'Failed'),
    ]
    
    user = models.ForeignKey(User, on_delete=models.CASCADE)  # Link to user (client or agent)
    message = models.TextField()  # The content of the notification
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='Sent')
    sent_at = models.DateTimeField(auto_now_add=True)  # When the notification was sent
    message_type = models.CharField(max_length=50, default='WhatsApp')  # Could be 'SMS', 'Email', etc.

    def __str__(self):
        return f"Notification to {self.user.first_name} {self.user.last_name}"
