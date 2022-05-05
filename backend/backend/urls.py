"""backend URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import include, path
from appMpio.views import UserCreate, LoginView, LogoutView
from appMpio.urls import router
from rest_framework.authtoken.views import obtain_auth_token
from django.views.generic import TemplateView
#from rest_framework import routers



urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path("users/", UserCreate.as_view(), name="user_create"),
    path("auth/login/", LoginView.as_view(), name="login"),
    path("auth/logout/", LogoutView.as_view(), name="logout"),
    path('', TemplateView.as_view(template_name='index.html')),
    #path('api-token-auth/', obtain_auth_token, name='api_token_auth'),
    #path('api_autorization/', include('rest_framework.urls')),
    #path( 'api/' , include( 'authentication.urls' )),
]

