from django.urls import path
from .views import (
    step1,
    step2, 
    step3, 
    final_step, 
    get_time_slots, 
    get_locations, 
    get_reservation, 
    get_meeting_points
    )

urlpatterns = [
    path('step1/', step1, name='step1'),
    path('step2/', step2, name='step2'),
    path('step3/', step3, name='step3'),
    path('final_step/', final_step, name='final_step'),
    path('time_slots/', get_time_slots, name='get_time_slots'),
    path('locations/', get_locations, name='get_locations'),
    path('meeting_points/<int:location_id>/', get_meeting_points, name='get_meeting_points'),
    path('<int:reservation_id>/', get_reservation, name='get_reservation'),
]
