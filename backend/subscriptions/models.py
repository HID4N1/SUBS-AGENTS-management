# subscription/models.py
from django.db import models
from users.models import CustomUser  
from django.utils import timezone

class Subscription(models.Model):
    SUBSCRIPTION_CHOICES = [
        ('Regular', 'Regular'),
        ('Student', 'Student'),
    ]
    
    STATUS_CHOICES = [
        ('Active', 'Active'),
        ('Expired', 'Expired'),
        ('Suspended', 'Suspended'),
        ('Cancelled', 'Cancelled'),
    ]
    
    client = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='subscriptions')  # Link to client (user)
    subscription_type = models.CharField(max_length=20, choices=SUBSCRIPTION_CHOICES, default='Regular')  # Type of subscription
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='Active')  # Subscription status
    start_date = models.DateTimeField()  # When the subscription starts
    end_date = models.DateTimeField()  # When the subscription ends
    renewal_date = models.DateTimeField(null=True, blank=True)  # The date when the subscription was renewed (optional)
    is_active = models.BooleanField(default=True)  # To track if the subscription is currently active

    
    def __str__(self):
        return f"{self.client.first_name} {self.client.last_name} - {self.subscription_type} ({self.status})"
    
    def is_expired(self):
        """Check if the subscription has expired."""
        return self.end_date < timezone.now()
    
    def renew_subscription(self):
        """Renew the subscription by extending the end date."""
        # Add logic here to renew the subscription (extend the end date)
        pass
