from django.db import models
from django.contrib.auth.models import User 
from .post_model import Post
from django.utils.timezone import now 

class Like(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    post = models.ForeignKey(Post, on_delete=models.CASCADE, related_name = "likes")
    comment = models.ForeignKey('Comment', on_delete=models.CASCADE, null=True, blank=True, related_name='comment_likes')
    created_at = models.DateTimeField(default=now)

    class Meta:
        unique_together = ('user', 'post', 'comment')

    def __str__(self):
        return f"{self.user.username} liked {self.post.text[:20]}"