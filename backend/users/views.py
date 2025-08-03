from rest_framework import status, serializers
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from .models import CustomUser
from .permissions import IsAdmin
from rest_framework.response import Response
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from .serializers import *



# authentication logic
# Custom Token Obtain Serializer to include additional claims (like user role)
class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        # Add custom claims (e.g., role) here
        token['role'] = user.role
        return token

# Custom Token Obtain View to use the custom serializer
class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer

# Admin Panels

# Dashboard view for admin
@api_view(['GET'])
@permission_classes([IsAuthenticated, IsAdmin]) 
def admin_dashboard(request):
    """ Admin dashboard view """
    return Response({'message': 'Welcome to the Admin Dashboard!'}, status=status.HTTP_200_OK)

# @api_view(['GET'])
# @permission_classes([IsAuthenticated, IsAdmin])
# def agent_list(request):
#     """ List all agents for admin """
#     agents = CustomUser.objects.filter(role='Agent')
#     serializer = CustomUserSerializer(agents, many=True)
#     return Response(serializer.data, status=status.HTTP_200_OK)

# @api_view(['GET'])
# @permission_classes([IsAuthenticated, IsAdmin])
# def agent_detail(request, agent_id):
#     """ Get details of a specific agent for admin """
#     try:
#         agent = CustomUser.objects.get(id=agent_id, role='Agent')
#     except CustomUser.DoesNotExist:
#         return Response({"error": "Agent not found."}, status=status.HTTP_404_NOT_FOUND)

#     serializer = CustomUserSerializer(agent)
#     return Response(serializer.data, status=status.HTTP_200_OK)

# @api_view(['GET'])
# @permission_classes([IsAuthenticated, IsAdmin])
# def reservation_list(request):
#     """ List all reservations for admin """
#     # Assuming you have a Reservation model, replace with actual model
#     # reservations = Reservation.objects.all()
#     # serializer = ReservationSerializer(reservations, many=True)
#     # return Response(serializer.data, status=status.HTTP_200_OK)
    
#     return Response({'message': 'This endpoint is under construction.'}, status=status.HTTP_200_OK)

# @api_view(['GET'])
# @permission_classes([IsAuthenticated, IsAdmin])
# def reservation_detail(request, reservation_id):
#     """ Get details of a specific reservation for admin """
#     # Assuming you have a Reservation model, replace with actual model
#     # try:
#     #     reservation = Reservation.objects.get(id=reservation_id)
#     # except Reservation.DoesNotExist:
#     #     return Response({"error": "Reservation not found."}, status=status.HTTP_404_NOT_FOUND)
    
#     # serializer = ReservationSerializer(reservation)
#     # return Response(serializer.data, status=status.HTTP_200_OK)
    
#     return Response({'message': 'This endpoint is under construction.'}, status=status.HTTP_200_OK)

# @api_view(['GET'])
# @permission_classes([IsAuthenticated, IsAdmin])
# def mission_list(request):
#     """ List all missions for admin """
#     # Assuming you have a Mission model, replace with actual model
#     # missions = Mission.objects.all()
#     # serializer = MissionSerializer(missions, many=True)
#     # return Response(serializer.data, status=status.HTTP_200_OK)
    
#     return Response({'message': 'This endpoint is under construction.'}, status=status.HTTP_200_OK)

# @api_view(['GET'])
# @permission_classes([IsAuthenticated, IsAdmin])
# def mission_detail(request, mission_id):
#     """ Get details of a specific mission for admin """
#     # Assuming you have a Mission model, replace with actual model
#     # try:
#     #     mission = Mission.objects.get(id=mission_id)
#     # except Mission.DoesNotExist:
#     #     return Response({"error": "Mission not found."}, status=status.HTTP_404_NOT_FOUND)
    
#     # serializer = MissionSerializer(mission)
#     # return Response(serializer.data, status=status.HTTP_200_OK)
    
#     return Response({'message': 'This endpoint is under construction.'}, status=status.HTTP_200_OK)



# # Agents CRUD operations (by admin)
# @api_view(['POST'])
# @permission_classes([IsAuthenticated, IsAdmin])  # Apply the permission here
# def create_agent(request):
#     """ Admin creates an agent """
#     serializer = AgentSerializer(data=request.data)
#     if serializer.is_valid():
#         serializer.save()
#         return Response({'message': 'Agent created successfully.'}, status=status.HTTP_201_CREATED)
#     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# @api_view(['PUT'])
# @permission_classes([IsAuthenticated, IsAdmin])  # Apply the permission here
# def update_agent(request, agent_id):
#     """ Admin updates an agent's details """
#     try:
#         agent = CustomUser.objects.get(id=agent_id, role='Agent')
#     except CustomUser.DoesNotExist:
#         return Response({"error": "Agent not found."}, status=status.HTTP_404_NOT_FOUND)

#     serializer = AgentSerializer(agent)
#     if serializer.is_valid():
#         serializer.save()
#         return Response({'message': 'Agent updated successfully.'}, status=status.HTTP_200_OK)
#     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
# @api_view(['DELETE'])
# @permission_classes([IsAuthenticated, IsAdmin])  # Apply the permission here
# def delete_agent(request, agent_id):
#     """ Admin deletes an agent """
#     try:
#         agent = CustomUser.objects.get(id=agent_id, role='Agent')
#     except CustomUser.DoesNotExist:
#         return Response({"error": "Agent not found."}, status=status.HTTP_404_NOT_FOUND)

#     serializer = AgentSerializer(agent)
#     serializer.delete(agent)
#     return Response({'message': 'Agent deleted successfully.'}, status=status.HTTP_204_NO_CONTENT)


# # mission CRUD operations (by admin)
# @api_view(['POST'])
# @permission_classes([IsAuthenticated, IsAdmin])  # Apply the permission here
# def create_mission(request):
#     """ Admin creates a mission """
#     # serializer = MissionSerializer(data=request.data)
#     # if serializer.is_valid():
#     #     serializer.save()
#     #     return Response({'message': 'Mission created successfully.'}, status=status.HTTP_201_CREATED)

#     return Response({'message': 'This endpoint is under construction.'}, status=status.HTTP_200_OK)

# @api_view(['PUT'])
# @permission_classes([IsAuthenticated, IsAdmin])  # Apply the permission here
# def update_mission(request, mission_id):
#     """ Admin updates a mission's details """
#     # try:
#     #     mission = Mission.objects.get(id=mission_id)
#     # except Mission.DoesNotExist:
#     #     return Response({"error": "Mission not found."}, status=status.HTTP_404_NOT_FOUND)

#     # serializer = MissionSerializer(mission, data=request.data)
#     # if serializer.is_valid():
#     #     serializer.save()
#     #     return Response({'message': 'Mission updated successfully.'}, status=status.HTTP_200_OK)
    
#     return Response({'message': 'This endpoint is under construction.'}, status=status.HTTP_200_OK)

# @api_view(['DELETE'])
# @permission_classes([IsAuthenticated, IsAdmin])  # Apply the permission here
# def delete_mission(request, mission_id):
#     """ Admin deletes a mission """
#     # try:
#     #     mission = Mission.objects.get(id=mission_id)
#     # except Mission.DoesNotExist:
#     #     return Response({"error": "Mission not found."}, status=status.HTTP_404_NOT_FOUND)

#     # serializer = MissionSerializer(mission)
#     # serializer.delete(mission)

#     return Response({'message': 'This endpoint is under construction.'}, status=status.HTTP_200_OK)

