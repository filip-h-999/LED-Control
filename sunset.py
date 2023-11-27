import asyncio
import websockets

async def start_on_sunset(uri, message):
    async with websockets.connect(uri) as websocket:
        await websocket.send(message)

websocket_uri = 'ws://raspberrypizero.local:8006/echo'
message_to_send = '#ff0800'

asyncio.run(start_on_sunset(websocket_uri, message_to_send))
