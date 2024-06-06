import subprocess

def install_node_python():
    try:
        # Update package list
        subprocess.run(['sudo', 'apt', 'update'], check=True)
        
        # Install Node.js
        subprocess.run(['sudo', 'apt', 'install', '-y', 'nodejs'], check=True)
        
        # Install Python 3
        subprocess.run(['sudo', 'apt', 'install', '-y', 'python3'], check=True)

        print("Node.js and Python 3 have been installed successfully.")

    except subprocess.CalledProcessError as e:
        print(f"An error occurred: {e}")
        print("Please run this script with sudo privileges.")

if __name__ == "__main__":
    install_node_python()