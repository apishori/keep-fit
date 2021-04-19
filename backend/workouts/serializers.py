from django.forms.models import model_to_dict
from rest_framework import serializers
from users.serializers import UserSerializer
from .models import Workout

class WorkoutSerializer(serializers.ModelSerializer):    
    author = UserSerializer(read_only=True)

    class Meta:
        model = Workout
        fields = ['calories_burnt', 'category', 'created_at', 'author', 'id']
            
    def create(self, validated_data):
        request = self.context.get('request')
        workout = Workout(calories_burnt=validated_data.get('calories_burnt'), category=validated_data.get('category'),
                            author=request.user)
        workout.save()
        return workout