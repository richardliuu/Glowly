"""from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
import openai

openai.api_key = 'YOUR_OPENAI_API_KEY'

@csrf_exempt
def get_mental_health_resources(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            issue = data.get('mental_health_issue')

            if not issue:
                return JsonResponse({'error': 'Mental health issue is required'}, status=400)

            response = openai.ChatCompletion.create(
                model="gpt-4",
                messages=[
                    {"role": "system", "content": "You are a helpful assistant that provides mental health resources."},
                    {"role": "user", "content": f"Give me mental health resources for {issue}."}
                ],
                max_tokens=500
            )

            resources = response['choices'][0]['message']['content'].strip()

            return JsonResponse({'resources': resources})

        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)

    return JsonResponse({'error': 'Invalid request method'}, status=400)

"""

from django.shortcuts import render
from rest_framework import viewsets, permissions 
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
    permission_classes = [permissions.IsAuthenticated]
    queryset = User.objects.all()
    serializer_class = RegisterSerializer

    def list(self,request):
        queryset = User.objects.all()
        serializer = self.serializer_class(queryset, many=True)
        return Response(serializer.data)
