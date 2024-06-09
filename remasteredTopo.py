#!/usr/bin/env python3
import requests
import asyncio
import time
import subprocess
import socketio
import json

    # net.stop()
print("test")
sio = socketio.AsyncClient()
@sio.event
def connect():
     print('Connected to server')

@sio.on('send')
def on_send(data):
   
    data_json = json.dumps(data)
    datastring = ",".join(str(value) for value in data.values())
    subprocess.run(['sudo', 'mn', '-c'])
    subprocess.run(['sudo', 'python3', 'toporun.py', data_json])
    
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