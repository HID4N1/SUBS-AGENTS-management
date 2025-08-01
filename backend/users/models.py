from django.contrib.auth.models import AbstractUser, Group, Permission
from django.db import models
from django.core.exceptions import ValidationError
import re


def validate_phone(value):
    if not re.match(r'^\+212\s[5-9]\d{8}$', value):
        raise ValidationError('Phone number must be a valid Moroccan number starting with +212 (e.g., +212 654 347 693).')

class User(AbstractUser):
    ROLE_CHOICES = [
        ('Client', 'Client'),
        ('Agent', 'Agent'),
        ('Admin', 'Admin'),
    ]

    groups = models.ManyToManyField(
        Group,
        related_name='custom_user_set',
        blank=True,
        help_text='The groups this user belongs to.',
        verbose_name='groups',
        related_query_name='custom_user',
    )
    user_permissions = models.ManyToManyField(
        Permission,
        related_name='custom_user_set',
        blank=True,
        help_text='Specific permissions for this user.',
        verbose_name='user permissions',
        related_query_name='custom_user',
    )
    
    phone = models.CharField(max_length=15, blank=True, null=True, validators=[validate_phone] ) 
    role = models.CharField(max_length=10, choices=ROLE_CHOICES, default='Client')  # Role (Client, Agent, Admin)
    
    def __str__(self):
        return f"{self.first_name} {self.last_name} ({self.role})"
