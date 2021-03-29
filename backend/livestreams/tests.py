from django.test import TestCase
from .models import Livestream
from users.models import User
from django.test import Client



# Create your tests here.



class StartStreamTestCase(TestCase): # Start a Stream

    def setUp(self):
        user = User.objects.create_user(
            username='TestUser',
            email='test@usc.edu',
            password='testing12345',
            first_name='Test',
            last_name='User'
        )
        user.save()
        stream = Livestream.objects.create(
        	stream_id = 'teststring',
        	video_APIKey = 'testapistring1412',
        	title = 'testtitlestream',
            author = user,
            category = "Y",
        )
        stream.save()
    
    def test_all_valid(self):
        c = Client()
        res1 = c.post('/users/login/', {'username': 'TestUser', 'password': 'testing12345'})
        self.assertEqual(res1.status_code, 200)
        res2 = c.post('/livestream/start/', {'stream_id': 'teststring','video_APIKey': 'testapistring1412', 'title': 'testtitlestream', 'author': res1, 'category': 'Y'})
        self.assertEqual(res2.status_code, 201)
        self.assertEqual(res2.data.get('title'), 'testtitlestream')

    def test_empty_title(self): 
        c = Client()
        res1 = c.post('/users/login/', {'username': 'TestUser', 'password': 'testing12345'})
        self.assertEqual(res1.status_code, 200)
        res2 = c.post('/posts/create/', {'stream_id': 'teststring','video_APIKey': 'testapistring1412', '': 'testtitlestream', 'author': res1, 'category': 'Y'})
        self.assertEqual(res2.status_code, 400)