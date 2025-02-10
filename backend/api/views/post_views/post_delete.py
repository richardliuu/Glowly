from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics, status 
from rest_framework.response import Response
from api.serializers import PostSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from api.models import Post

class PostDelete(generics.DestroyAPIView):
    serializer_class = PostSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Post.objects.filter(author=user)
