# Generated by Django 3.1.6 on 2021-06-16 14:12

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0005_auto_20210613_1751'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='tenant',
            name='is_paid',
        ),
        migrations.AddField(
            model_name='tenant',
            name='deposit',
            field=models.IntegerField(default=0),
        ),
    ]