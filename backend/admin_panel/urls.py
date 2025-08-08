from django.urls import path
from .views import (
    AdminDashboardStats,
    AgentsList,
    AgentDetail,
    MissionsList,
    MissionDetail,
    ReservationsList
)
from .locations_views import (
    LocationsList,
    LocationDetail,
    MeetingPointsList,
    MeetingPointDetail,
    LocationMeetingPoints
)

urlpatterns = [
    path('stats/', AdminDashboardStats.as_view(), name='admin-dashboard-stats'),
    path('agents/', AgentsList.as_view(), name='agents-list'),
    path('agents/<int:pk>/', AgentDetail.as_view(), name='agent-detail'),
    path('missions/', MissionsList.as_view(), name='missions-list'),
    path('missions/<int:pk>/', MissionDetail.as_view(), name='mission-detail'),
    path('reservations/', ReservationsList.as_view(), name='reservations-list'),
    
    # Locations endpoints
    path('locations/', LocationsList.as_view(), name='locations-list'),
    path('locations/<int:pk>/', LocationDetail.as_view(), name='location-detail'),
    path('locations/<int:location_id>/meeting-points/', LocationMeetingPoints.as_view(), name='location-meeting-points'),
    
    # Meeting points endpoints
    path('meeting-points/', MeetingPointsList.as_view(), name='meeting-points-list'),
    path('meeting-points/<int:pk>/', MeetingPointDetail.as_view(), name='meeting-point-detail'),
]
