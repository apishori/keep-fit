from django.contrib.auth.models import AbstractUser
from django.db import models
from django.utils import timezone


class User(AbstractUser):
    username = models.CharField(max_length=15, blank=False, null=False, unique=True)
    email = models.EmailField(max_length=255, blank=False, null=False)
    first_name = models.CharField(max_length=255, blank=False, null=False)
    last_name = models.CharField(max_length=255, blank=False, null=False)

    @property
    def full_name(self):
        return f'{self.first_name} {self.last_name}'

class Profile(models.Model):
    MALE = 'M'
    FEMALE = 'F'
    OTHER = 'O'

    SEX_CHOICES = [(MALE, 'Male'),
                   (FEMALE, 'Female'),
                   (OTHER, 'Other')]

    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile')
    profile_pic = models.ImageField(blank=True, default='profile_default.jpg', upload_to='profile_pics')
    height = models.IntegerField() #saved in inches
    weight = models.IntegerField() #saved in lbs
    sex = models.CharField(max_length=1, blank=False, null=False, choices=SEX_CHOICES, default=OTHER)
    birthday = models.DateField(blank=False, null=False)
    created_at = models.DateTimeField(default=timezone.now)

    @property
    def bmi(self):
        return 703.0*self.weight/(self.height * self.height)

class Follow(models.Model):
    user1 = models.ForeignKey(User, on_delete=models.CASCADE, related_name='followings')
    user2 = models.ForeignKey(User, on_delete=models.CASCADE, related_name='followers')
    created_at = models.DateTimeField(default=timezone.now)

    class Meta:
        unique_together = ("user1", "user2") # Prevent duplicate followings
        ordering = ('-created_at',)
    
    def save(self, *args, **kwargs):
        if self.user1 == self.user2:
            raise ValidationError("Users cannot follow themselves")
        super(Follow, self).save(*args, **kwargs)

class SearchTerm(models.Model):
    term = models.CharField(max_length=255, blank=False, null=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='search_terms')
    created_at = models.DateTimeField(default=timezone.now)
    class Meta:
        ordering = ('-created_at',)