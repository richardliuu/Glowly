from django.db import models
from django.contrib.auth.models import User 
from PIL import Image

# Like could be integrated into the database of the class 
# like = models.ManyToManyField(User, blank=True)

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