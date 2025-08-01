# reservation/api_views.py
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import Reservation, TimeSlot, Location
from datetime import datetime
from django.http import JsonResponse

@api_view(['POST'])
def step1(request):
    # Save client personal information
    client_name = request.data.get('client_name')
    client_phone = request.data.get('client_phone')
    client_email = request.data.get('client_email', None)

    # Save to session 
    request.session['client_name'] = client_name
    request.session['client_phone'] = client_phone
    request.session['client_email'] = client_email

    return JsonResponse({'message': 'Step 1 completed'}, status=status.HTTP_200_OK)

@api_view(['POST'])
def step2(request):
    
    time_slots = request.data.get('time_slots')  # time_slots should be a list of time slot IDs
    request.session['time_slots'] = time_slots

    return JsonResponse({'message': 'Step 2 completed'}, status=status.HTTP_200_OK)

@api_view(['POST'])
def step3(request):
    location = request.data.get('location')  # location id
    request.session['location'] = location

    return JsonResponse({'message': 'Step 3 completed'}, status=status.HTTP_200_OK)

@api_view(['POST'])
def final_step(request):
    # Retrieve data from POST body and create Reservation object
    client_name = request.data.get('client_name')
    client_phone = request.data.get('client_phone')
    client_email = request.data.get('client_email')
    time_slots = request.data.get('time_slots', [])
    location_id = request.data.get('location')

    try:
        location = Location.objects.get(id=location_id)
    except Location.DoesNotExist:
        return JsonResponse({'error': 'Invalid location ID'}, status=400)

    reservation = Reservation.objects.create(
        client_name=client_name,
        client_phone=client_phone,
        client_email=client_email,
        location=location,
        status='Pending',
        reservation_date=datetime.now()
    )

    if time_slots:
        reservation.time_slots.set(time_slots)

    reservation.save()

    return JsonResponse({'message': 'Reservation created', 'reservation_id': reservation.id}, status=status.HTTP_201_CREATED)

@api_view(['GET'])
def get_time_slots(request):
    date_str = request.GET.get('date', None)
    time_slots = TimeSlot.objects.filter(is_available=True)
    if date_str:
        try:
            date_obj = datetime.strptime(date_str, '%Y-%m-%d').date()
            time_slots = time_slots.filter(start_time__date=date_obj)
        except ValueError:
            return JsonResponse({'error': 'Invalid date format. Use YYYY-MM-DD.'}, status=400)
    data = [
        {
            'id': ts.id,
            'start_time': ts.start_time,
            'end_time': ts.end_time,
        }
        for ts in time_slots
    ]
    return JsonResponse(data, safe=False)

@api_view(['GET'])
def get_locations(request):
    locations = Location.objects.all()
    data = [
        {
            'id': loc.id,
            'name': loc.name,
            'address': loc.address,
            'latitude': loc.latitude,
            'longitude': loc.longitude,
            'description': loc.description,
        }
        for loc in locations
    ]
    return JsonResponse(data, safe=False)

@api_view(['GET'])
def get_reservation(request, reservation_id):
    try:
        reservation = Reservation.objects.get(id=reservation_id)
    except Reservation.DoesNotExist:
        return JsonResponse({'error': 'Reservation not found'}, status=404)

    time_slots = reservation.time_slots.all()
    time_slots_data = [
        {
            'id': ts.id,
            'start_time': ts.start_time,
            'end_time': ts.end_time,
        }
        for ts in time_slots
    ]

    data = {
        'id': reservation.id,
        'client_name': reservation.client_name,
        'client_phone': reservation.client_phone,
        'client_email': reservation.client_email,
        'location': {
            'id': reservation.location.id,
            'name': reservation.location.name,
            'address': reservation.location.address,
            'latitude': reservation.location.latitude,
            'longitude': reservation.location.longitude,
            'description': reservation.location.description,
        },
        'status': reservation.status,
        'reservation_date': reservation.reservation_date,
        'time_slots': time_slots_data,
    }

    return JsonResponse(data, status=200)
