import asyncio
import websockets
import dd.py 

async def start_on_sunset(uri, message):
    async with websockets.connect(uri) as websocket:
        await websocket.send(message)

websocket_uri = 'ws://raspberrypizero.local:8006/led'
message_to_send = '#ff0800'

dd.whoIsHome()

if dd.whoIsHome()[0]:
    asyncio.run(start_on_sunset(websocket_uri, message_to_send))