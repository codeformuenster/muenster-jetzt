import requests

URL = "https://www.datenportal-muensterland.de/api/v1/events"

reponse = requests.get(URL, auth=requests.auth.HTTPBasicAuth('user', 'password'))

if reponse.status_code != 200:
    raise requests.HTTPError

response_dict = reponse.json()

response_dict.keys()
