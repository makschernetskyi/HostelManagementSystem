from django.db import models

class Tenant(models.Model):

	name = models.CharField(max_length = 50)
	surname = models.CharField(max_length = 50)
	passport_number = models.CharField(max_length= 30)
	passport_photo = models.ImageField(upload_to = 'uploads/passport_photos', default=None)
	fee = models.FloatField(default = 0)
	payment_day = models.DateField()
	is_paid = models.BooleanField(default = False)
	moving_in_date = models.DateField()
	bed_number = models.IntegerField()

	def __str__(self):
		return self.name + " " + self.surname




class Room(models.Model):

	room_name = models.CharField(max_length=100)
	room_number = models.IntegerField()
	amount_of_beds = models.IntegerField(default = 0)
	occupated_beds = models.IntegerField(default = 0)
	tenants = models.ManyToManyField(Tenant, blank=True)

	def __str__(self):
		return self.room_name

class Picture(models.Model):
	image = models.ImageField(upload_to = 'uploads/gallery',default = None)
	description = models.TextField(blank=True)

	def __str__(self):
		return self.description


class Gallery(models.Model):
	photos = models.ManyToManyField(Picture)
	name = models.CharField(max_length = 50, default ='')

	def __str__(self):
		return self.name



class Hostel(models.Model):


	adress = models.CharField(max_length = 120)
	name = models.CharField(max_length = 120, default = '')
	amount_of_rooms = models.IntegerField(default = 0)
	amount_of_beds = models.IntegerField(default = 0)
	occupated_beds = models.IntegerField(default = 0)
	about = models.TextField(default = '')
	rooms = models.ManyToManyField(Room, blank=True)
	# Gallery = models.ManyToManyField(Gallery, blank=True)



	def __str__(self):
		return self.name




