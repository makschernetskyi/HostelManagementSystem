from django.db import models

class Tenant(models.Model):

	name = models.CharField(max_length = 50)
	surname = models.CharField(max_length = 50)
	passport_number = models.CharField(max_length= 30)
	passport_photo = models.ImageField()
	fee = models.FloatField()
	payment_day = models.DateField()
	is_paid = models.BooleanField()
	moving_in_date = models.DateField()
	bed_number = models.IntegerField()


class Room(models.Model):

	room_name = models.CharField(max_length=100)
	room_number = models.IntegerField()
	amount_of_beds = models.IntegerField()
	occupated_beds = models.IntegerField()
	tenants = models.ManyToManyField(Tenant)

class Picture(models.Model):
	image = models.ImageField()
	description = models.TextField()


class Gallery(models.Model):
	photos = models.ManyToManyField(Picture)



class Hostel(models.Model):

	name = models.TextField()
	adress = models.TextField()
	amount_of_rooms = models.IntegerField()
	amount_of_beds = models.IntegerField()
	free_beds = models.IntegerField()
	about = models.TextField()
	rooms = models.ManyToManyField(Room)
	Gallery = models.ManyToManyField(Gallery)




