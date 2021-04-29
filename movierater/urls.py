from django.conf.urls import include
from django.contrib import admin
from django.urls import path
from rest_framework.authtoken.views import obtain_auth_token

urlpatterns = [
    path('admin/', admin.site.urls),
    path("api", include("api.urls")),
    path('auth/', obtain_auth_token)
]