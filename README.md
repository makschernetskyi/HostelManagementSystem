# HostelManagementSystem

This app was created to help hostels owners control their buisness, it's very easy to  get lost in theese movings in,
movings out, just try to remember who lives in your hostel and when they must pay, difficult, right? There this app comes in


GUIDE (how to use)


1. clone this repo.
2. change Email and Database settings in root/HostelManagementApp/settings.py
3. host it or use localy, it't up to you.
4. go to your domain or localhost:8000/ and register your admin account then confirm it on provided your email. 
5. log in
6. there you are, you can add new hostels, room to them and people to the rooms, i believe interface is user friendly enough



Architecture description:

project is fullstack app, mainly based on python-django (https://www.djangoproject.com), frontend is powered by React.js (https://reactjs.org)
which is hybridly connected to django project via django views and oportunities given by webpack (https://webpack.js.org)

raw react.js app is located in web_client directory, compiled in main directory.

authentication works separately from react and uses only django authentication thus you can delete and add users by django-admin panel
other stuff is completely django, you can learn more about it from it's official website https://www.djangoproject.com.


ENJOY!!!
