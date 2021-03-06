# Generated by Django 3.0.6 on 2021-04-19 18:26

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Workout',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('calories_burnt', models.IntegerField()),
                ('category', models.CharField(choices=[('R', 'Run'), ('Y', 'Yoga'), ('HC', 'Home cardio'), ('T', 'Tennis'), ('S', 'Swimming'), ('B', 'Basketball'), ('C', 'Cycling'), ('J', 'Jump rope'), ('H', 'Hiking'), ('O', 'Other')], default='O', max_length=2)),
                ('created_at', models.DateTimeField(default=django.utils.timezone.now)),
                ('author', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
