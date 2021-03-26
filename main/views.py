from django.shortcuts import render




def mainAppView(request):
	return render(request, 'index.html')
