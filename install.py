import subprocess
import os

def install_node_python():
    try:
        # Install Node.js
        subprocess.run(['sudo', 'apt', 'update'], check=True)
        subprocess.run('curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -', check=True, shell=True)
        subprocess.run(['sudo', 'apt', 'install', '-y', 'nodejs'], check=True)
        subprocess.run(['sudo', 'apt', 'install', '-y', 'python3'], check=True)
        subprocess.run(["git", "clone", "https://github.com/mininet/mininet.git"], check=True)
        subprocess.run(["git", "clone", "https://github.com/Abouzaid1/LocalMininetSockets.git"], check=True)
        subprocess.run(['sudo', 'apt-get', 'install', '-y', 'mininet'], check=True)
        # Create and activate a virtual environment (optional, but recommended)
        venv_dir = 'venv'
        os.umask(0)
        subprocess.run(["python3", "-m", "venv", venv_dir], check=True)
        # Activate the virtual environment based on your shell (adjust for other shells)
        os.umask(0)
        activation_script = os.path.join(venv_dir, 'bin', 'activate')
        # If using bash 
        os.umask(0)
        subprocess.run(['bash', '-c', f'source {activation_script} && pip install python-socketio mininet'])
        os.umask(0)
        subprocess.run(['npm', 'install'], check=True)
        print("Node.js, Python 3, python-socketio, and Mininet have been installed successfully.")
    except subprocess.CalledProcessError as e:
        print(f"An error occurred: {e}")
        print("Please run this script with appropriate privileges.")

if __name__ == "__main__":
    install_node_python()