from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView
from .views import (
    CustomTokenObtainPairView,
    admin_dashboard,
    # agent_list,
    # agent_detail,
    # create_agent,
    # update_agent,
    # delete_agent,
    # reservation_list,
    # reservation_detail,
    # mission_list,
    # mission_detail,
    # create_mission,
    # update_mission,
    # delete_mission
)

urlpatterns = [
    # Auth
    path('token/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

    # Admin dashboard
    path('admin/dashboard/', admin_dashboard, name='admin_dashboard'),

    # # Manage Agents
    # path('admin/agents/', agent_list, name='agent_list'),
    # path('admin/agents/<int:agent_id>/', agent_detail, name='agent_detail'),
    # path('admin/agents/create/', create_agent, name='create_agent'),
    # path('admin/agents/<int:agent_id>/update/', update_agent, name='update_agent'),
    # path('admin/agents/<int:agent_id>/delete/', delete_agent, name='delete_agent'),

    # # Manage Reservations
    # path('admin/reservations/', reservation_list, name='reservation_list'),
    # path('admin/reservations/<int:reservation_id>/', reservation_detail, name='reservation_detail'),

    # # Manage Missions
    # path('admin/missions/', mission_list, name='mission_list'),
    # path('admin/missions/<int:mission_id>/', mission_detail, name='mission_detail'),
    # path('admin/missions/create/', create_mission, name='create_mission'),
    # path('admin/missions/<int:mission_id>/update/', update_mission, name='update_mission'),
    # path('admin/missions/<int:mission_id>/delete/', delete_mission, name='delete_mission'),
]
