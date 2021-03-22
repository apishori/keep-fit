from rest_framework import serializers

from .models import Follow, Profile, User


class ProfileSerializer(serializers.ModelSerializer):
    profile_pic = serializers.SerializerMethodField()
    class Meta:
        model = Profile
        fields = ['profile_pic', 'height', 'weight', 'sex', 'birthday', 'created_at']

    def get_profile_pic(self, obj):
        request = self.context.get('request')
        if obj.profile_pic and hasattr(obj.profile_pic, 'url'):
            return {
                "image" : request.build_absolute_uri(obj.profile_pic.url),
                "width" : obj.profile_pic.width,
                "height" : obj.profile_pic.height,
            }
        else:
            return None

class UserSerializer(serializers.ModelSerializer):
    profile = ProfileSerializer()

    class Meta:
        model = User
        fields = ['username', 'full_name', 'email', 'profile']

class FollowSerializer(serializers.ModelSerializer):
    user1 = serializers.CharField(source='user1.username', read_only=True)
    user2 = serializers.CharField(source='user2.username', read_only=True)

    class Meta:
        model = Follow
        fields = ['user1', 'user2', 'created_at']
