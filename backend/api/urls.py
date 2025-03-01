from django.contrib import admin
from django.urls import path, include
from . import views
from rest_framework.routers import DefaultRouter
from .views import LoginViewset, UserViewset, RegisterViewset, PostViewset, MentalHealthResourceViewSet

router = DefaultRouter()
router.register('register', RegisterViewset, basename='register')
router.register('login', LoginViewset, basename='login')
router.register('users', UserViewset, basename='users')
router.register('posts', PostViewset, basename='post')
router.register(r'mental-health-resources', MentalHealthResourceViewSet, basename='mental_health_resources')

urlpatterns = [
    path('', include(router.urls))
]


