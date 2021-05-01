from django.urls import path
from . import views
from rest_framework.authtoken import views as auth_views

urlpatterns = [
    #User Endpoints
    path('login/', views.LoginUserView.as_view(), name='login-user'),
    path('logout/', views.LogoutUserView.as_view(), name='logout-user'),
    path('register/', views.RegisterUserView.as_view(), name='register-user'),
    path('search/', views.UserSearchView.as_view(), name='search-user'),
    path('forgot_password/', views.ForgotPasswordView.as_view(), name='forgot-password'),
    path('token/', auth_views.obtain_auth_token, name='obtain-token'),

    #Search Term Endpoints
    path('searchterms/', views.SearchTermListView.as_view(), name='search-terms-list'),
    
    #Follow Endpoints
    path('follow/<str:username>/', views.ToggleFollowView.as_view(), name='toggle-follow'),
    
    #Profile Endpoints
    path('<str:username>/', views.UserView.as_view(), name='edit-view-profile'),
    path('<str:username>/update_password/', views.UpdatePasswordView.as_view(), name='update-password'),
]
