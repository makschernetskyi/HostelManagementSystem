from rest_framework import serializers
from . import models




class  TenantsSerializer(serializers.HyperlinkedModelSerializer):
	class Meta:
		model = models.Tenant
		fields = ("url", "id", "name", "surname", "telephone_number", "passport_photo", "fee", "payment_type", "next_payment_date", "deposit", "moving_in_date", "bed_number", "room")



class RoomSerializer(serializers.HyperlinkedModelSerializer):
	class Meta:
		model = models.Room
		fields = ("url", "id", "room_name", "room_number", "amount_of_beds", "hostel")


class HostelSerializer(serializers.HyperlinkedModelSerializer):
	class Meta:
		model = models.Hostel
		fields = ("url", "id", "adress", "name", "about")