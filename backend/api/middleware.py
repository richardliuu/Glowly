from urllib.parse import parse_qs
from knox.auth import TokenAuthentication
from django.contrib.auth.models import AnonymousUser


#Middleware to authenticate WebSockets with Knox token.

class TokenAuthMiddleware:
    def __init__(self, inner):
        self.inner = inner

    def __call__(self, scope):
        query_string = parse_qs(scope["query_string"].decode())
        token = query_string.get("token", [None])[0]

        user = AnonymousUser()
        if token:
            auth = TokenAuthentication()
            try:
                user_auth_tuple = auth.authenticate_credentials(token.encode())
                if user_auth_tuple:
                    user = user_auth_tuple[0]
            except Exception as e:
                print(f"Token authentication failed: {e}")

        scope["user"] = user
        return self.inner(scope)


