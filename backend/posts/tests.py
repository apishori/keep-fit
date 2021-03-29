from django.test import TestCase
from .models import Like, Post
from users.models import User
from django.test import Client

# Create your tests here.

class CreatePostTestCase(TestCase): #CREATING A POST 

    def setUp(self):
        new_user = User.objects.create_user(
            username='TestUser',
            email='test@usc.edu',
            password='testing12345',
            first_name='Test',
            last_name='User'
        )
        new_user.save()
        post = Post.objects.create(
            author = new_user,
            video = "-b2INLq3EeA",
            title = "TestPost",
            category = "Y",
        )
        post.save()
    
    def test_all_valid(self):
        c = Client()
        res1 = c.post('/users/login/', {'username': 'TestUser', 'password': 'testing12345'})
        self.assertEqual(res1.status_code, 200)
        res2 = c.post('/posts/create/', {'video': '-b2INLq3EeA', 'title': 'TestPost', 'category': 'Y', 'author': res1})
        self.assertEqual(res2.status_code, 201)
        self.assertEqual(res2.data.get('title'), 'TestPost')

    def test_empty_title(self): 
        c = Client()
        res1 = c.post('/users/login/', {'username': 'TestUser', 'password': 'testing12345'})
        self.assertEqual(res1.status_code, 200)
        res2 = c.post('/posts/create/', {'video': '-b2INLq3EeA', 'title': ' ', 'category': 'Y', 'author': res1})
        self.assertEqual(res2.status_code, 400)

class TitlePostListTestCase(TestCase): #SEARCH FOR POSTS BY TITLE
    
    def setUp(self):
        new_user = User.objects.create_user(
            username='TestUser',
            email='test@usc.edu',
            password='testing12345',
            first_name='Test',
            last_name='User'
        )
        new_user.save()
        post1 = Post.objects.create(
            author = new_user,
            video = "video1",
            title = "abcdefg",
            category = "Y",
        )
        post1.save()
        post2 = Post.objects.create(
            author = new_user,
            video = "video2",
            title = "efghijk",
            category = "Y",
        )
        post2.save()

    def test_no_query(self):
        c = Client()
        res = c.get('/posts/search/')
        self.assertEqual(res.status_code, 200)
        self.assertEqual(len(res.data), 0)
    
    def test_query_both(self):
        c = Client()
        res = c.get('/posts/search/?query=efg')
        self.assertEqual(res.status_code, 200)
        self.assertEqual(len(res.data), 2)
        self.assertEqual(res.data[0]['title'], 'abcdefg')
        self.assertEqual(res.data[1]['title'], 'efghijk')

    def test_query_first(self):
        c = Client()
        res = c.get('/posts/search/?query=abc')
        self.assertEqual(res.status_code, 200)
        self.assertEqual(len(res.data), 1)
        self.assertEqual(res.data[0]['title'], 'abcdefg')

    def test_query_second(self):
        c = Client()
        res = c.get('/posts/search/?query=hijk')
        self.assertEqual(res.status_code, 200)
        self.assertEqual(len(res.data), 1)
        self.assertEqual(res.data[0]['title'], 'efghijk')

'''
class ToggleLikeTestCase(TestCase): #TOGGLE LIKE
class AuthorPostListTestCase(TestCase): #GET POST BY AUTHOR FOR THEIR PAGE
class PostListTestCase(TestCase): #GET ALL POSTS FOR FEED
'''