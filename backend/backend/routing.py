# Project level directory of routing.py
# Required to allow notifactions to consumers 

from channels.routing import ProtocolTypeRouter, URLRouter
from api import routing as notifications_routing

application = ProtocolTypeRouter({
    "websocket": URLRouter(
        notifications_routing.websocket_urlpatterns
    ),
})