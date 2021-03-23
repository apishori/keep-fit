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

class UserRegisterSerializer(UserSerializer):
    profile = None
    weight = serializers.IntegerField(source='profile.weight')
    height = serializers.IntegerField(source='profile.height')
    sex = serializers.CharField(source='profile.sex')
    birthday = serializers.DateField(source='profile.birthday')
    profile_pic = serializers.ImageField(source='profile.profile_pic', required=False)
    class Meta:
        model = User
        fields = ['username', 'first_name', 'last_name', 'email', 'password', 'weight', 'height', 'sex', 'birthday', 'profile_pic']
        write_only_fields = ['password']
    
    def validate_password(self, value):
        validate_password(value)
        return value

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password'],
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name']
        )
        user.save()

        profile_data = validated_data.pop('profile')
        user.refresh_from_db()
        user.profile.height = profile_data['height']
        user.profile.weight = profile_data['weight']
        user.profile.sex = profile_data['sex']
        user.profile.birthday = profile_data['birthday']
        if 'profile_pic' in profile_data:
            user.profile.profile_pic = profile_data['profile_pic']
        user.save()
        return user

class FollowSerializer(serializers.ModelSerializer):
    user1 = serializers.CharField(source='user1.username', read_only=True)
    user2 = serializers.CharField(source='user2.username', read_only=True)

    class Meta:
        model = Follow
        fields = ['user1', 'user2', 'created_at']
