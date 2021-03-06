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
from django.views.generic import View, UpdateView
from django.conf import settings
from django.core.mail import EmailMessage
from django.views.decorators.csrf import csrf_protect
from django.contrib.auth.decorators import user_passes_test

from .tokens import account_activation_token

from .forms import UserLoginForm, UserRegisterForm

@user_passes_test(lambda user: not user.username, login_url='/home', redirect_field_name=None)
@csrf_protect
def loginPage(request, *args, **kwargs):
	next = request.GET.get('next')
	form = UserLoginForm(request.POST or None)
	if form.is_valid():
		username = form.cleaned_data.get('username')
		password = form.cleaned_data.get('password')
		user = authenticate(username=username, password=password)
		login(request, user)
		if next:
			return redirect('/home')

	context	 = {
		'form':form,
	}

	return render(request, 'authentication/login.html', context)



@user_passes_test(lambda user: not user.username, login_url='/home', redirect_field_name=None)
@csrf_protect
def SignUpPage(request, *args, **kwargs):

	next = request.GET.get('next')
	form = UserRegisterForm(request.POST or None)
	if form.is_valid():
		user = form.save(commit=False)
		password = form.cleaned_data.get('password')
		user.set_password(password)
		user.is_active = False
		user.save()

		current_site = get_current_site(request)

		template = render_to_string('C:/Users/konom/Desktop/projects/HostelApp/App/HostelManagementSystem/templates/authentication/email_confirmation.html',{
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
		return redirect('login')
	context	 = {
		'form':form,
	}
	return render(request,  'authentication/register.html', context)




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
            return redirect('home')
        else:
            messages.warning(request, ('The confirmation link was invalid, possibly because it has already been used.'))
            return redirect('home')


def redirectToLogin(request):
    return redirect('/authentication/login/')
