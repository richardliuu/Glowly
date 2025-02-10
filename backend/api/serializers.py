from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Post, Comment, Like

""" 
Also may be a need for chat and notifications serializers

It will help with logging chats and notifications to a database 
"""


class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = ["id", "author", "created_date", "text"]

class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = ["id", "author", "created_date", "text"]

class LikeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Like
        fields = ["user", "post"]