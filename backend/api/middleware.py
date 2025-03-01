from urllib.parse import parse_qs
from knox.auth import TokenAuthentication
from django.contrib.auth.models import AnonymousUser
from channels.db import database_sync_to_async

class TokenAuthMiddleware:
    def __init__(self, inner):
        self.inner = inner

    async def __call__(self, scope, receive, send):
        query_string = parse_qs(scope["query_string"].decode())
        token = query_string.get("token", [None])[0]

        user = AnonymousUser()  # Default to AnonymousUser

        if token:
            auth = TokenAuthentication()
            try:
                user_auth_tuple = await database_sync_to_async(auth.authenticate_credentials)(token.encode())
                if user_auth_tuple:
                    user = user_auth_tuple[0]  # Extract user from the auth tuple
            except Exception as e:
                print(f"Token authentication failed: {e}")

        # Add the user to the scope
        scope["user"] = user

        # Call the inner WebSocket handler (e.g., consumer)
        await self.inner(scope, receive, send)

