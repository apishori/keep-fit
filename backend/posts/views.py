from django.shortcuts import render
from rest_framework.views import APIView

# Create your views here.

class CreatePostView(APIView):
    pass

class PostView(APIView):
    pass

class ToggleLikeView(APIView):   
    pass 
    
class TitlePostListView(APIView): #getpost_by_title()
    pass
    
class AuthorPostListView(APIView): #getpost_by_author()
    pass

class LikedPostListView(APIView): #getpost_by_mylikes()
    pass

class PostListView(APIView): #getposts()
    pass


