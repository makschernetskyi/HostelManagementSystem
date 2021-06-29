from django.db import models


class Hostel(models.Model):
	

	adress = models.CharField(max_length = 120)
	name = models.CharField(max_length = 120, default = '')
	about = models.TextField(default = '', null=True, blank=True)
	# Gallery = models.ManyToManyField(Gallery, blank=True)



	def __str__(self):
		return self.name


class Room(models.Model):
	
	#id = models.IntegerField(primary_key=True, unique=True, null=False)
	room_name = models.CharField(max_length=100)
	room_number = models.IntegerField()
	amount_of_beds = models.IntegerField(default = 0)
	hostel = models.ForeignKey(Hostel, on_delete=models.CASCADE, null=True, default=None)

	def __str__(self):
		return self.room_name

class Tenant(models.Model):
	name = models.CharField(max_length = 50)
	surname = models.CharField(max_length = 50)
	telephone_number = models.CharField(max_length = 15, blank = True)
	passport_photo = models.TextField(default = '')
	fee = models.FloatField(default = 0)
	payment_type = models.CharField(max_length=5, blank=True, default='', null=True)
	next_payment_date = models.DateField()
	deposit = models.IntegerField(default=0)
	moving_in_date = models.DateField()
	bed_number = models.IntegerField()
	room = models.ForeignKey(Room, on_delete = models.CASCADE, default=None, null=True)

	def __str__(self):
		return self.name + " " + self.surname

#class Picture(models.Model):
#	image = models.ImageField(upload_to = 'uploads/gallery',default = None)
#	description = models.TextField(blank=True)

#	def __str__(self):
#		return self.description


#class Gallery(models.Model):
#	photos = models.ManyToManyField(Picture)
#	name = models.CharField(max_length = 50, default ='')

#	def __str__(self):
#		return self.name








