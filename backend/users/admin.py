from django.contrib import admin
from django.contrib.auth.admin import UserAdmin

from .models import Follow, Profile, SearchTerm, User

admin.site.register(User, UserAdmin)
admin.site.register(Profile)
admin.site.register(Follow)
admin.site.register(SearchTerm)
