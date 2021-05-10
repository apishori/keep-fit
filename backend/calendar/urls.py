from django.urls import path
from . import views

urlpatterns = [
    path('thismonth/', views.CurrentMonthView.as_view(), name='current-month'),#get current month
    path('today/', views.GetTodayView.as_view(), name='get-today'), #get today
    path('planworkout/', views.PlanWorkoutView.as_view(), name='plan-workout'), #set planned workout for given day
]