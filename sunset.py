import asyncio
import websockets
# import dd.py 
import requests

async def start_on_sunset(uri, message):
    async with websockets.connect(uri) as websocket:
        await websocket.send(message)

websocket_uri = 'ws://raspberrypizero.local:8006/led'
message_to_send = '#ff0800'

# dd.whoIsHome()

# if dd.whoIsHome()[0]:
#     asyncio.run(start_on_sunset(websocket_uri, message_to_send))

# new version 2.0
t = requests.get('raspberrypi.local:8009/status')
if 'AtHome' in t.text:
    asyncio.run(start_on_sunset(websocket_uri, message_to_send))