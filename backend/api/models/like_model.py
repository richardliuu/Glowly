from django.db import models
from django.contrib.auth.models import User 
from .post_model import Post

class Like(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    post = models.ForeignKey(Post, on_delete=models.CASCADE, related_name = "likes")

    class Meta:
        unique_together = ('user', 'post')