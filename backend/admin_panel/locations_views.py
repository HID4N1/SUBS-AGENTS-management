from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from django.core.paginator import Paginator
from django.db.models import Q

from users.permissions import IsAdmin
from reservation.models import Location, MeetingPoint
from reservation.serializers import LocationSerializer, MeetingPointSerializer


class LocationsList(APIView):
    permission_classes = [IsAuthenticated, IsAdmin]

    def get(self, request):
        """Get paginated list of locations with search functionality"""
        search = request.query_params.get('search', '')
        page = int(request.query_params.get('page', 1))
        per_page = int(request.query_params.get('per_page', 10))

        locations = Location.objects.all().prefetch_related('meeting_point')
        
        if search:
            locations = locations.filter(
                Q(name__icontains=search) | 
                Q(address__icontains=search)
            )

        paginator = Paginator(locations, per_page)
        page_obj = paginator.get_page(page)

        serializer = LocationSerializer(page_obj.object_list, many=True)
        
        return Response({
            'results': serializer.data,
            'count': paginator.count,
            'num_pages': paginator.num_pages,
            'current_page': page
        })

    def post(self, request):
        """Create a new location"""
        serializer = LocationSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class LocationDetail(APIView):
    permission_classes = [IsAuthenticated, IsAdmin]

    def get_object(self, pk):
        return Location.objects.get(pk=pk)

    def get(self, request, pk):
        """Get a specific location"""
        try:
            location = self.get_object(pk)
            serializer = LocationSerializer(location)
            return Response(serializer.data)
        except Location.DoesNotExist:
            return Response({'error': 'Location not found'}, status=status.HTTP_404_NOT_FOUND)

    def put(self, request, pk):
        """Update a location"""
        try:
            location = self.get_object(pk)
            serializer = LocationSerializer(location, data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Location.DoesNotExist:
            return Response({'error': 'Location not found'}, status=status.HTTP_404_NOT_FOUND)

    def delete(self, request, pk):
        """Delete a location"""
        try:
            location = self.get_object(pk)
            location.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except Location.DoesNotExist:
            return Response({'error': 'Location not found'}, status=status.HTTP_404_NOT_FOUND)


class MeetingPointsList(APIView):
    permission_classes = [IsAuthenticated, IsAdmin]

    def get(self, request):
        """Get paginated list of meeting points with search functionality"""
        search = request.query_params.get('search', '')
        location_id = request.query_params.get('location_id')
        page = int(request.query_params.get('page', 1))
        per_page = int(request.query_params.get('per_page', 10))

        meeting_points = MeetingPoint.objects.all()
        
        if search:
            meeting_points = meeting_points.filter(
                Q(name__icontains=search) | 
                Q(address__icontains=search)
            )
        
        if location_id:
            meeting_points = meeting_points.filter(
                location__id=location_id
            )

        paginator = Paginator(meeting_points, per_page)
        page_obj = paginator.get_page(page)

        serializer = MeetingPointSerializer(page_obj.object_list, many=True)
        
        return Response({
            'results': serializer.data,
            'count': paginator.count,
            'num_pages': paginator.num_pages,
            'current_page': page
        })

    def post(self, request):
        """Create a new meeting point and optionally assign to location"""
        location_id = request.data.get('location_id')
        
        # Create meeting point
        serializer = MeetingPointSerializer(data=request.data)
        if serializer.is_valid():
            meeting_point = serializer.save()
            
            # If location_id is provided, assign to location
            if location_id:
                try:
                    location = Location.objects.get(pk=location_id)
                    location.meeting_point.add(meeting_point)
                    return Response(serializer.data, status=status.HTTP_201_CREATED)
                except Location.DoesNotExist:
                    # Meeting point created but location assignment failed
                    return Response({
                        'warning': 'Meeting point created but not assigned to location',
                        'data': serializer.data
                    }, status=status.HTTP_201_CREATED)
            
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class MeetingPointDetail(APIView):
    permission_classes = [IsAuthenticated, IsAdmin]

    def get_object(self, pk):
        return MeetingPoint.objects.get(pk=pk)

    def get(self, request, pk):
        """Get a specific meeting point"""
        try:
            meeting_point = self.get_object(pk)
            serializer = MeetingPointSerializer(meeting_point)
            return Response(serializer.data)
        except MeetingPoint.DoesNotExist:
            return Response({'error': 'Meeting point not found'}, status=status.HTTP_404_NOT_FOUND)

    def put(self, request, pk):
        """Update a meeting point"""
        try:
            meeting_point = self.get_object(pk)
            serializer = MeetingPointSerializer(meeting_point, data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except MeetingPoint.DoesNotExist:
            return Response({'error': 'Meeting point not found'}, status=status.HTTP_404_NOT_FOUND)

    def delete(self, request, pk):
        """Delete a meeting point"""
        try:
            meeting_point = self.get_object(pk)
            meeting_point.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except MeetingPoint.DoesNotExist:
            return Response({'error': 'Meeting point not found'}, status=status.HTTP_404_NOT_FOUND)


class LocationMeetingPoints(APIView):
    permission_classes = [IsAuthenticated, IsAdmin]

    def get(self, request, location_id):
        """Get all meeting points for a specific location"""
        try:
            location = Location.objects.get(pk=location_id)
            meeting_points = location.meeting_point.all()
            serializer = MeetingPointSerializer(meeting_points, many=True)
            return Response(serializer.data)
        except Location.DoesNotExist:
            return Response({'error': 'Location not found'}, status=status.HTTP_404_NOT_FOUND)
