from django.db import models
from django.contrib.auth.models import User
from .post_model import Post

class Comment(models.Model):
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    post = models.ForeignKey(Post, on_delete=models.CASCADE, related_name="comments")
    text = models.TextField()
    created_date = models.DateTimeField(auto_now_add=True)
    
