from django.contrib.auth.models import AbstractUser
from django.db import models
from django.core.exceptions import ValidationError
import re



def validate_phone(value):
    """Validate phone number format"""
    if value:
        # Simple phone number validation (allows formats like +1234567890, 123-456-7890, etc.)
        phone_pattern = re.compile(r'^[\+]?[1-9][\d]{0,15}$')
        if not phone_pattern.match(value):
            raise ValidationError(
                'Phone number must be in a valid format (e.g., +1234567890, 123-456-7890)',
                code='invalid_phone'
            )
        


class CustomUser(AbstractUser):
    CLIENT = 'client'
    AGENT = 'agent'
    ADMIN = 'admin'

    ROLE_CHOICES = [
        ('Client', 'Client'),
        ('Agent', 'Agent'),
        ('Admin', 'Admin'),
    ]
    phone = models.CharField(max_length=15, unique=True, validators=[validate_phone], null=True, blank=True)  # Phone number with validation
    role = models.CharField(max_length=10, choices=ROLE_CHOICES, default='Client')  # Role (Client, Agent, Admin)
    

    def __str__(self):
        return f"{self.first_name} {self.last_name} ({self.role})"
