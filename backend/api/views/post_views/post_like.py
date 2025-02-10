from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics, status
from rest_framework.response import Response
from api.serializers import PostSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from api.models import Post

class PostLike():
    serializer_class = PostSerializer
    permission_classes = [IsAuthenticated]

# Post like is unfinished 
# Need to add functionality aside from classes 