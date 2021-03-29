from django.contrib.auth.password_validation import validate_password
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
    full_name = serializers.CharField(read_only=True)
    username = serializers.CharField(read_only=True)
    email = serializers.CharField(read_only=True)

    class Meta:
        model = User
        fields = ['username', 'first_name', 'last_name', 'full_name', 'email', 'profile']

    def update(self, instance, validated_data):
        instance.first_name=validated_data.get('first_name', instance.first_name)
        instance.last_name=validated_data.get('last_name', instance.last_name)

        profile_data = self.context.get('request').data

        instance.profile.height=profile_data.get('height', instance.profile.height)
        instance.profile.weight=profile_data.get('weight', instance.profile.weight)
        instance.profile.sex=profile_data.get('sex', instance.profile.sex)
        instance.profile.birthday=profile_data.get('birthday', instance.profile.birthday)
        if 'profile_pic' in profile_data:
            instance.profile.profile_pic = profile_data.get('profile_pic', instance.profile.profile_pic)
        instance.profile.save()
        return instance

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

    def validate(self, data):
        username = self.context.get('request').data.get('username')
        try:
            user = User.objects.get(username=username)
        except User.DoesNotExist:
            return data
        raise serializers.ValidationError({"user":"This user already exists"})
        

    def create(self, validated_data):
        user = User.objects.create_user(
            username=self.context.get('request').data.get('username'),
            email=validated_data.get('email'),
            password=validated_data.get('password'),
            first_name=validated_data.get('first_name'),
            last_name=validated_data.get('last_name')
        )
        user.save()

        profile_data = validated_data.pop('profile')
        user.refresh_from_db()
        profile = Profile(
            user=user,
            height=profile_data['height'],
            weight=profile_data['weight'],
            sex=profile_data['sex'],
            birthday=profile_data['birthday']
        )
        profile.save()
        if 'profile_pic' in profile_data:
            profile.profile_pic = profile_data['profile_pic']
        profile.save()
        return user

class FollowSerializer(serializers.ModelSerializer):
    user1 = serializers.CharField(source='user1.username', read_only=True)
    user2 = serializers.CharField(source='user2.username', read_only=True)

    class Meta:
        model = Follow
        fields = ['user1', 'user2', 'created_at']
