# Generated by Django 3.1.6 on 2021-03-02 16:43

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('authentication', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='profile',
            old_name='email_confirmed',
            new_name='confirmed',
        ),
    ]
