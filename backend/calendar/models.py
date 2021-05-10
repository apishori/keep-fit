from django.db import models
from django.utils import timezone
from users.models import User
from workouts.models import Workout

# Create your models here.

class Calendar(models.Model):
    created_at = models.DateTimeField(default=timezone.now)
    author = models.ForeignKey(User, on_delete=models.CASCADE)

class Month(models.Model):
    
  MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 
              'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

  this_month = models.CharField(max_length=3, blank=False, null=False, choices=MONTHS, related_name = 'month')
  linked_calendar = models.ForeignKey(Calendar, on_delete=models.CASCADE, related_name = 'calendar')
  


class Day(models.Model):
    
    NUMBER_DAYS = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10',
                  '11', '12', '13', '14', '15', '16', '17', '18', '19', '20'
                  '21', '22', '23', '24', '25', '26', '27', '28', '29', '30']

    RUN = 'R'
    YOGA = 'Y'
    HOME_CARDIO = 'HC'
    TENNIS = 'T'
    SWIMMING = 'S'
    BASKETBALL = 'B'
    CYCLING = 'C'
    JUMP_ROPE = 'J'
    HIKING = 'H'
    OTHER = 'O'

    WORKOUT_CATEGORIES = [(RUN, 'Run'),
                   (YOGA, 'Yoga'),
                   (HOME_CARDIO, 'Home cardio'),
                   (TENNIS, 'Tennis'),
                   (SWIMMING, 'Swimming'),
                   (BASKETBALL, 'Basketball'),
                   (CYCLING, 'Cycling'),
                   (JUMP_ROPE, 'Jump rope'),
                   (HIKING, 'Hiking'),
                   (OTHER, 'Other')]


    this_day = models.CharField(max_length=2, blank=False, null=False, choices=NUMBER_DAYS, related_name = 'day')
    linked_month = models.ForeignKey(Month, on_delete=models.CASCADE, related_name = 'month')
    recent_workout = models.ForeignKey(Workout, on_delete=models.CASCADE, related_name='previous_exercise')
    planned_workout = models.CharField(max_length=2, blank=False, null=False, choices=WORKOUT_CATEGORIES, default=OTHER)
