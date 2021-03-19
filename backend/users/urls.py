from django.urls import path
from . import views

urlpatterns = [
    path('login/', views.LoginUserView.as_view(), name='login-user'),
    path('logout/', views.LogoutUserView.as_view(), name='logout-user'),
]
