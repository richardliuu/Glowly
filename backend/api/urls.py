from django.urls import path, include
from api.views import PostListCreate, PostDelete, PostEdit, PostLike
from api.views import CommentDelete, CommentLike, CommentListCreate
from api.views import CreateUserView

# When creating the views folder, will need to change how the class based views are imported 

urlpatterns = [
    path("posts/", PostListCreate.as_view(), name="post-list"),
    path("posts/delete/<int:pk>/", PostDelete.as_view(), name="post-delete"),
    path(),
    path(), 
    path(),
    path(),
]    