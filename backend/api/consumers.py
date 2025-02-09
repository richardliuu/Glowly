import json
from channels.generic.websocket import AsyncWebsocketConsumer


# Chat is currently unfinished

class ChatConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.room_name = self.scope['url_route']['kwargs']['room_name']
        self.room_group = f'chat_P{self.room_name}'

        await self.channel_layer.group_add(self.room_group, self.channel_name)
        await self.accept()
        
    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(self.room_group, self.channel_name)

    async def receive(self, text_data):
        await self.channel_layer.group_send(
            self.room_group, 
            {
                'type': 'chat_message',
                'message': text_data
            }

        )

    async def chat_message(self, event):
        message = event['message']

        await self.send(text_data=json.dumps({
            'message': message 
        }))

# Notifications

class Notification(AsyncWebsocketConsumer):
    async def connect(self):
        self.user_ID = self.scope['self'].id
        self.room_group_name = f'notifications{self.user_ID}'        
        
        await self.channel_layer.group_add(self.room_group_name, self.channel_layer) 
        await self.accept()


    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(self.room_group_name, self.channel_name) 
        
    async def receive(self, text_data):
        data = json.loads(text_data)
        message = data['message']
        await self.send(text_data=json.dumps({'message': message}))

    

    async def notification_send(self, event):
        message = event['message']

        await self.send(text_data=json.dumps({
            'message': message
        }))