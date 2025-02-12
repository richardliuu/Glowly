from django.shortcuts import get_object_or_404
from django.contrib.auth.models import User
from rest_framework import generics, status
from rest_framework.response import Response
from api.serializers import PostSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from api.models import Post

class PostLike(generics.UpdateAPIView):
    serializer_class = PostSerializer
    permission_classes = [IsAuthenticated]
    queryset = Post.objects.all()

    def update(self, request, *args, **kwargs):
        post = get_object_or_404(Post, id=kwargs.get("pk"))
        user = request.user
        
        if user in post.liked_by.all():
            post.liked_by.remove(user)
            liked = False
        else:
            post.liked_by.add(user)
            liked = True
        
        post.save()
        return Response({"liked": liked, "likes_count": post.liked_by.count()}, status=status.HTTP_200_OK)