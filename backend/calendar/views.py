from django.shortcuts import render
from rest_framework import permissions, status
from rest_framework.views import APIView
from .models import Calendar, Day, Month
from .serializers import CalendarSerializer, MonthSerializer, DaySerializer
from rest_framework.response import Response
from datetime import datetime
from pytz import timezone, utc
import pytz

# Create your views here.


class CurrentMonthView(APIView):
    permission_classes = (permissions.IsAuthenticated,)

    def get(self, request, format=None):
        today = datetime.datetime.now(tz=utc)
        today = today.astimezone(timezone('US/Pacific'))
        curr_month = today.strftime("%b")
        serializer = MonthSerializer(Month.objects.filter(author=request.user, this_month=curr_month), context={"request": self.request})
        return Response(serializer.data)


class GetTodayView(APIView):
    permission_classes = (permissions.IsAuthenticated,)

    def get(self, request, format=None):
        today = datetime.datetime.now(tz=utc)
        today = today.astimezone(timezone('US/Pacific'))
        curr_month = today.strftime("%b")
        curr_day = today.strftime("%d")
        serializer = DaySerializer(Day.objects.filter(author=request.user, linked_month=curr_month, this_day=curr_day), context={"request": self.request})
        return Response(serializer.data)


class PlanWorkoutView(APIView):
    permission_classes = (permissions.IsAuthenticated,)

    def post(self, request, day, format=None):
        planned_workout_category = request.data.get('planned_workout', None)
        if day and day.author == request.user:
            day = day.update_planned(day, day, request)
            day.save()
            return Response(status=status.HTTP_202_ACCEPTED)
        return Response(status=status.HTTP_401_UNAUTHORIZED)
