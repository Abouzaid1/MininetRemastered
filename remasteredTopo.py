#!/usr/bin/env python3
import requests
import asyncio
from mininet.net import Mininet
from mininet.topo import Topo
from mininet.node import OVSSwitch, Controller
from mininet.log import setLogLevel
from mininet.node import OVSKernelSwitch, UserSwitch
from mininet.node import CPULimitedHost, Host, Node
from mininet.node import Controller, RemoteController, OVSController
from mininet.cli import CLI
import time
import subprocess
import socketio

class MyTopology(Topo):
    def build(self):
        # Add switches
        s1 = self.addSwitch('s1')
        s2 = self.addSwitch('s2')

        # Add hosts
        h1 = self.addHost('h1', cls=Host, ip='192.168.10.1', defaultRoute='via 192.168.10.0')
        h2 = self.addHost('h2', cls=Host, ip='192.168.10.2', defaultRoute='via 192.168.10.0')
        h3 = self.addHost('h3', cls=Host, ip='192.168.20.3', defaultRoute='via 192.168.20.0')

        # Add links
        self.addLink(h1, s1)
        self.addLink(s1, h2)
        self.addLink(s2, h3)
        self.addLink(s1, s2)

def createnetwork():
    topo = MyTopology()
    net = Mininet(topo=topo, switch=OVSSwitch, controller=Controller)
    # net.get('s1').start([])
    net.start()
    net.pingAll()
    # CLI(net)
    while True:
        result = subprocess.run(["mn", "--pingall"], captureoutput=True, text=True)
        net.pingAll()
        time.sleep(5)
    # net.stop()
print("test")
sio = socketio.AsyncClient()
@sio.event
def connect():
     print('Connected to server')

@sio.on('send')
def on_send(data):
    print('topo')
    
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