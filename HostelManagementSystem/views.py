from django.shortcuts import redirect

def redirectToLogin(request):
    return redirect('/authentication/login')


def homePage(request):
    return "<h1>temporary homepage</h1>"