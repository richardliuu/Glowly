from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics, status
from rest_framework.response import Response
from api.serializers import CommentSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from api.models import Comment

class CommentLike(generics.UpdateAPIView):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    permission_classes = [IsAuthenticated]

    def update(self, request, args, **kwargs):
        comment = self.get_object()
        user = request.user
        
        if user in comment.likes.all():
            comment.likes.remove(user)
            liked = False
        else:
            comment.likes.add(user)
            liked = True
        
        comment.save()
        return Response({"liked": liked}, status=status.HTTP_200_OK)
    