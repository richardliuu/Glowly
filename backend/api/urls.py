from django.urls import path, include
from api.views

# When creating the views folder, will need to change how the class based views are imported 

urlpatterns = [
    path("posts/", views.PostListCreate.as_view(), name="post-list"),
    path("posts/delete/<int:pk>/", views.PostDelete.as_view(), name="post-delete")
]