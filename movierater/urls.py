from django.conf.urls import include, url
from django.contrib import admin
from django.urls import path
from rest_framework.authtoken.views import obtain_auth_token

from api.views import ReactTest

urlpatterns = [
    path('admin/', admin.site.urls),
    path("api", include("api.urls")),
    path('auth/', obtain_auth_token),
    url('test', ReactTest.as_view())
]