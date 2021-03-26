from rest_framework import serializers
from . import models




class  TenantsSerializer(serializers.HyperlinkedModelSerializer):
	class Meta:
		model = models.Tenant
		fields = ("url","id", "name", "surname", "passport_number", "passport_photo", "fee", "payment_day", "is_paid", "moving_in_date", "bed_number")



class RoomSerializer(serializers.HyperlinkedModelSerializer):
	class Meta:
		model = models.Room
		fields = ("url", "id", "room_name", "room_number", "amount_of_beds", "occupated_beds", "tenants")


class HostelSerializer(serializers.HyperlinkedModelSerializer):
	class Meta:
		model = models.Hostel
		fields = ["url", "id", "adress", "name", "amount_of_rooms", "amount_of_beds", "occupated_beds", "about", "rooms"]