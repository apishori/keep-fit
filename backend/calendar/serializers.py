from django.forms.models import model_to_dict
from rest_framework import serializers
from users.serializers import UserSerializer
from .models import Calendar, Day, Month

class CalendarSerializer(serializers.ModelSerializer):    
    author = UserSerializer(read_only=True)

    class Meta:
        model = Workout
        fields = ['created_at', 'author']


class MonthSerializer(serializers.ModelSerializer):   
    linked_calendar = CalendarSerializer(read_only=True)

    class Meta:
        model = Month
        fields = ['this_month', 'linked_calendar']

    def create(self, validated_data):
        request = self.context.get('request')
        month = Month(this_month=validated_data.get('this_month'), linked_calendar=validated_data.get('linked_calendar'))
        month.save()
        return month



class DaySerializer(serializers.ModelSerializer):   
    this_month = MonthSerializer(serializers.ModelSerializer):

    class Meta:
        model = Day
        fields = ['this_day, this_month, recent_workout, planned_workout']

    def create(self, validated_data):
        request = self.context.get('request')
        day = Day(this_day=validated_data.get('this_day'))
        day.save()
        return day

    def update_recent(self, instance, validated_data):
        day_data = self.context.get('request').data
        instance.recent_workout=validated_data.get('recent_workout', instance.recent_workout)
        instance.this_day = day_data.get('this_day', instance.this_day)
        instance.linked_month = day_data.get('linked_month', instance.linked_month)
        instance.planned_workout = day_data.get('planned_workout', instance.planned_workout)
        instance.save()
        return instance

    def update_planned(self, instance, validated_data)
        day_data = self.context.get('request').data
        instance.planned_workout=validated_data.get('planned_workout', instance.planned_workout)
        instance.this_day = day_data.get('this_day', instance.this_day)
        instance.linked_month = day_data.get('linked_month', instance.linked_month)
        instance.recent_workout = day_data.get('planned_workout', instance.planned_workout)
        instance.save()
        return instance

    def get_recent(self):
        day_data = self.context.get('request').data
        if day_data.recent_workout:
            return day_data.recent_workout
        else:
            return None

    def get_planned(self):
        day_data = self.context.get('request').data
        if day_data.planned_workout:
            return day_data.planned_workout
        else:
            return None

