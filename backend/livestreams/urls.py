from django.urls import path
from . import views

urlpatterns = [
    path('start/', views.StartStreamView.as_view(), name='start-livestream'), # basically the name
    path('<int:id>/', views.EndStreamView.as_view(), name='end-livestream'), # basically the name
    path('join/<int:id>/', views.JoinStreamView.as_view(), name='join-stream'), # join stream
    path('leave/<int:id>/', views.LeaveStreamView.as_view(), name='leave-stream'), # leave stream
    path('search/', views.TitleStreamListView.as_view(), name='get-stream-title'), # search stream by title
    path('', views.GetStreamsListView.as_view(), name='get-stream-feed'), # get_livestreams()
]