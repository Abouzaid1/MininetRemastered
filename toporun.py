from mininet.net import Mininet
from mininet.topo import Topo
from mininet.node import OVSSwitch, Controller
from mininet.log import setLogLevel
from mininet.node import OVSKernelSwitch, UserSwitch
from mininet.node import CPULimitedHost, Host, Node
from mininet.node import Controller, RemoteController, OVSController
from mininet.cli import CLI
import sys


arguments = sys.argv[1:]
def run():

    if len(arguments) > 0:
        first_argument = arguments[0]
        print("First argument:", first_argument)
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
        createnetwork()

    else:
        print("No arguments provided.")


if __name__ == '__main__':
    run()