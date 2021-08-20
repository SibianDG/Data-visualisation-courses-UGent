#!/usr/bin/python3

import json
import cgi
import csv

jsonDict = dict()

with open("courses.tsv", encoding="utf-8") as tsvin:
    #skip eerste lijn (titels kolommen)
    next(tsvin)
    tsvin = csv.reader(tsvin, delimiter='\t')
    for row in tsvin:
        jsonDict[row[0]] = row[1] + " " + row[2]

print("Content-Type: application/json")
print()
print(json.dumps(jsonDict))
