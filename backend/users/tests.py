from django.test import TestCase

from users.models import Profile, User
from django.test import Client


# Get User Profile
class GetUserProfileTestCase(TestCase):
    def setUp(self):
        user = User.objects.create_user(
            username='TestUser',
            email='test@usc.edu',
            password='testing12345',
            first_name='Test',
            last_name='User'
        )
        user.save()
        profile = Profile.objects.create(
            user=user,
            height=66,
            weight=170,
            sex='M',
            birthday='2000-08-05'
        )
        profile.save()

    def test_valid_username(self):
        c = Client()
        res = c.get('/users/testuser/')
        self.assertEqual(res.status_code, 200)
        self.assertEqual(res.data.get('username'), 'TestUser')
    
    def test_invalid_username(self):
        c = Client()
        res = c.get('/users/testloser/')
        self.assertEqual(res.status_code, 404)

# Register User
class RegisterUserTestCase(TestCase):
    def setUp(self):
        user = User.objects.create_user(
            username='TestUser',
            email='test@usc.edu',
            password='testing12345',
            first_name='Test',
            last_name='User'
        )
        user.save()
        profile = Profile.objects.create(
            user=user,
            height=66,
            weight=170,
            sex='M',
            birthday='2000-08-05'
        )
        profile.save()

    def test_valid_data(self):
        c = Client()
        res = c.post('/users/register/', {
            "username":'OtherUser',
            "email":'other@usc.edu',
            "password":'testing12345',
            "first_name":'Other',
            "last_name":'User',
            "height":66,
            "weight":170,
            "sex":'M',
            "birthday":'2000-08-05'
        })
        self.assertEqual(res.status_code, 201)
        self.assertEqual(res.data.get('username'), 'OtherUser')
    
    def test_invalid_data(self):
        c = Client()
        res = c.post('/users/register/', {
            "username":'NewUser',
            "email":'newusc.edu',
            "password":'testing',
            "first_name":'New',
            "last_name":'User',
            "height":66,
            "weight":170,
            "sex":'M',
            "birthday":'2000-08-05'
        })
        self.assertEqual(res.status_code, 400)
    
    def test_existing_user(self):
        c = Client()
        res = c.post('/users/register/', {
            "username":'TestUser',
            "email":'new@usc.edu',
            "password":'testing12345',
            "first_name":'New',
            "last_name":'User',
            "height": 66,
            "weight": 170,
            "sex":'M',
            "birthday":'2000-08-05'
        })
        self.assertEqual(res.status_code, 400)

# Login User
class LoginUserTestCase(TestCase):
    def setUp(self):
        user = User.objects.create_user(
            username='TestUser',
            email='test@usc.edu',
            password='testing12345',
            first_name='Test',
            last_name='User'
        )
        user.save()
        profile = Profile.objects.create(
            user=user,
            height=66,
            weight=170,
            sex='M',
            birthday='2000-08-05'
        )
        profile.save()

    def test_valid_username_valid_password(self):
        c = Client()
        res = c.post('/users/login/', {'username': 'TestUser', 'password': 'testing12345'})
        self.assertEqual(res.status_code, 200)
    
    def test_valid_username_invalid_password(self):
        c = Client()
        res = c.post('/users/login/', {'username': 'TestUser', 'password': 'hello12345'})
        self.assertEqual(res.status_code, 400)

    def test_invalid_username_valid_password(self):
        c = Client()
        res = c.post('/users/login/', {'username': 'BobBob', 'password': 'testing12345'})
        self.assertEqual(res.status_code, 400)

    def test_invalid_username_invalid_password(self):
        c = Client()
        res = c.post('/users/login/', {'username': 'BobBob', 'password': 'hello12345'})
        self.assertEqual(res.status_code, 400)

# Update User
class UpdateUserTestCase(TestCase):
    def setUp(self):
        user = User.objects.create_user(
            username='TestUser',
            email='test@usc.edu',
            password='testing12345',
            first_name='Test',
            last_name='User'
        )
        user.save()
        profile = Profile.objects.create(
            user=user,
            height=66,
            weight=170,
            sex='M',
            birthday='2000-08-05'
        )
        profile.save()
        user = User.objects.create_user(
            username='TestLoser',
            email='test2@usc.edu',
            password='testing12345',
            first_name='Test2',
            last_name='User'
        )
        user.save()
        profile = Profile.objects.create(
            user=user,
            height=72,
            weight=180,
            sex='F',
            birthday='2000-08-05'
        )
        profile.save()

    def test_valid_data(self):
        c = Client()
        res = c.post('/users/login/', {'username': 'TestUser', 'password': 'testing12345'})
        self.assertEqual(res.status_code, 200)
        res = c.put('/users/testuser/', {
            "first_name":'New',
            "last_name":'User',
            "height":69,
            "weight":169,
            "sex":'F',
            "birthday":'2001-08-05'
        }, content_type='application/json')
        self.assertEqual(res.status_code, 201)
        self.assertEqual(res.data.get('first_name'), 'New')
    
    def test_other_user(self):
        c = Client()
        res = c.post('/users/login/', {'username': 'TestUser', 'password': 'testing12345'})
        self.assertEqual(res.status_code, 200)
        res = c.put('/users/testloser/', {
            "first_name":'New',
            "last_name":'User',
            "height":69,
            "weight":169,
            "sex":'F',
            "birthday":'2001-08-05'
        })
        self.assertEqual(res.status_code, 400)

    def test_no_user(self):
        c = Client()
        res = c.post('/users/login/', {'username': 'TestUser', 'password': 'testing12345'})
        self.assertEqual(res.status_code, 200)
        res = c.put('/users/test/', {
            "first_name":'New',
            "last_name":'User',
            "height":69,
            "weight":169,
            "sex":'F',
            "birthday":'2001-08-05'
        })
        self.assertEqual(res.status_code, 404)

# Get User Search List
class UserSearchTestCase(TestCase):
    def setUp(self):
        user = User.objects.create_user(
            username='TestUser',
            email='test@usc.edu',
            password='testing12345',
            first_name='Test',
            last_name='User'
        )
        user.save()
        profile = Profile.objects.create(
            user=user,
            height=66,
            weight=170,
            sex='M',
            birthday='2000-08-05'
        )
        profile.save()
        user = User.objects.create_user(
            username='TestLoser',
            email='test2@usc.edu',
            password='testing12345',
            first_name='Test2',
            last_name='User'
        )
        user.save()
        profile = Profile.objects.create(
            user=user,
            height=72,
            weight=180,
            sex='F',
            birthday='2000-08-05'
        )
        profile.save()

    def test_no_query(self):
        c = Client()
        res = c.get('/users/search/')
        self.assertEqual(res.status_code, 200)
        self.assertEqual(len(res.data), 0)
    
    def test_query_both(self):
        c = Client()
        res = c.get('/users/search/?query=T')
        self.assertEqual(res.status_code, 200)
        self.assertEqual(len(res.data), 2)
        self.assertEqual(res.data[0].get('username'), 'TestUser')
        self.assertEqual(res.data[1].get('username'), 'TestLoser')


    def test_query_first(self):
        c = Client()
        res = c.get('/users/search/?query=TestUser')
        self.assertEqual(res.status_code, 200)
        self.assertEqual(len(res.data), 1)
        self.assertEqual(res.data[0].get('username'), 'TestUser')

    def test_query_second(self):
        c = Client()
        res = c.get('/users/search/?query=L')
        self.assertEqual(res.status_code, 200)
        self.assertEqual(len(res.data), 1)
        self.assertEqual(res.data[0].get('username'), 'TestLoser')
