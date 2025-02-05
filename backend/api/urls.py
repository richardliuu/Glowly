from django.urls import path, include
from . import views

urlpatterns = [
    path("posts/", views.PostListCreate.as_view(), name="post-list"),
    path("posts/delete/<int:pk>/", views.PostDelete.as_view(), name="post-delete")
]