from mininet.net import Mininet
from mininet.topo import Topo
from mininet.node import OVSSwitch,Switch
from mininet.log import setLogLevel
from mininet.node import OVSKernelSwitch, UserSwitch
from mininet.node import CPULimitedHost, Host, Node
from mininet.node import Controller, RemoteController, OVSController
from mininet.cli import CLI
import sys
import json
import csv 

def run():
    arguments = sys.argv[1:]
    if len(arguments) > 0:
        print("test")
        arguments = sys.argv[1]
        print("test2")
        data = json.loads(arguments)
        print("test3")
        topo_dict = data['topo']
        print("First argument:", topo_dict)
        class MyTopology(Topo):
            def build(self):
                # Add switches
                switches = {}
                for sw in topo_dict.get('sws', []):
                    switches[sw['name']] = self.addSwitch(sw['name'])
                
        # Add routers (if any)
                routers = {}
                for router in topo_dict.get('routers', []):
                    routers[router['name']] = self.addNode(router['name'], cls=Host)
        
        # Add hosts (PCs)
                hosts = {}
                for pc in topo_dict.get('pcs', []):
                    hosts[pc['name']] = self.addHost(pc['name'])
                for link in topo_dict.get('links', []):
                    self.addLink(link['link']['from'], link['link']['to'])
                    print(link['link']['from'], link['link']['to'])
        def createnetwork():
            print(topo_dict.get('sws', []))
            topo = MyTopology()
            net = Mininet(topo=topo, switch=OVSSwitch,controller=OVSController)
            net.start()
            net.pingAll()
        createnetwork()

    else:
       print("#o arguments p#ovided.")


if __name__ == '__main__':
    run()