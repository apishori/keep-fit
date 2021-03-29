from django.test import TestCase
from .models import Livestream
from users.models import User
from django.test import Client



# Create your tests here.



class StartValidStreamTestCase(TestCase): # Start a Valid Stream (Bugged)

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
        	video_APIKey = 'testapi',
        	title = 'testtitle',
            author = user,
            category = "Y",
        )
        stream.save()
    
    def test_all_valid(self):
        c = Client()
        res1 = c.post('/users/login/', {'username': 'TestUser', 'password': 'testing12345'})
        self.assertEqual(res1.status_code, 200)
        res2 = c.post('/livestreams/start/', {'stream_id': 'teststring', 'video_APIKey': 'testapi', 'title': 'testtitle', 'author': res1, 'category': 'Y'})
        self.assertEqual(res2.status_code, 201)
        self.assertEqual(res2.data.get('title'), 'testtitle')

    


class EmptyTitleStreamTestCase(TestCase): # Attempt to start a stream with an empty title

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
            video_APIKey = 'testapi',
            title = 'testtitle',
            author = user,
            category = "Y",
        )
        stream.save()

    def test_empty_title(self): 
        c = Client()
        res1 = c.post('/users/login/', {'username': 'TestUser', 'password': 'testing12345'})
        self.assertEqual(res1.status_code, 200)
        res2 = c.post('/livestreams/start/', {'stream_id': 'teststring', 'video_APIKey': 'testapi', 'title': '', 'author': res1, 'category': 'Y'})
        self.assertEqual(res2.status_code, 400)


        


class AllStreamsTestCase(TestCase): # Display all current livestreams
    def setUp(self):
        user = User.objects.create_user(
            username='TestUser',
            email='test@usc.edu',
            password='testing12345',
            first_name='Test',
            last_name='User'
        )
        user.save()
        stream1 = Livestream.objects.create(
            stream_id = 'id1',
            video_APIKey = 'api1',
            title = 'cardio',
            author = user,
            category = "HC",
        )
        stream1.save()
        stream2 = Livestream.objects.create(
            stream_id = 'id2',
            video_APIKey = 'api2',
            title = 'cycling',
            author = user,
            category = "C",
        )
        stream2.save()
        stream3 = Livestream.objects.create(
            stream_id = 'id3',
            video_APIKey = 'api3',
            title = 'pushups',
            author = user,
            category = "O",
        )
        stream3.save()

    def test_get_all(self):
        c = Client()
        res = c.get('/livestreams/')
        self.assertEqual(res.status_code, 200)
        self.assertEqual(len(res.data), 3)
        self.assertEqual(res.data[0]['title'], 'cardio')
        self.assertEqual(res.data[1]['title'], 'cycling')
        self.assertEqual(res.data[2]['title'], 'pushups')


class SearchLivestreamTestCase(TestCase): # Search by title and have multiple livestreams appear in search result
    
    def setUp(self):
        user1 = User.objects.create_user(
            username='TestUser1',
            email='test1@usc.edu',
            password='testing123',
            first_name='First',
            last_name='User'
        )
        user1.save()

        stream1 = Livestream.objects.create(
            stream_id = 'abc123sc',
            video_APIKey = 'api1',
            title = 'title1',
            author = user,
            category = "Y",
        )
        stream1.save()

    def test_query_empty(self):
        c = Client()
        res = c.get('/livestreams/search/')
        self.assertEqual(res.status_code, 200)
        self.assertEqual(len(res.data), 0)

    def test_query_single(self):
        c = Client()
        res = c.get('/livestreams/search/?query=abc123')
        self.assertEqual(res.status_code, 200)
        self.assertEqual(len(res.data), 1)
        self.assertEqual(res.data[0]['title'], 'abc123sc')
    



class SearchMultiLivestreamTestCase(TestCase): # Search by title and have multiple livestreams pop up
    
    def setUp(self):
        user1 = User.objects.create_user(
            username='TestUser1',
            email='test1@usc.edu',
            password='testing123',
            first_name='First',
            last_name='User'
        )
        user1.save()

        user2 = User.objects.create_user(
            username='TestUser2',
            email='test2@usc.edu',
            password='testing456',
            first_name='Second',
            last_name='User'
        )
        user2.save()

        stream1 = Livestream.objects.create(
            stream_id = 'id1',
            video_APIKey = 'api1',
            title = 'abc123sc',
            author = user,
            category = "Y",
        )
        stream1.save()

        stream2 = Livestream.objects.create(
            stream_id = 'id2',
            video_APIKey = 'api2',
            title = 'def456sc',
            author = user,
            category = "Y",
        )
        stream2.save()

    
    def test_query_multi(self):
        c = Client()
        res = c.get('/posts/search/?query=sc')
        self.assertEqual(res.status_code, 200)
        self.assertEqual(len(res.data), 2)
        self.assertEqual(res.data[0]['title'], 'abc123sc')
        self.assertEqual(res.data[1]['title'], 'def456sc')

