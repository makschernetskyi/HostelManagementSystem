from rest_framework import serializers
from . import models




class  TenantsSerializer(serializers.HyperlinkedModelSerializer):
	class Meta:
		model = models.Tenant
		fields = ("url","id", "name", "surname", "passport_number", "passport_photo", "fee", "payment_day", "is_paid", "moving_in_date", "bed_number")
