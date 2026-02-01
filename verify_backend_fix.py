import requests
import os

def test_wav_upload():
    # Create a dummy wav file if it doesn't exist
    test_file = "test_recording.wav"
    if not os.path.exists(test_file):
        with open(test_file, "wb") as f:
            f.write(b"RIFF\x24\x00\x00\x00WAVEfmt \x10\x00\x00\x00\x01\x00\x01\x00\x40\x1f\x00\x00\x40\x1f\x00\x00\x01\x00\x08\x00data\x00\x00\x00\x00")

    url = "http://127.0.0.1:8000/upload"
    
    # We need a token since the endpoint is protected
    # For testing, we can use the login endpoint if credentials are known,
    # or assume the user is already registered and logged in.
    # Given the environment, I'll try to find if there's an existing user or just try the request.
    
    print(f"Testing upload of {test_file} to {url}...")
    
    try:
        with open(test_file, "rb") as f:
            files = {"file": (test_file, f, "audio/wav")}
            # Note: This will likely fail with 401 if token is not provided.
            # However, we can check the server logs to see if it reached the processing part.
            # Actually, I'll just run it and check the status.
            response = requests.post(url, files=files)
            print(f"Response Status: {response.status_code}")
            print(f"Response Content: {response.text}")
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    test_wav_upload()
