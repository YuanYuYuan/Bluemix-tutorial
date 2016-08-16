#! /usr/bin/python
from watson_developer_cloud import NaturalLanguageClassifierV1 as NLC
import json

with open ('credential.json') as f_cred:
    cred = json.load(f_cred)

with open ('classifier_info.json') as f_cls:
    cls_id = json.load(f_cls)['classifier_id']

nlc = NLC(username = cred['username'], password = cred['password'])
classes = nlc.classify(cls_id, '今天天氣如何')
print(json.dumps(classes, indent = 2))
