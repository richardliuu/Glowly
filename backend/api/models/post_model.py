from django.db import models
from django.contrib.auth.models import User 
from PIL import Image

class Post(models.Model):
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name="post")
    text = models.TextField()
    image = models.ImageField(upload_to='postimages/', blank=True)
    created_date = models.DateTimeField(auto_now_add=True)
    liked_by = models.ManyToManyField(User, related_name="liked_posts", blank=True)

    def __str__(self):
        return self.text[:50]
  
    def save(self, args, **kwargs):
        super().save(args, **kwargs)

        img = Image.open(self.image.path)

        if img.height > 1800 or img.width > 1800:
            output_size = (1800, 1800)
            img.thumbnail(output_size)
            img.save(self.image.path)