#!/usr/bin/python3

import json
import cgi
import csv

courseID = cgi.FieldStorage().getvalue("data")
#courseID = 1

def tojson(courseID):
    exercisesDict = exercisesIDtoexercises()
    jsonDict = dict()


    with open("submissions.tsv") as tsvin:
        # skip eerste lijn (titels kolommen)
        next(tsvin)
        tsvin = csv.reader(tsvin, delimiter='\t')
        for row in tsvin:
            oefeningennaam = exercisesDict[row[1]]
            #kijken ofdat courseID hetzelfde is
            if int(row[6]) == int(courseID):
                #dict met correct, fout en breuk maken
                if not oefeningennaam in jsonDict:
                    jsonDict[oefeningennaam] = {"correct": 0, "fout": 0, "breuk": 0}
                if int(row[4]) == 1:
                    jsonDict[oefeningennaam]["correct"] += 1
                else:
                    #alles wat niet juist is
                    jsonDict[oefeningennaam]["fout"] += 1
                teller = int(jsonDict[oefeningennaam]["correct"])
                noemer = int(jsonDict[oefeningennaam]["fout"])
                #delen door 0 kan niet, en teller != 0 --> oefening niet gemaakt door mensen.
                if noemer != 0 and teller != 0:
                    breuk = teller / noemer
                else:
                    #hoog getal. Dus niet moeilijkste
                    breuk = 1000
                jsonDict[oefeningennaam]["breuk"] = breuk

    dictlist = list(jsonDict.items())

    top5 = sorted(dictlist, key=lambda x: x[1]["breuk"], reverse=False)[:5]

    print("Content-Type: application/json")
    print()
    print(json.dumps(top5))


def exercisesIDtoexercises():
    jsonDictex = dict()

    with open("exercises.tsv", encoding="utf-8") as tsvin:
        # skip eerste lijn (titels kolommen)
        next(tsvin)
        tsvin = csv.reader(tsvin, delimiter='\t')
        for row in tsvin:
            jsonDictex[row[0]] = row[1]

    return jsonDictex

tojson(courseID)
