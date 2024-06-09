#!/usr/bin/env python3
import subprocess
import os

def install_node_python():
    try:
        # Install Node.js
        subprocess.run(['sudo', 'apt', 'update'], check=True)
        #subprocess.run(['sudo', 'apt', 'remove','--purge','nodejs','npm'], check=True)
        #subprocess.run(['sudo', 'apt', 'autoremove'], check=True)
        subprocess.run('curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -', check=True, shell=True)
        print("***********************************************Updated")
        print("***********************************************Updated")
        print("***********************************************Updated")
        print("***********************************************Updated")
        print("***********************************************Updated")
        print("***********************************************Updated")
        subprocess.run(['sudo', 'apt', 'install', '-y', 'nodejs'], check=True)
        print("***********************************************Nodeinstalled")
        print("***********************************************Nodeinstalled")
        print("***********************************************Nodeinstalled")
        print("***********************************************Nodeinstalled")
        print("***********************************************Nodeinstalled")
        print("***********************************************Nodeinstalled")
        subprocess.run(['sudo', 'apt', 'install', 'npm'], check=True)
        print("***********************************************NPM installed")
        print("***********************************************NPM installed")
        print("***********************************************NPM installed")
        print("***********************************************NPM installed")
        print("***********************************************NPM installed")
        print("***********************************************NPM installed")
        print("***********************************************NPM installed")
        subprocess.run(['sudo', 'apt', 'install', '-y', 'python3'], check=True)
        print("***********************************************Python installed")
        print("***********************************************Python installed")
        print("***********************************************Python installed")
        print("***********************************************Python installed")
        print("***********************************************Python installed")
        print("***********************************************Python installed")
        print("***********************************************Python installed")
        print("***********************************************Python installed")
        
        os.umask(0)
        mininet_dir = "./mininet"
        if not os.path.exists(mininet_dir):
            # Clone the Mininet repository if the directory does not exist
            os.umask(0)
            subprocess.run(["git", "clone", "https://github.com/mininet/mininet.git", mininet_dir],   check=True)
        print("***********************************************Mininet Done")
        print("***********************************************Mininet Done")
        print("***********************************************Mininet Done")
        print("***********************************************Mininet Done")
        print("***********************************************Mininet Done")
        print("***********************************************Mininet Done")
        print("***********************************************Mininet Done")
        print("***********************************************Mininet Done")
        if not os.path.exists("LocalMininetSockets"):
            # Clone the Mininet repository if the directory does not exist
            os.umask(0)
            subprocess.run(["git", "clone", "https://github.com/abouzaid1/LocalMininetSockets.git", "LocalMininetSockets"],   check=True)
        print("LocalSockets done")
        subprocess.run(['sudo', 'apt-get', 'install', '-y', 'mininet'], check=True)
        subprocess.run(['sudo', 'apt-get', 'install', '-y', 'mininet'], check=True)
        subprocess.run(['sudo', 'apt-get', 'install', 'openvswitch-testcontroller'], check=True)
        subprocess.run(['sudo', 'ln', '/usr/bin/ovs-testcontroller', '/usr/bin/controller'], check=True)
        # Create and activate a virtual environment (optional, but recommended)
        venv_dir = 'venv'
        os.umask(0)
        subprocess.run(['sudo', 'apt', 'install', 'python3-venv'], check=True)
        os.umask(0)
        subprocess.run(["python3", "-m", "venv", venv_dir], check=True)
        
        # Activate the virtual environment based on your shell (adjust for other shells)
        os.umask(0)
        activation_script = os.path.join(venv_dir, 'bin', 'activate')
        # If using bash 
        os.umask(0)
        subprocess.run(['bash', '-c', f'source {activation_script} && pip install python-socketio mininet requests aiohttp'])
        subprocess.run(['sudo', 'apt-get', 'upgrade', 'nodejs'], check=True)
        subprocess.run(['sudo', 'apt', 'install', 'curl'], check=True)
        
        print("***********************************************Node Update")
        print("***********************************************Node Update")
        print("***********************************************Node Update")
        print("***********************************************Node Update")
        print("***********************************************Node Update")
        print("***********************************************Node Update")
        print("***********************************************Node Update")
        print("***********************************************Node Update")
        print("***********************************************Node Update")
        os.umask(0)
        subprocess.run(['npm', 'install'], check=True)
        print("***********************************************Node.js, Python 3, python-socketio, and Mininet have been installed successfully.")
        print("***********************************************Node.js, Python 3, python-socketio, and Mininet have been installed successfully.")
        print("***********************************************Node.js, Python 3, python-socketio, and Mininet have been installed successfully.")
        print("***********************************************Node.js, Python 3, python-socketio, and Mininet have been installed successfully.")
        print("***********************************************Node.js, Python 3, python-socketio, and Mininet have been installed successfully.")
        print("***********************************************Node.js, Python 3, python-socketio, and Mininet have been installed successfully.")
        print("***********************************************Node.js, Python 3, python-socketio, and Mininet have been installed successfully.")
        print("***********************************************Node.js, Python 3, python-socketio, and Mininet have been installed successfully.")
        print("***********************************************Node.js, Python 3, python-socketio, and Mininet have been installed successfully.")
        
    except subprocess.CalledProcessError as e:
        print("Read the documentation")

if __name__ == "__main__":
    install_node_python()