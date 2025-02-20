from django.contrib import admin
from django.urls import path
from . import views
from rest_framework.routers import DefaultRouter
from .views import LoginViewset, UserViewset, RegisterViewset 

router = DefaultRouter()
router.register('register', RegisterViewset, basename='register')
router.register('login', LoginViewset, basename='login')
router.register('users', UserViewset, basename='users')
urlpatterns = [router.urls, path('get-resources/', views.get_mental_health_resources, name='get_mental_health_resources'),
]