from django.contrib.auth.models import User
from django.db.models import Q
from django.shortcuts import render
from rest_framework import authentication, permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView
from users.models import SearchTerm

from .models import MET_VALS, Livestream
from .serializers import LivestreamSerializer


# Create your views here.
class StartStreamView(APIView): # start stream
    permission_classes = (permissions.IsAuthenticated,)
    
    def post(self, request, format=None):
        serializer = LivestreamSerializer(data=request.data, context={'request':self.request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class EndStreamView(APIView): # end stream
    permission_classes = (permissions.IsAuthenticated,)

    def delete(self, request, id, format=None):
        stream = get_object_or_404(Livestream, id=id)
        if stream.author.username != request.user.username:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        else:	
            stream.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)

class JoinStreamView(APIView):  # join stream

    #permission_classes = (permissions.IsAuthenticated,)
    permission_classes = (permissions.AllowAny,)

    def get(self, request, pk, format=None):
        stream = get_object_or_404(Livestream, stream_id__iexact=request.data.stream_id)
        serializer = LivestreamSerializer(stream, context={'request':self.request})
        return Response(serializer.data)
    
class LeaveStreamView(APIView):  # leave stream

    #permission_classes = (permissions.IsAuthenticated,)
    permission_classes = (permissions.AllowAny,)

    def get(self, request, format=None):
        streams = Livestream.objects.all()
        serializer = LivestreamSerializer(streams, many=True, context={'request':self.request})
        return Response(serializer.data)
    
class TitleStreamListView(APIView):  # get_livestream_by_title()
    permission_classes = (permissions.IsAuthenticated,)

    def get(self, request, format=None):
        query = request.GET.get('query')
        category = request.GET.get('category')
        streams = Livestream.objects.none()
        if query:
            streams = Livestream.objects.filter(Q(title__icontains=query))
            if category and category in MET_VALS:
                streams = streams.filter(category=category)
            if streams and not SearchTerm.objects.filter(term=query):
                SearchTerm.objects.create(user=request.user, term=query)
        serializer = LivestreamSerializer(streams, many=True, context={'request':self.request})
        return Response(serializer.data)

class GetStreamsListView(APIView): # get_livestreams()

    #permission_classes = (permissions.IsAuthenticated,)
    permission_classes = (permissions.AllowAny,)

    def get(self, request, format=None):
        streams = Livestream.objects.all()
        category = request.GET.get('category')
        if category and category in MET_VALS:
            streams = streams.filter(category=category)
        serializer = LivestreamSerializer(streams, many=True, context={'request':self.request})
        return Response(serializer.data)

