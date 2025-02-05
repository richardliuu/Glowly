from django.db import models
from django.contrib.auth.models import User 
from PIL import Image


class Profile(models.Model):
    username = models.CharField(max_length=50)
    email = models.EmailField()
    profile_picture = models.ImageField(upload_to='avatars/')
    bio = models.TextField()

    def save_picture(self, args, **kwargs):
        super().save(args, **kwargs)

        img = Image.open(self.profile_picture.path)

        if img.height > 300 or img.width > 300:
            output_size = (300, 300)
            img.thumbnail(output_size)
            img.save(self.profile_picture.path)

    def __str__(self):
        return self.username

class Post(models.Model):
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name="post")
    text = models.TextField()
    image = models.ImageField(upload_to='postimages/')
    created_date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.text[:50]
  
    def save(self, args, **kwargs):
        super().save(args, **kwargs)

        img = Image.open(self.image.path)

        if img.height > 1800 or img.width > 1800:
            output_size = (1800, 1800)
            img.thumbnail(output_size)
            img.save(self.image.path)
    
class Comment(models.Model):
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    post = models.ForeignKey(Post, on_delete=models.CASCADE, related_name="comments")
    text = models.TextField()
    created_date = models.DateTimeField(auto_now_add=True)

class Notification(models.Model):
    pass

class Like(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    post = models.ForeignKey(Post, on_delete=models.CASCADE, related_name = "likes")

    class Meta:
        unique_together = ('user', 'post')
