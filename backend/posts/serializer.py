from rest_framework import serializers

from .models import Post, Like

class PostSerializer(serializers.ModelSerializer):
    video = serializers.SerializerMethodField()
    author = UserSerializer()
    likes = serializer.IntegerField(source='likes.count', read_only=True)
    class Meta:
        model = Post
        fields = ['video', 'title', 'author', 'category', 'created_at', 'calorie_bpm_count', 'likes']

    def get_video(self, obj):
        #Do this somehow
        pass
        
'''
class LikeSerializer(serializers.ModelSerializer):
    user = serializers.IntegerField(source='user.username', read_only=True)
    post = serializers.IntegerField(source='', read_only=True)
    class Meta:
        model = Like
        fields = ['user', 'post']
'''