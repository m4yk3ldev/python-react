from django.db import models
from django.contrib.auth.models import User
from django.core.validators import MaxValueValidator, MinLengthValidator

# Create your models here.


class Movie(models.Model):
    title = models.CharField(max_length=32)
    description = models.TextField(max_length=360)


class Rating(models.Model):
    movie = models.ForeignKey(Movie, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    stars = models.IntegerField(
        validators=[MinLengthValidator(1), MaxValueValidator(5)])
    
    class Meta:
        unique_together = ('user', 'movie')
        index_together = ('user', 'movie')
