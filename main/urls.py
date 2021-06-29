from . import views
from django.urls import path



urlpatterns = [
	path('', views.mainAppView, name="mainApp"),
	path('hostel/', views.mainAppView, name="mainApp"),
	path('room/', views.mainAppView, name="mainApp"),
	path('tenant/', views.mainAppView, name="mainApp"),
	path('addNewHostel/', views.mainAppView, name="mainApp"),
	path('addNewRoom/', views.mainAppView, name="mainApp"),
	path('addNewTenant/', views.mainAppView, name="mainApp"),
	path('editTenant/', views.mainAppView, name="mainApp"),
	path('editRoom/', views.mainAppView, name="mainApp"),
	path('editHostel/', views.mainAppView, name="mainApp")
]