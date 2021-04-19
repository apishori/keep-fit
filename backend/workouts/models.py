from django.db import models
from django.utils import timezone
from users.models import User

# Create your models here.

class Workout(models.Model):
    
    #options for Workout.category
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


    #Data members of Workout
    calories_burnt = models.IntegerField(blank=False, null=False)
    category = models.CharField(max_length=2, blank=False, null=False, choices=WORKOUT_CATEGORIES, default=OTHER)
    created_at = models.DateTimeField(default=timezone.now)
    author = models.ForeignKey(User, on_delete=models.CASCADE)

    