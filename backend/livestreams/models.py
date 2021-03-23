from django.db import models
from django.utils import timezone
from users.models import User

# Create your models here.
class Livestream(models.Model):
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

    #Using MET Values from:
    #https://www.acefitness.org/education-and-resources/professional/expert-articles/6434/5-things-to-know-about-metabolic-equivalents/

    MET_VALS = {
            "R": 9.8,
            "Y": 2.5,
            "HC": 4.0,
            "T": 8.0,
            "S": 5.8,
            "B": 6.5,
            "C": 8.0,
            "J": 12.3,
            "H": 7.3,
            "O": 4.0,
    }
    stream_id = models.IntegerField(primary_key=True, blank=False, null=False, unique=True)
    video_APIKey = models.CharField(max_length=255, blank=False, null=False, unique=False)
    title = models.CharField(max_length=255, blank=False, null=False, unique=False)
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    start_time = models.DateTimeField(default=timezone.now)
    category = models.CharField(max_length=2, blank=False, null=False, choices=WORKOUT_CATEGORIES, default=OTHER)

    @property
    def calorie_bpm_count(self):
        #RETURNS CALORIES BURNED PER MINUTE
        # = METs x 3.5 x (body weight in kilograms) / 200 
        return ((MET_VALS[self.category] * 3.5 * (self.author.profile.weight/2.20462)) / 200)

    @property
    def title(self):
    	return self.title
