from django.urls import path
from . import views

urlpatterns = [
    path('create/', views.CreateWorkoutView.as_view(), name='create-workout'),#create workout object
    path('getall/', views.GetWorkoutLogView.as_view(), name='get-workout-log'), #get workout list
    path('clean/', views.CleanWorkoutLogView.as_view(), name='clean-workout-log'), #clean workout list 
]