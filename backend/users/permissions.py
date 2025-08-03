# users/permissions.py
from rest_framework import permissions

class IsAdmin(permissions.BasePermission):
    """
    Custom permission to only allow Admins to access the view.
    """

    def has_permission(self, request, view):
        return request.user and request.user.role == 'admin'
    
class IsAgent(permissions.BasePermission):
    """
    Custom permission to only allow Agents to access the view.
    """

    def has_permission(self, request, view):
        return request.user and request.user.role == 'agent'
    
