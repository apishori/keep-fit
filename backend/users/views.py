from django.contrib.auth import authenticate, login, logout
from django.db.models import Q
from django.shortcuts import get_object_or_404
from rest_framework import permissions, status
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import Follow, SearchTerm, User
from .serializers import (SearchTermSerializer, UserRegisterSerializer,
                          UserSerializer)


class LoginUserView(APIView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request, format=None):
        user = authenticate(request, username=request.data['username'], password=request.data['password'])
        if user is not None:
            login(request, user)
            token = Token.objects.get(user=user)
            return Response({"token":token.key}, status=status.HTTP_200_OK)
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)

class LogoutUserView(APIView):
    permission_classes = (permissions.AllowAny,)

    def get(self, request, *args, **kwargs):
        logout(request)
        return Response(status=status.HTTP_200_OK)

class ToggleFollowView(APIView):
    #permission_classes = (permissions.IsAuthenticated,)
    permission_classes = (permissions.AllowAny,)

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
        return Response(serializer.data, status=status.HTTP_200_OK)

    def put(self, request, username, format=None):
        user = get_object_or_404(User, username__iexact=username)
        if user.username != request.user.username:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        
        serializer = UserSerializer(user, data=request.data, context={'request':self.request}, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
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
        serializer = UserRegisterSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            user = serializer.save()
            token = Token.objects.create(user=user)
            data = serializer.data
            data["token"] = token.key
            return Response(data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class UserSearchView(APIView):
    #permission_classes = (permissions.IsAuthenticated,)
    permission_classes = (permissions.AllowAny,)

    def get(self, request, format=None):
        query = request.GET.get('query')
        users = User.objects.none()
        if query:
            users = User.objects.filter(Q(username__icontains=query) | Q(first_name__icontains=query) | Q(last_name__icontains=query))
            if users and not SearchTerm.objects.filter(term=query):
                SearchTerm.objects.create(user=request.user, term=query)
        serializer = UserSerializer(users, many=True, context={'request': request})
        return Response(serializer.data, status=status.HTTP_200_OK)

class UpdatePasswordView(APIView):
    permission_classes = (permissions.IsAuthenticated,)

    def post(self, request, format=None):
        username = request.data.get('username', None)
        email = request.data.get('email', None)
        password = request.data.get('password', None)
        if request.user.username == username and password:
            if request.user.email == email:
                request.user.set_password(password)
                request.user.save()
                return Response(status=status.HTTP_202_ACCEPTED)
        return Response(status=status.HTTP_401_UNAUTHORIZED)

class SearchTermListView(APIView):
    permission_classes = (permissions.IsAuthenticated,)

    def get(self, request, format=None):
        terms = SearchTerm.objects.filter(user=request.user)
        serializer = SearchTermSerializer(terms, many=True, context={'request': request})
        return Response(serializer.data, status=status.HTTP_200_OK)
