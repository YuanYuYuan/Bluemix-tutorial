#! /usr/bin/python
from watson_developer_cloud import NaturalLanguageClassifierV1 as NLC
import json

with open('credential.json') as f_cred:
    cred = json.load(f_cred)

with open ('classifier_info.json') as f_cls:
    cls_id = json.load(f_cls)['classifier_id']

nlc = NLC(username = cred['username'], password = cred['password'])
status = nlc.status(cls_id)

with open ('classifier_info.json', 'w') as f_cls:
    json.dump(status, f_cls, indent = 2)
print (json.dumps(status, indent=2))
