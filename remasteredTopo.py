#!/usr/bin/env python3
import requests
import asyncio
import time
import subprocess
import socketio


    # net.stop()
print("test")
sio = socketio.AsyncClient()
@sio.event
def connect():
     print('Connected to server')

@sio.on('send')
def on_send(data):
    subprocess.run(['sudo', 'python3', 'toporun.py', data], check=True)
    
def response(data):
    print('topo')
    #createnetwork()
async def main():
    try:
        await sio.connect('http://0.0.0.0:8080')
        await sio.wait()
    except Exception as e:
        print('Error:', e)

if __name__ == '__main__':
    asyncio.run(main())