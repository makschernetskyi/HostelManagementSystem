from django.shortcuts import render, redirect

from django.contrib.auth import (
	authenticate,
	get_user_model,
	login,
	logout
)

from django.contrib import messages
from django.contrib.sites.shortcuts import get_current_site
from django.utils.encoding import force_bytes, force_text
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.template.loader import render_to_string
from django.contrib.auth.models import User
from django.contrib.auth import logout
from django.views.generic import View, UpdateView
from django.conf import settings
from django.core.mail import EmailMessage
from django.views.decorators.csrf import csrf_protect
from django.contrib.auth.decorators import login_required

from .tokens import account_activation_token

from .forms import UserLoginForm, UserRegisterForm
from pathlib import Path
import os

BASE_DIR = Path(__file__).resolve().parent.parent




@csrf_protect
def loginPage(request, *args, **kwargs):
	print(os.path.join(BASE_DIR, "templates", "authentication", "email_confirmation.html"))
	if request.user.is_authenticated:
		return redirect('/')
	next = request.GET.get('next')
	form = UserLoginForm(request.POST or None)
	if form.is_valid():
		username = form.cleaned_data.get('username')
		password = form.cleaned_data.get('password')
		user = authenticate(username=username, password=password)
		login(request, user)
		if next:
			return redirect('/')

	context	 = {
		'form':form,
	}

	return render(request, 'authentication/login.html', context)




@csrf_protect
def SignUpPage(request, *args, **kwargs):
	if request.user.is_authenticated:
		return redirect('/')
	next = request.GET.get('next')
	form = UserRegisterForm(request.POST or None)
	if form.is_valid():
		user = form.save(commit=False)
		password = form.cleaned_data.get('password')
		user.set_password(password)
		user.is_active = False
		user.save()

		current_site = get_current_site(request)

		template = render_to_string(os.path.join(BASE_DIR, "templates", "authentication", "email_confirmation.html"),{
			'user':user,
			'domain': current_site.domain,
			'uid': urlsafe_base64_encode(force_bytes(user.pk)),
			'token': account_activation_token.make_token(user),
			})

		email = EmailMessage(
				'New Account Registration',
				template,
				settings.EMAIL_HOST_USER,
				[settings.EMAIL_HOST_USER]
			)

		email.fail_siletntly = False
		email.send()

		if next:
			return redirect(next)
		return redirect('/authentication/login')
	context	 = {
		'form':form,
	}
	return render(request,  'authentication/register.html', context)


def logoutView(request):
	logout(request)
	return redirect('/authentication/login')


class ActivateAccount(View):

	def get(self, request, uidb64, token, *args, **kwargs):
		try:
			uid = force_text(urlsafe_base64_decode(uidb64))
			user = User.objects.get(pk=uid)
		except (TypeError, ValueError, OverflowError, User.DoesNotExist):
			user = None

		if user is not None and account_activation_token.check_token(user, token):
			user.is_active = True
			user.profile.confirmed = True
			user.save()
			login(request, user)
			messages.success(request, ('Your account have been confirmed.'))
			return redirect('/')
		else:
			messages.warning(request, ('The confirmation link was invalid, possibly because it has already been used.'))
			return redirect('/authentication/signup/')


def redirectToLogin(request):
	return redirect('/authentication/login/')
