from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework import permissions, status
from rest_framework.response import Response
from django.db.models import Q
from django.shortcuts import get_object_or_404

from .models import Post, Like
from .serializers import PostSerializer

# Create your views here

class CreatePostView(APIView): #create post
    permission_classes = (permissions.IsAuthenticated,)
    
    def post(self, request, format=None):
        serializer = PostSerializer(data=request.data, context={"request":self.request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class PostView(APIView): #delete or edit post
    permission_classes = (permissions.IsAuthenticated,)

    def delete(self, request, id, format=None):
        post = get_object_or_404(Post, id=id)
        if post.author.username != request.user.username:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        post.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
        
    def put(self, request, id, format=None):
        post = get_object_or_404(Post, id=id)
        serializer = PostSerializer(post, data=request.data, context={"request":self.request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ToggleLikeView(APIView):   
    #permission_classes = (permissions.IsAuthenticated,)
    permission_classes = (permissions.AllowAny,)
    
    def get(self, request, id, format=None):
        liked = False
        post = get_object_or_404(Post, id=id)
        
        try:
            like = Like.objects.get(user=request.user, post=post)
        except Like.DoesNotExist:
            like = None
        
        #Toggle functionality
        if like == None: #if like doesnt exist, create
            Like.objects.create(user=request.user, post=post)
            liked = True
        else: #if it exists, delete it 
            like.delete()
        
        data = {
            "user": request.user.username,
            "post": id,
            "liked": liked
        }
        return Response(data)
    
class TitlePostListView(APIView): #getpost_by_title()
    #permission_classes = (permissions.IsAuthenticated,)
    permission_classes = (permissions.AllowAny,)
    
    def get(self, request, format=None):
        query = request.GET.get('query')
        posts = Post.objects.none()
        if query:
            posts = Post.objects.filter(Q(title__icontains=query))
        serializer = PostSerializer(posts, many=True, context={'request': request})
        return Response(serializer.data)
    
class AuthorPostListView(APIView): #getpost_by_author()
    permission_classes = (permissions.IsAuthenticated,)
    #permission_classes = (permissions.AllowAny,)
    
    def get(self, request, format=None):
        #my_likes = Like.objects.all().filter(user=request.user)
        filtered_posts = Post.objects.all().filter(author=request.user)
        serializer = PostSerializer(filtered_posts, many=True, context={'request':self.request})
        return Response(serializer.data)

class LikedPostListView(APIView): #getpost_by_mylikes()
    permission_classes = (permissions.IsAuthenticated,)
    #permission_classes = (permissions.AllowAny,)
    
    def get(self, request, format=None):
        #my_likes = Like.objects.all().filter(user=request.user)
        filtered_posts = Post.objects.all().filter(likes__user=request.user)
        serializer = PostSerializer(filtered_posts, many=True, context={'request':self.request})
        return Response(serializer.data)    

class PostListView(APIView): #getposts()
    #permission_classes = (permissions.IsAuthenticated,)
    permission_classes = (permissions.AllowAny,)
    
    def get(self, request, format=None):
        serializer = PostSerializer(Post.objects.all(), many=True, context={'request':self.request})
        return Response(serializer.data)