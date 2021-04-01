from rest_framework import serializers
from .models import Livestream
from users.models import User
from users.serializers import UserSerializer


class LivestreamSerializer(serializers.ModelSerializer):
	video_APIKey = serializers.CharField(read_only=True, label='API-Key')
	# Fix with regression testing when able
	author = UserSerializer(read_only=True)
	class Meta:
		model = Livestream
		fields = ['stream_id', 'video_APIKey', 'title', 'author', 'start_time', 'category', 'calorie_bpm_count']

	def validate(self, data):
		if (data['title'] == ''): 
			raise serializers.ValidationError({"post":"Title cannot be left empy"})
		else:
			return data

	def create(self, validated_data):
		request = self.context.get('request')
		livestream = Livestream(video_APIKey = validated_data['video_APIKey'], title = validated_data['title'], author = request.user, category = validated_data['category']) 
		livestream.save()
		return livestream

	def update(self, instance, validated_data):
		instance.title = validated_data.get('title', instance.title)	
		instance.category = validated_data.get('category', instance.category)
		instance.save()
		return instance