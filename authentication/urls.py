from django.urls import path, re_path
from . import views

urlpatterns = [
	path('', views.redirectToLogin),
    path('login/', views.loginPage, name="login"),
    path('signup/', views.SignUpPage, name="signup"),
    path('activate/<uidb64>/<token>/', views.ActivateAccount.as_view(), name="activate")
]
