from django.urls import path
from . import views

urlpatterns = [
    #User Endpoints
    path('login/', views.LoginUserView.as_view(), name='login-user'),
    path('logout/', views.LogoutUserView.as_view(), name='logout-user'),
    path('register/', views.RegisterUserView.as_view(), name='register-user'),
    path('search/', views.UserSearchView.as_view(), name='search-user'),

    #Follow Endpoints
    path('follow/<str:username>/', views.ToggleFollowView.as_view(), name='toggle-follow'),
    
    #Profile Endpoints
    path('<str:username>/', views.UserView.as_view(), name='edit-view-profile'),
]
