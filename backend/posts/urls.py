from django.urls import path
from . import views

urlpatterns = [
    path('create/', views.CreatePostView.as_view(), name='create-post'),#create post object
    path('<int:id>/', views.PostView.as_view(), name='edit-or-delete-post'), #edit/delete a post object
    path('like/<int:id>/', views.ToggleLikeView.as_view(), name='toggle-like'), #create/delete a like object
    path('search/', views.TitlePostListView.as_view(), name='get-post-title'), #getpost_by_title() for search
    path('byauthor/', views.AuthorPostListView.as_view(), name='get-post-author'), #getpost_by_author() for author's profile
    path('bylikes/', views.LikedPostListView.as_view(), name='get-post-likes'), #getpost_by_my_likes() for my profile
    path('', views.PostListView.as_view(), name='get-post'), #getpost() for news feed
]