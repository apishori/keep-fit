from django.contrib import admin
from .models import Calendar, Month, Day

# Register your models here.
admin.site.register(Calendar)
admin.site.register(Month)
admin.site.register(Day)
