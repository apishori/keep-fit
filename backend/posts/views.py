from django.db.models import Count, Q
from django.shortcuts import get_object_or_404, render
from rest_framework import permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView
from users.models import SearchTerm

from .models import Post, Like, Watch, MET_VALS
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
    #permission_classes = (permissions.IsAuthenticated,)
    permission_classes = (permissions.AllowAny,)

    def delete(self, request, id, format=None):
        post = get_object_or_404(Post, id=id)
        #if post.author.username != request.user.username:
        #    return Response(status=status.HTTP_400_BAD_REQUEST)
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
    permission_classes = (permissions.IsAuthenticated,)
    
    def get(self, request, format=None):
        query = request.GET.get('query')
        category = request.GET.get('category')
        posts = Post.objects.none()
        if query:
            posts = Post.objects.filter(Q(title__icontains=query))
            if category and category in MET_VALS:
                posts = posts.filter(category=category)
            if posts and not SearchTerm.objects.filter(term=query):
                SearchTerm.objects.create(user=request.user, term=query)
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
        posts = Post.objects.all()
        category = request.GET.get('category')
        if category and category in MET_VALS:
            posts = posts.filter(category=category)
        serializer = PostSerializer(posts, many=True, context={'request':self.request})
        return Response(serializer.data)

class PostRecView(APIView): #getposts_by_recommender()
    #permission_classes = (permissions.IsAuthenticated,)
    permission_classes = (permissions.AllowAny,)
    
    def get(self, request, format=None):   
        sorted_list = Post.objects.annotate(like_count=Count('likes')).order_by('-like_count')
        serializer = PostSerializer(sorted_list, many=True, context={'request':self.request})
        return Response(serializer.data)        

class CreateWatchView(APIView): #create_watch()
    permission_classes = (permissions.IsAuthenticated,)

    def post(self, request, id, format=None):
        user = request.user
        post = get_object_or_404(Post, id=id)
        if not Watch.objects.filter(user=user, post=post):
            Watch.objects.create(user=user, post=post)
        return Response(status=status.HTTP_201_CREATED)

class GetWatchedLogView(APIView): #getposts_by_watches()
    permission_classes = (permissions.IsAuthenticated,)

    def get(self, request, format=None):   
        watched = Post.objects.filter(watches__user=request.user).order_by("watches")
        serializer = PostSerializer(watched, many=True, context={'request':self.request})
        return Response(serializer.data)         

class CleanWatchedLogView(APIView): #empty_watched_log()
    permission_classes = (permissions.IsAuthenticated,)

    def delete(self, request, format=None):
        watched = Watch.objects.filter(user=request.user)
        watched.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
        



