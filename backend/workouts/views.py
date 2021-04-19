from django.shortcuts import render
from rest_framework import permissions, status
from rest_framework.views import APIView
from .models import Workout
from .serializers import WorkoutSerializer
from rest_framework.response import Response

# Create your views here.

class CreateWorkoutView(APIView): #create workout
    permission_classes = (permissions.IsAuthenticated,)
    #permission_classes = (permissions.AllowAny,)
    
    def post(self, request, format=None):
        serializer = WorkoutSerializer(data=request.data, context={"request":self.request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class GetWorkoutLogView(APIView): #get 
    permission_classes = (permissions.IsAuthenticated,)
    #permission_classes = (permissions.AllowAny,)

    def get(self, request, format=None):
        serializer = WorkoutSerializer(Workout.objects.all(), many=True, context={'request':self.request})
        return Response(serializer.data)

class CleanWorkoutLogView(APIView): #clear log
    permission_classes = (permissions.IsAuthenticated,)
    #permission_classes = (permissions.AllowAny,)

    def delete(self, request, format=None):
        workouts = Workout.objects.filter(author=request.user)
        workouts.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
        



