from django.urls import path
from .views import (
    AdminDashboardStats,
    AgentsList,
    AgentDetail,
    MissionsList,
    MissionDetail,
    ReservationsList
)

urlpatterns = [
    path('stats/', AdminDashboardStats.as_view(), name='admin-dashboard-stats'),
    path('agents/', AgentsList.as_view(), name='agents-list'),
    path('agents/<int:pk>/', AgentDetail.as_view(), name='agent-detail'),
    path('missions/', MissionsList.as_view(), name='missions-list'),
    path('missions/<int:pk>/', MissionDetail.as_view(), name='mission-detail'),
    path('reservations/', ReservationsList.as_view(), name='reservations-list'),
]
