#!/usr/bin/env python3
import subprocess
import os
def install_node_python():
    try:
        # Update package list
        subprocess.run(['sudo', 'apt', 'update'], check=True)
        subprocess.run(['git', 'clone', 'https://github.com/mininet/mininet.git'], check=True)
        # Run the install.sh script
        subprocess.run(["bash", "/path/to/mininet/install.sh"], check=True)
        subprocess.run('curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -', check=True, shell=True)
        # Install Node.js
        subprocess.run(['sudo', 'apt', 'install', '-y', 'nodejs'], check=True)
        #subprocess.run(['sudo', 'apt', 'install', '-y', 'npm'], check=True)
        # Install Python 3
        subprocess.run(['sudo', 'apt', 'install', '-y', 'python3'], check=True)
        subprocess.run(['sudo', 'pip', 'install','python-socketio'], check=True)
        subprocess.run(['sudo','npm', 'install'], check=True)
        print("Node.js and Python 3 have been installed successfully.")

    except subprocess.CalledProcessError as e:
        print(f"An error occurred: {e}")
        print("Please run this script with sudo privileges.")

if __name__ == "__main__":
    install_node_python()