# Generated by Django 3.1.7 on 2021-05-10 02:23

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('workouts', '0002_auto_20210501_1751'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Calendar',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_at', models.DateTimeField(default=django.utils.timezone.now)),
                ('author', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Month',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('this_month', models.CharField(choices=[('Jan', 'January'), ('Feb', 'February'), ('Mar', 'March'), ('Apr', 'April'), ('May', 'May'), ('Jun', 'June'), ('Jul', 'July'), ('Aug', 'August'), ('Sep', 'September'), ('Oct', 'October'), ('Nov', 'November'), ('Dec', 'December')], max_length=3)),
                ('author', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
                ('linked_calendar', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='calendar.calendar')),
            ],
        ),
        migrations.CreateModel(
            name='Day',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('this_day', models.CharField(choices=[('1', 1), ('2', 2), ('3', 3), ('4', 4), ('5', 5), ('6', 6), ('7', 7), ('8', 8), ('9', 9), ('10', 10), ('11', 11), ('12', 12), ('13', 13), ('14', 14), ('15', 15), ('16', 16), ('17', 17), ('18', 18), ('19', 19), ('20', 20), ('21', 21), ('22', 22), ('23', 23), ('24', 24), ('25', 25), ('26', 26), ('27', 27), ('28', 28), ('29', 29), ('30', 30), ('31', 31)], max_length=2)),
                ('planned_workout', models.CharField(choices=[('R', 'Run'), ('Y', 'Yoga'), ('HC', 'Home cardio'), ('T', 'Tennis'), ('S', 'Swimming'), ('B', 'Basketball'), ('C', 'Cycling'), ('J', 'Jump rope'), ('H', 'Hiking'), ('O', 'Other')], default='O', max_length=2)),
                ('author', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
                ('linked_month', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='calendar.month')),
                ('recent_workout', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='workouts.workout')),
            ],
        ),
    ]
