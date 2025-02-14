from django.urls import path, include
from api.views import PostListCreate, PostDelete, PostEdit, PostLike
from api.views import CommentListCreate, CommentDelete, CommentLike
from api.views import CreateUserView

# When creating the views folder, will need to change how the class based views are imported 

urlpatterns = [
    path("posts/", PostListCreate.as_view(), name="post-list"),
    path("posts/delete/<int:pk>/", PostDelete.as_view(), name="post-delete"),
    path("posts/edit/<int:pk>/", PostEdit.as_view(), name="post-edit"),
    path("posts/likes", PostLike.as_view(), name="post-like"),
    path("comments/", CommentListCreate.as_view(), name="comment-list"), 
    path("comments/delete/<int:pk>/", CommentDelete.as_view(), name="comment-delete"),
    path("comments/edit/<int:pk>/", CommentLike.as_view(), name="comments-edit"),
]    