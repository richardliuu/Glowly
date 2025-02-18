from django.db import models 
from django.contrib.auth.models import AbstractBaseUser
from django.contrib.auth.models import BaseUserManager

from django_rest_passwordreset.signals import reset_password_token_created 


from django.dispatch import receiver 
from django.urls import reverse 
from django.template.loader import render_to_string
from django.core.mail import EmailMultiAlternatives
from django.utils.html import strip_tags

class CustomerUserManager(BaseUserManager):



class 
    