# Generated by Django 3.1.6 on 2021-06-13 11:35

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0003_auto_20210609_1129'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='hostel',
            name='amount_of_beds',
        ),
        migrations.RemoveField(
            model_name='hostel',
            name='amount_of_rooms',
        ),
        migrations.RemoveField(
            model_name='hostel',
            name='occupated_beds',
        ),
    ]