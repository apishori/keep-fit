# Generated by Django 3.1.7 on 2021-03-22 02:20

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('posts', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='like',
            old_name='post_id',
            new_name='post',
        ),
        migrations.RenameField(
            model_name='like',
            old_name='user_id',
            new_name='user',
        ),
    ]