from django.contrib.auth.models import User
from django.db import models


class Movie(models.Model):
    title = models.CharField(max_length=32)
    description = models.TextField(max_length=360)

    class Meta:
        verbose_name = "Movie"

    def __str__(self):
        return f"{self.title} -> {self.description}"

    def no_of_ratings(self):
        ratings = Rating.objects.filter(movie=self)
        return ratings.count()

    def avg_rating(self):
        sum = 0
        ratings = Rating.objects.filter(movie=self)
        for rating in ratings:
            sum += rating.stars

        if ratings.count() > 0:
            return sum / len(ratings)
        else:
            return 0


class Rating(models.Model):
    movie = models.ForeignKey(Movie, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    stars = models.IntegerField()

    class Meta:
        unique_together = ('user', 'movie')
        index_together = ('user', 'movie')