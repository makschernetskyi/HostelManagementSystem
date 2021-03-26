from rest_framework import viewsets
from . import models
from . import serializers

class TenantViewSet(viewsets.ModelViewSet):
	queryset = models.Tenant.objects.all()
	serializer_class = serializers.TenantsSerializer

class RoomViewSet(viewsets.ModelViewSet):
	queryset = models.Room.objects.all()
	serializer_class = serializers.RoomSerializer

class HostelViewSet(viewsets.ModelViewSet):
	queryset = models.Hostel.objects.all()
	serializer_class = serializers.HostelSerializer







# class TenantsList(generics.ListCreateAPIView):

# 	queryset = models.Tenant.objects.all();
# 	serializer_class = serializers.TenantsSerializer

# 	# @method_decorator(csrf_exempt)
# 	# def get(self, request, *args, **kwargs):
# 	# 	return self.list(request, *args, **kwargs)

# 	# @method_decorator(csrf_exempt)
# 	# def post(self, request, *args, **kwargs):
# 	# 	return self.create(request, *args, **kwargs)





# class TenantDetail(generics.RetrieveUpdateDestroyAPIView):

# 	queryset = models.Tenant.objects.all();
# 	serializer_class = serializers.TenantsSerializer



# 	# def get_object(self, pk):
# 	# 	try:
# 	# 		return tenant = models.Tenant.objects.get(pk = pk)
# 	# 	except models.Tenant.DoesNotExist:
# 	# 		raise Http404

# 	# @method_decorator(csrf_exempt)
# 	# def get(self, request, pk, format = None):
# 	# 	tenant = self.get_object(pk)
# 	# 	serializer = serializers.TenantsSerializer(tenant)
# 	# 	return Response(serializer)

# 	# @method_decorator(csrf_exempt)
# 	# def put(self, request, pk, format = None):
# 	# 	serializer = serializers.TenantsSerializer(data = request.data)
# 	# 	if serializer.is_valid():
# 	# 		serializer.save()
# 	# 		return Response(serializer.data, status = status.HTTP_201_CREATED)
# 	# 	else:
# 	# 		return Response(serializer.errors, status = status.HTTP_400_BAD_REQUEST)

# 	# @method_decorator(csrf_exempt)
# 	# def delete(self, request, pk, format=None):
# 	# 	tenant = self.get_object(pk)
# 	# 	tenant.delete()
# 	# 	return Response(status = status.HTTP_204_NO_CONTENT)








