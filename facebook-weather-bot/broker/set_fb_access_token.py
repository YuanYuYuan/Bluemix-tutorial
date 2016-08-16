#!/usr/bin/python
import requests
import sys
print(requests.post("https://graph.facebook.com/v2.6/me/subscribed_apps?access_token=" + str(sys.argv[1])).text)
