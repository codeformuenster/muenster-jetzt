""" Scraping event API of https://www.muensterland.digital/ """

import os

import dotenv
import requests

# credentials for API connection
dotenv.load_dotenv()
URL = "https://www.datenportal-muensterland.de/api/v1/events"
USER = os.getenv("DATENPORTAL_USER")
PASSWORD = os.getenv("DATENPORTAL_PASSWORD")

# read events from API
response = requests.get(URL, auth=requests.auth.HTTPBasicAuth(USER, PASSWORD))
if response.status_code != 200:
    raise requests.HTTPError
response_dict: dict = response.json()
events: list = response_dict["data"]

# parse to Event objects
# TODO

# save to database
# TODO
