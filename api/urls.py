from rest_framework import routers
from . import views
from django.urls import path, include


router = routers.DefaultRouter()
router.register(r'tenants', views.TenantViewSet)
router.register(r'rooms', views.RoomViewSet)
router.register(r'hostels', views.HostelViewSet)

urlpatterns = [
	path('v0/', include(router.urls))
]