#! /usr/bin/python
from watson_developer_cloud import NaturalLanguageClassifierV1 as NLC
import json

with open('credential.json') as f_cred:
    cred = json.load(f_cred)

nlc = NLC(username = cred['username'], password = cred['password'])

with open('weather_data_train.csv') as f_train:
    clsfier = nlc.create(
            training_data = f_train,
            name = 'python classfier',
            language = 'en')

with open ('classifier_info.json', 'w') as f_cls:
    json.dump(clsfier, f_cls, indent = 2)

print(json.dumps(clsfier, indent = 2))
