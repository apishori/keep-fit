from django.contrib.auth import authenticate, login, logout
from django.db.models import Q
from django.shortcuts import get_object_or_404
from rest_framework import permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import Follow, User
from .serializers import UserSerializer


class LoginUserView(APIView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request, format=None):
        user = authenticate(request, username=request.data['username'], password=request.data['password'])
        if user is not None:
            login(request, user)
            return Response(status=status.HTTP_200_OK)
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)

class LogoutUserView(APIView):
    permission_classes = (permissions.IsAuthenticated,)

    def get(self, request, *args, **kwargs):
        logout(request)
        return Response(status=status.HTTP_200_OK)

class ToggleFollowView(APIView):
    permission_classes = (permissions.IsAuthenticated,)

    def get(self, request, username, format=None):
        following = False
        user2 = get_object_or_404(User, username__iexact=username)
        try:
            follow = Follow.objects.get(user1=request.user, user2=user2)
        except Follow.DoesNotExist:
            follow = None
        
        if follow == None:
            Follow.objects.create(user1=request.user, user2=user2)
            following = True
        else:
            follow.delete()
        
        data = {
            "user1_username": request.user.username,
            "user2_username": username,
            "following": following
        }
        return Response(data)

class UserView(APIView):
    permission_classes = (permissions.IsAuthenticated,)

    def get(self, request, username, format=None):
        user = get_object_or_404(User, username__iexact=username)
        serializer = UserSerializer(user, context={'request':self.request})
        return Response(serializer.data)

    def put(self, request, username, format=None):
        user = get_object_or_404(User, username__iexact=username)
        if user.username != request.user.username:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        
        serializer = UserSerializer(user, data=request.data, context={'request':self.request}, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, username, format=None):
        user = get_object_or_404(User, username__iexact=username)
        if user.username != request.user.username:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        
        user.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

class RegisterUserView(APIView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request, format=None):
        return Response()

class UserSearchView(APIView):
    permission_classes = (permissions.IsAuthenticated,)

    def get(self, request, format=None):
        query = request.GET.get('query')
        users = User.objects.none()
        if query:
            users = User.objects.filter(Q(username__icontains=query) | Q(first_name__icontains=query) | Q(last_name__icontains=query))
        serializer = UserSerializer(users, many=True, context={'request': request})
        return Response(serializer.data)
