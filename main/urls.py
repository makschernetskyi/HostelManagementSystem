from . import views
from django.urls import path



urlpatterns = [
	path('', views.mainAppView, name="mainApp")
]