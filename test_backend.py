import requests
import os
import glob

url = 'http://127.0.0.1:8000/upload'

# Find a valid opus file in uploads/
opus_files = glob.glob('uploads/*.opus')
if not opus_files:
    print("No opus files found in uploads/")
    exit(1)

file_path = opus_files[0]
print(f"Using file: {file_path}")

try:
    with open(file_path, 'rb') as f:
        files = {'file': (os.path.basename(file_path), f, 'audio/ogg')}
        print(f"Sending request to {url}...")
        response = requests.post(url, files=files)
        
        print(f"Status Code: {response.status_code}")
        try:
            print("JSON:", response.json())
        except Exception as e:
            print("Failed to parse JSON:", e)
            print("Raw Content:", response.content)
except Exception as e:
    print(f"Request failed: {e}")
