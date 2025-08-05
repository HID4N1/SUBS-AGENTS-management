from django.urls import path
from rest_framework_simplejwt.views import (
    TokenRefreshView,
)
from .views import (
    MyTokenObtainPairView,
    register_user,
    get_user,
)

urlpatterns = [
    # Auth
    path('token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('register/', register_user, name='register_user'),
    path('/me/', get_user, name='get_user'),
    path('auth/me/', get_user, name='current-user'),


]
