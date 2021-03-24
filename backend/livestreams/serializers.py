from rest_framework import serializers
from .models import Livestream
from users.models import User
from users.serializers import UserSerializer


class LivestreamSerializer(serializers.ModelSerializer):
    video = serializers.CharField(read_only=true, label='API-Key')
    author = UserSerializer(read_only=true)
    class Meta:
        model = Livestream
        fields = ['stream_id', 'video_APIKey', 'title', 'author', 'start_time', 'category', 'calorie_bpm_count']

    def create(self, validated_data):
    	request = self.context.get('request')
        profile_data = request.data('profile')
        livestream = Livestream(video_APIKey = request.data['video_APIKey'], title = request.data['title'], author = request.data['author'], category = request.data['category']) 
        livestream.save()
        return livestream

    def update(self, instance, validated_data):
        instance.title = validated_data.get('title', instance.title)
        instance.category = validated_data.get('category', instance.category)
        instance.save()
        return instance