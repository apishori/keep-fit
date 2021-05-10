from django.db import models
from django.utils import timezone
from users.models import User
from workouts.models import Workout
from datetime import datetime, timedelta
import calendar

# Create your models here.

class Calendar(models.Model):
  created_at = models.DateTimeField(default=timezone.now)
  author = models.ForeignKey(User, on_delete=models.CASCADE)

class Month(models.Model):
    
  MONTHS = [('Jan', 'January'), ('Feb', 'February'), ('Mar', 'March'), ('Apr', 'April'), ('May', 'May'), ('Jun', 'June'),
            ('Jul', 'July'), ('Aug', 'August'), ('Sep', 'September'), ('Oct', 'October'), ('Nov', 'November'), ('Dec', 'December')]

  this_month = models.CharField(max_length=3, blank=False, null=False, choices=MONTHS)
  linked_calendar = models.ForeignKey(Calendar, on_delete=models.CASCADE)
  author = models.ForeignKey(User, on_delete=models.CASCADE)


class Day(models.Model):

    NUMBER_DAYS = [('1', 1), ('2', 2), ('3', 3), ('4', 4), ('5', 5), ('6', 6), ('7', 7), ('8', 8), ('9', 9), ('10', 10),
                  ('11', 11), ('12', 12), ('13', 13), ('14', 14), ('15', 15), ('16', 16), ('17', 17), ('18', 18), ('19', 19),
                  ('20', 20), ('21', 21), ('22', 22), ('23', 23), ('24', 24), ('25', 25), ('26', 26), ('27', 27), ('28', 28),
                  ('29', 29), ('30', 30), ('31', 31)]

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


    this_day = models.CharField(max_length=2, blank=False, null=False, choices=NUMBER_DAYS)
    linked_month = models.ForeignKey(Month, on_delete=models.CASCADE)
    recent_workout = models.ForeignKey(Workout, on_delete=models.CASCADE)
    planned_workout = models.CharField(max_length=2, blank=False, null=False, choices=WORKOUT_CATEGORIES, default=OTHER)
    author = models.ForeignKey(User, on_delete=models.CASCADE)
