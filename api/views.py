from django.db.models import query
from django.db.models.base import Model
from rest_framework import viewsets
from rest_framework import mixins
from rest_framework import response
from rest_framework.views import APIView
from rest_framework import generics
from rest_framework import status
from rest_framework.response import Response
from django.http import HttpRequest
from rest_framework.request import Request
from rest_framework.renderers import BaseRenderer
from rest_framework.permissions import BasePermission, AllowAny
from django.utils.decorators import method_decorator
from django.shortcuts import get_object_or_404
from django.views.decorators.csrf import csrf_exempt
from django.core.files.uploadedfile import InMemoryUploadedFile
from . import models
from . import serializers
import re
import base64
import PIL
from io import BytesIO
from functools import reduce

class A(BasePermission):
	def has_permission(self, request, view):
		return True


class HostelViewSet(viewsets.ModelViewSet):
	queryset = models.Hostel.objects.all()
	serializer_class = serializers.HostelSerializer
	permission_classes = [AllowAny]

	def list(self, request, *args, **kwargs):
		serializer_context = {
			'request': request
		}
		queryset = models.Hostel.objects.all()
		serializer = self.serializer_class(queryset, context=serializer_context , many=True)
		for hostel_data in serializer.data:
			hostel = queryset.get(pk=hostel_data['id'])
			hostel_data['amount_of_rooms'] = len(hostel.room_set.all())
			rooms = hostel.room_set.all()
			amount_of_beds = 0;
			occupated_beds = 0;
			if rooms:
				for room in rooms:
					amount_of_beds += room.amount_of_beds
					occupated_beds += len(room.tenant_set.all())
			hostel_data['amount_of_beds'] = amount_of_beds
			hostel_data['free_space'] = amount_of_beds - occupated_beds
			
		return Response(serializer.data)


	def retrieve(self, request, pk=None, *args, **kwargs):

		serializer_context = {
			'request': request
		}

		hostel = get_object_or_404(self.queryset, pk=pk)
		serializer = self.serializer_class(hostel, context=serializer_context)
		rooms = list(map(lambda room: serializers.RoomSerializer(room, context=serializer_context).data['url'], hostel.room_set.all()))
		response = {}
		response.update(serializer.data)
		response['rooms'] = rooms
		return Response(response)
	
	def validate_tenant_addition(room_number ,pk):
		hostel = models.Hostel.objects.get(pk=pk)
		return not room_number in list(map(lambda room: room.room_number , hostel.room_set.all())) and room_number>0 and room_number<=hostel.amount_of_rooms


class RoomViewSet(viewsets.ModelViewSet):
	queryset = models.Room.objects.all()
	serializer_class = serializers.RoomSerializer
	permission_classes = [AllowAny]

	def partial_update(self, request, *args, **kwargs):
		if 'room_number' in request.data:
			hostel_pk = int(re.findall(r"\d+",request.data['hostel'])[-1:][0])
			if HostelViewSet.validate_room_addition(int(request.data['room_number']), hostel_pk):
				return super().partial_update(request, *args, **kwargs)
			return Response('incorrect room number', status = status.HTTP_400_BAD_REQUEST)
		return super().partial_update(request, *args, **kwargs)

	def retrieve(self, request, pk=None, *args, **kwargs):
	
		serializer_context = {
			'request': request
		}

		room = get_object_or_404(self.queryset, pk=pk)
		serializer = self.serializer_class(room, context=serializer_context)
		tenants = list(map(lambda tenant: serializers.TenantsSerializer(tenant, context=serializer_context).data['url'], room.tenant_set.all()))
		response = {}
		response.update(serializer.data)
		response['tenants'] = tenants
			#print(response)
		return Response(response)
	


	def validate_tenant_addition(bed_number ,pk):
		room = models.Room.objects.get(pk=pk)
		return not bed_number in list(map(lambda tenant: tenant.bed_number ,room.tenant_set.all())) and bed_number>0 and bed_number<=room.amount_of_beds





class TenantViewSet(viewsets.ModelViewSet):

	queryset = models.Tenant.objects.all()
	serializer_class = serializers.TenantsSerializer
	permission_classes = [AllowAny]

	def retrieve(self, request, pk=None, *args, **kwargs):
		serializer_context = {
			'request': request
		}
		tenant = get_object_or_404(self.queryset, pk=pk)
		serializer = self.serializer_class(tenant, context = serializer_context)
		response = {}
		response.update(serializer.data)
		hostel_serializer = serializers.HostelSerializer(tenant.room.hostel, context=serializer_context)
		response['hostel'] = hostel_serializer.data['url']
		return Response(response)


	def partial_update(self, request, *args, **kwargs):
		if 'bed_number' in request.data:
			room_pk = int(re.findall(r"\d+",request.data['room'])[-1:][0])
			if RoomViewSet.validate_tenant_addition(int(request.data['bed_number']), room_pk):
				return super().partial_update(request, *args, **kwargs)
			return Response('incorrect bed number', status = status.HTTP_400_BAD_REQUEST)
		return super().partial_update(request, *args, **kwargs)

	def create(self, request, format=None):
		serializer_context = {
			'request': request
		}
		room_pk = int(re.findall(r"\d+",request.data['room'])[-1:][0])
		
		serializer = self.serializer_class(data = request.data, context = serializer_context)
		if serializer.is_valid():
			if RoomViewSet.validate_tenant_addition(int(request.data['bed_number']), room_pk):
				serializer.save()
				return Response(serializer.data, status = status.HTTP_201_CREATED)
			else:
				print('incorrect bed number')
				return Response('incorrect bed number', status = status.HTTP_400_BAD_REQUEST)
		print(serializer.data)
		return Response(serializer.errors, status = status.HTTP_400_BAD_REQUEST)
		



