from django.conf.urls import include
from django.urls import path
from rest_framework import routers

from api.views import MovieViewSet, RatingViewSet, UserViewSet

router = routers.DefaultRouter()
router.register('/movies', MovieViewSet)
router.register('/ratings', RatingViewSet)
router.register('/users', UserViewSet)
urlpatterns = [
    path('', include(router.urls)),
]