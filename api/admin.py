from django.contrib import admin

from api.models import Rating, Movie

admin.site.register(Movie)
admin.site.register(Rating)
