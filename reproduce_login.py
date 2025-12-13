import requests
import sys

BASE_URL = "http://127.0.0.1:8000"

def register_user(username, email, password):
    url = f"{BASE_URL}/register"
    data = {"username": username, "email": email, "password": password}
    print(f"Registering user: {username}...")
    try:
        response = requests.post(url, data=data)
        print(f"Registration Status: {response.status_code}")
        print(f"Registration Response: {response.text}")
        return response.status_code == 200 or "already registered" in response.text
    except Exception as e:
        print(f"Registration failed: {e}")
        return False

def login_user(username, password):
    url = f"{BASE_URL}/login"
    data = {
        "username": username,
        "password": password,
        "grant_type": "password"
    }
    print(f"Logging in user: {username}...")
    try:
        response = requests.post(url, data=data)
        print(f"Login Status: {response.status_code}")
        print(f"Login Response: {response.text}")
        if response.status_code == 200:
            print("Login SUCCESS")
            return True
        else:
            print("Login FAILED")
            return False
    except Exception as e:
        print(f"Login request failed: {e}")
        return False

if __name__ == "__main__":
    username = "testuser_repro"
    email = "testuser_repro@example.com"
    password = "password123"

    # Try to register first (ignore if exists)
    register_user(username, email, password)
    
    # Try to login
    success = login_user(username, password)
    
    if not success:
        sys.exit(1)
