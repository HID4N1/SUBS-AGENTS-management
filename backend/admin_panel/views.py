from datetime import date
from django.db.models import Count
from django.shortcuts import get_object_or_404

from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from users.permissions import IsAdmin
from users.models import CustomUser
from reservation.models import Reservation, Location
from missions.models import Mission

class AdminDashboardStats(APIView):
    permission_classes = []

    def get(self, request):
        today = date.today()

        # --- Reservations ---
        total_reservations = Reservation.objects.count()
        pending_reservations = Reservation.objects.filter(status='Pending').count()
        confirmed_reservations = Reservation.objects.filter(status='Confirmed').count()
        cancelled_reservations = Reservation.objects.filter(status='Cancelled').count()
        today_reservations = Reservation.objects.filter(reservation_date__date=today).count()

        # --- Missions ---
        total_missions = Mission.objects.count()
        pending_missions = Mission.objects.filter(status='Pending').count()
        in_progress_missions = Mission.objects.filter(status='In Progress').count()
        completed_missions = Mission.objects.filter(status='Completed').count()
        today_missions = Mission.objects.filter(mission_date=today).count()

        # --- Agents ---
        total_agents = CustomUser.objects.filter(role='Agent').count()
        active_agents_today = Mission.objects.filter(mission_date=today, agent__isnull=False) \
                                             .values('agent').distinct().count()

        # --- Locations summary ---
        locations_summary = (
            Reservation.objects.values('location__name')
            .annotate(reservations_count=Count('id'))
            .order_by('-reservations_count')
        )
        locations_data = [
            {"location": l["location__name"], "reservations": l["reservations_count"]}
            for l in locations_summary
        ]

        return Response({
            "reservations": {
                "total": total_reservations,
                "pending": pending_reservations,
                "confirmed": confirmed_reservations,
                "cancelled": cancelled_reservations,
                "today": today_reservations
            },
            "missions": {
                "total": total_missions,
                "pending": pending_missions,
                "in_progress": in_progress_missions,
                "completed": completed_missions,
                "today": today_missions
            },
            "agents": {
                "total": total_agents,
                "active_today": active_agents_today
            },
            "locations_summary": locations_data
        })


class AgentsList(APIView):
    permission_classes = [IsAuthenticated, IsAdmin]

    def get(self, request):
        agents = CustomUser.objects.filter(role='Agent') \
            .annotate(
                missions_count=Count('assigned_missions', distinct=True),
                reservations_count=Count('assigned_missions__reservations', distinct=True)
            )

        # --- Filters ---
        username = request.query_params.get('username')
        if username:
            agents = agents.filter(username__icontains=username)

        phone = request.query_params.get('phone')
        if phone:
            agents = agents.filter(phone__icontains=phone)

        data = [
            {
                "id": agent.id,
                "username": agent.username,
                "full_name": f"{agent.first_name} {agent.last_name}".strip(),
                "phone": agent.phone,
                "missions_count": agent.missions_count,
                "reservations_count": agent.reservations_count
            }
            for agent in agents
        ]
        return Response(data)

class AgentDetail(APIView):
    permission_classes = [IsAuthenticated, IsAdmin]

    def get(self, request, pk):
        agent = get_object_or_404(CustomUser, pk=pk, role='Agent')

        missions = agent.assigned_missions.all().values(
            "id", "status", "mission_date", "location__name"
        )

        reservations = Reservation.objects.filter(
            missions__agent=agent
        ).distinct().values(
            "id", "status", "reservation_date", "location__name", "client_name"
        )

        data = {
            "id": agent.id,
            "username": agent.username,
            "full_name": f"{agent.first_name} {agent.last_name}".strip(),
            "phone": agent.phone,
            "missions": list(missions),

        }
        return Response(data)

class MissionsList(APIView):
    permission_classes = [IsAuthenticated, IsAdmin]

    def get(self, request):
        missions = Mission.objects.all().annotate(
            reservations_count=Count('reservations')
        )

        # --- Filters ---
        status = request.query_params.get('status')
        if status:
            missions = missions.filter(status=status)

        date = request.query_params.get('date')
        if date:
            missions = missions.filter(mission_date=date)

        location = request.query_params.get('location')
        if location:
            missions = missions.filter(location__name__icontains=location)

        data = missions.values(
            'id', 'status', 'mission_date', 'location__name',
            'agent__username', 'reservations_count'
        )
        return Response([
            {
                "id": m["id"],
                "status": m["status"],
                "mission_date": m["mission_date"],
                "location": m["location__name"],
                "agent": m["agent__username"],
                "reservations_count": m["reservations_count"]
            } for m in data
        ])

class MissionDetail(APIView):
    permission_classes = [IsAuthenticated, IsAdmin]

    def get(self, request, pk):
        mission = get_object_or_404(Mission, pk=pk)

        reservations = mission.reservations.all().values(
            "id", "status", "reservation_date", "location__name", "client_name"
        )

        data = {
            "id": mission.id,
            "status": mission.status,
            "mission_date": mission.mission_date,
            "location": mission.location.name if mission.location else None,
            "agent": mission.agent.username if mission.agent else None,
            "reservations": list(reservations)
        }
        return Response(data)

class ReservationsList(APIView):
    permission_classes = [IsAuthenticated, IsAdmin]

    def get(self, request):
        reservations = Reservation.objects.all()

        # --- Filters ---
        status = request.query_params.get('status')
        if status:
            reservations = reservations.filter(status=status)

        date = request.query_params.get('date')
        if date:
            reservations = reservations.filter(reservation_date__date=date)

        client_name = request.query_params.get('client_name')
        if client_name:
            reservations = reservations.filter(client_name__icontains=client_name)

        location = request.query_params.get('location')
        if location:
            reservations = reservations.filter(location__name__icontains=location)

        data = reservations.values(
            "id", "client_name", "status", "reservation_date",
            "location__name"
        )
        return Response([
            {
                "id": r["id"],
                "client_name": r["client_name"],
                "status": r["status"],
                "reservation_date": r["reservation_date"],
                "location": r["location__name"],
            } for r in data
        ])

