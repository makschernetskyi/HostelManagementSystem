from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from django.views.decorators.csrf import csrf_exempt



@login_required(login_url='/authentication/login')
def mainAppView(request):
	return render(request, 'index.html')
