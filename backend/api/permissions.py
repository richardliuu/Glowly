from rest_framework.permissions import BasePermission, SAFE_METHODS

class AllowCreateWithoutAuth(BasePermission):
    """
    Custom permission to allow unauthenticated users to create posts,
    but require authentication for other actions.
    """
    def has_permission(self, request, view):
        if request.method == "POST":  # Allow post creation for everyone
            return True
        return request.user and request.user.is_authenticated  # Require auth for others