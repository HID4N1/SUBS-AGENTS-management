# users/permissions.py
from rest_framework import permissions

class IsAdmin(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user and request.user.role == 'Admin'
    
class IsAgent(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user and request.user.role == 'Agent'
    
