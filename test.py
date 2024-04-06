import requests
import time

key = ''

url = f'https://rumble.com/-livestream-api/get-data?key={key}'
headers = {
    'User-Agent': 'Your User Agent String Here',
}


def get_shit():
    retries = 3  # Number of retries
    delay = 1  # Delay between retries in seconds
    for _ in range(retries):
        try:
            response = requests.get(url, headers=headers, timeout=10)  # Timeout set to 10 seconds
            response.raise_for_status()
            data = response.json()
            return data
        except requests.exceptions.RequestException as e:
            print("Error fetching data:", e)
            print("Retrying...")
            time.sleep(delay)
    print("Max retries exceeded. Failed to fetch data.")
    return None

# # Test the function
# data = get_shit()
# if data:
#     print("Data fetched successfully:", data)


def post_chat(text):
    url = 'https://web7.rumble.com/chat/api/chat/276904052/message'
    params = {
        "chat": {
            "text": text
        }
    }
    response = requests.get(url, headers=headers)
    response.raise_for_status()
    data = response.json()

    return data


def get_videos():
    url = f"https://rumble.com/api/v0/Media.Channels.mrss?_p={key}"
    params = {
        "channel": "ReelyCoding"
    }
    response = requests.get(url, headers=headers, params=params)

    response.raise_for_status()
    data = response.json()

    return data