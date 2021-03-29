from django.test import TestCase

from users.models import Profile, User
from django.test import Client


# Get User Profile
# Register User
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
# Get User Search List
