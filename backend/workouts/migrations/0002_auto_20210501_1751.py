# Generated by Django 3.1.7 on 2021-05-01 17:51

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('workouts', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='workout',
            name='calories_burnt',
            field=models.FloatField(),
        ),
    ]
