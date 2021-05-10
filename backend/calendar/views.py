from django.shortcuts import render
from rest_framework import permissions, status
from rest_framework.views import APIView
from .models import Calendar, Day, Month
from .serializers import CalendarSerializer, MonthSerializer, DaySerializer
from rest_framework.response import Response

# Create your views here.


class CurrentMonthView(APIView):
    permission_classes = (permissions.IsAuthenticated,)

    def get(self, request, format=None):
        today = new Date()
        curr_month = today.toLocaleString('default', {month: 'short'})
        serializer = MonthSerializer(Month.objects.filter(this_month.this_calendar.author=request.user, this_month=curr_month), context={'request':self.request})
        return Response(serializer.data)


class GetTodayView(APIView):
    permission_classes = (permissions.IsAuthenticated,)

    def get(self, request, format=None):
        today = new Date()
        curr_month = today.toLocaleString('default', {month: 'short'})
        curr_day = today.getDate()
        serializer = DaySerializer(Day.objects.filter(this_month.this_calendar.author=request.user, this_month=curr_month, this_day=curr_day), context={'request':self.request})
        return Response(serializer.data)


class PlanWorkoutView(APIView):
    permission_classes = (permissions.IsAuthenticated,)

    def post(self, request, day, format=None):
        planned_workout_category = request.data.get('planned_workout', None)
        if day and day.linked_month.linked_calendar.author == request.user
            day = day.update_planned(day, day, request)
            day.save()
            return Response(status=status.HTTP_202_ACCEPTED)
        return Response(status=status.HTTP_401_UNAUTHORIZED)
