from django.http import JsonResponse
from rest_framework.viewsets import ViewSet
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.decorators import action
import openai
from django.conf import settings

openai.api_key = settings.OPENAI_API_KEY

class MentalHealthResourceViewSet(ViewSet):
    permission_classes = [IsAuthenticated]

    @action(detail=False, methods=['post'])
    def get_resources(self, request):
        try:
            data = request.data  
            issue = data.get('mental_health_issue')

            if not issue:
                return Response({'error': 'Mental health issue is required'}, status=400)

            response = openai.ChatCompletion.create(
                model="gpt-4",
                messages=[
                    {"role": "system", "content": "You are a helpful assistant that provides mental health resources."},
                    {"role": "user", "content": f"Give me mental health resources for {issue}."}
                ],
                max_tokens=500
            )

            resources = response['choices'][0]['message']['content'].strip()

            return Response({'resources': resources})

        except Exception as e:
            return Response({'error': str(e)}, status=500)


# View for the OPENAI agent 

from django.shortcuts import render
from rest_framework import viewsets, permissions, status
from .serializers import * 
from .models import * 
from rest_framework.response import Response 
from django.contrib.auth import get_user_model, authenticate
from knox.models import AuthToken

User = get_user_model()

class LoginViewset(viewsets.ViewSet):
    permission_classes = [permissions.AllowAny]
    serializer_class = LoginSerializer

    def create(self, request): 
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid(): 
            email = serializer.validated_data['email']
            password = serializer.validated_data['password']
            user = authenticate(request, email=email, password=password)
            if user: 
                _, token = AuthToken.objects.create(user)
                return Response(
                    {
                        "user": self.serializer_class(user).data,
                        "token": token
                    }
                )
            else: 
                return Response({"error":"Invalid credentials"}, status=401)    
        else: 
            return Response(serializer.errors,status=400)



class RegisterViewset(viewsets.ViewSet):
    permission_classes = [permissions.AllowAny]
    queryset = User.objects.all()
    serializer_class = RegisterSerializer

    def create(self,request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else: 
            return Response(serializer.errors,status=400)


class UserViewset(viewsets.ViewSet):
    permission_classes = [IsAuthenticated]
    queryset = User.objects.all()
    serializer_class = RegisterSerializer

    def list(self,request):
        queryset = User.objects.all()
        serializer = self.serializer_class(queryset, many=True)
        return Response(serializer.data)

# Post View and Imports
from rest_framework.decorators import action
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.response import Response
from rest_framework import permissions, status
import logging

logger = logging.getLogger(__name__)  # Set up logging

class PostViewset(viewsets.ModelViewSet):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    permission_classes = [permissions.IsAuthenticated]
    parser_classes = [MultiPartParser, FormParser]

    def perform_create(self, serializer):
        if not self.request.user or self.request.user.is_anonymous:
            raise serializers.ValidationError({"author": "Authentication is required to create a post."})
        serializer.save(author=self.request.user)

    def create(self, request, *args, **kwargs):
        """
        Custom POST method to handle the creation of posts
        Includes validation and handling of file uploads
        """
        logger.info("Received request to create a post.")
        logger.debug(f"Request Data: {request.data}")

        data = request.data.copy()
        data["author"] = request.user.id  # Ensure the author is set

        serializer = self.get_serializer(data=data)
        if serializer.is_valid():
            serializer.save(author=request.user, image=request.FILES.get("image"))  # Handling image
            logger.info("Post created successfully.")
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        
        # Log errors if serialization fails
        logger.error(f"Serializer Errors: {serializer.errors}")
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def list(self, request, *args, **kwargs):
        """
        Override the list view to return posts only for the authenticated user
        """
        queryset = Post.objects.filter(author=request.user)
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def update(self, request, *args, **kwargs):
        """
        Override the update method to only allow updating the user's own posts
        """
        post = self.get_object()
        if post.author != request.user:
            logger.warning("Unauthorized update attempt detected.")
            return Response({'error': 'You can only update your own posts'}, status=status.HTTP_403_FORBIDDEN)
        
        logger.info(f"Updating post {post.id}")
        return super().update(request, *args, **kwargs)

    def destroy(self, request, *args, **kwargs):
        """
        Override the destroy method to only allow deleting the user's own posts
        """
        post = self.get_object()
        if post.author != request.user:
            logger.warning("Unauthorized delete attempt detected.")
            return Response({'error': 'You can only delete your own posts'}, status=status.HTTP_403_FORBIDDEN)
        
        logger.info(f"Deleting post {post.id}")
        return super().destroy(request, *args, **kwargs)

    @action(detail=True, methods=['post'])
    def like(self, request, pk=None):
        """
        Custom action to like/unlike a post
        """
        post = self.get_object()
        user = request.user

        if user in post.likes.all():
            post.likes.remove(user)
            logger.info(f"User {user.id} unliked post {post.id}")
            return Response({'status': 'unliked'}, status=status.HTTP_200_OK)
        else:
            post.likes.add(user)
            logger.info(f"User {user.id} liked post {post.id}")
            return Response({'status': 'liked'}, status=status.HTTP_200_OK)
