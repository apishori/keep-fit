from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import authentication, permissions, status
from django.contrib.auth.models import User
from .models import Livestream
from .serializers import LivestreamSerializer



# Create your views here.
class StartStreamView(APIView): # start stream

	permission_classes = (permissions.AllowAny,)
    
	def post(self, request, format=None):
		serializer = LivestreamSerializer(data=request.data, context={'request':self.request})
		if serializer.is_valid():
			serializer.save()
			return Response(serializer.data, status=status.HTTP_201_CREATED)
		else:
			return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class EndStreamView(APIView): # end stream

	permission_classes = (permissions.AllowAny,)

	def delete(self, request, id, format=None):
		stream = get_object_or_404(Livestream, id=id)
		if stream.author.username != request.user.username:
			return Response(status=status.HTTP_400_BAD_REQUEST)
		else:	
			stream.delete()
			return Response(status=status.HTTP_204_NO_CONTENT)

class JoinStreamView(APIView):  # join stream

	permission_classes = (permissions.AllowAny,)

	def get(self, request, pk, format=None):
		stream = get_object_or_404(Livestream, stream_id__iexact=request.data.stream_id)
		serializer = LivestreamSerializer(stream, context={'request':self.request})
		return Response(serializer.data)
    
class LeaveStreamView(APIView):  # leave stream

	permission_classes = (permissions.AllowAny,)

	def get(self, request, format=None):
		streams = Livestream.objects.all()
		serializer = LivestreamSerializer(streams, many=True, context={'request':self.request})
		return Response(serializer.data)
    
class TitleStreamListView(APIView):  # get_livestream_by_title()

	permission_classes = (permissions.AllowAny,)

	def get(self, request, format=None):
		query = request.GET.get('query')
		stream = Livestream.objects.none()
		if query:
			stream = Livestream.objects.filter(Q(title__icontains=query))
		else:
			serializer = LivestreamSerializer(stream, many=True, context={'request':self.request})
			return Response(serializer.data)

class GetStreamsListView(APIView): # get_livestreams()

	permission_classes = (permissions.AllowAny,)

	def get(self, request, format=None):
		streams = Livestream.objects.all()
		serializer = LivestreamSerializer(streams, many=True, context={'request':self.request})
		return Response(serializer.data)

