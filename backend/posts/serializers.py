from django.forms.models import model_to_dict
from rest_framework import serializers
from users.models import User
from users.serializers import UserSerializer

from .models import Like, Post


class PostSerializer(serializers.ModelSerializer):
    video = serializers.CharField(read_only=True)
    author = UserSerializer(read_only=True)
    likes = serializers.IntegerField(source='likes.count', read_only=True)
    class Meta:
        model = Post
        fields = ['video', 'title', 'author', 'category', 'created_at', 'calorie_bpm_count', 'likes', 'id']

    def create(self, validated_data):
        request = self.context.get('request')
        post = Post(video=request.data["video"], title=validated_data["title"], 
                                author=request.user, category=validated_data["category"])
        post.save()
        post.refresh_from_db()
        return post

    def update(self, instance, validated_data):
        instance.title = validated_data.get('title', instance.title)
        instance.category = validated_data.get('category', instance.category)
        return instance
