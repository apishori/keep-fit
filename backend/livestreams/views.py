from django.shortcuts import render
from rest_framework.views import APIView

# Create your views here.
class StartStreamView(APIView): # start stream
    pass

class EndStreamView(APIView): # end stream
    pass

class JoinStreamView(APIView):  # join stream
    pass 
    
class LeaveStreamView(APIView):  # leave stream
    pass
    
class TitleStreamListView(APIView):  # get_livestream_by_title()
    pass

class GetStreamsListView(APIView): # get_livestreams()
    pass

