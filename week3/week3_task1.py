import urllib.request, urllib.parse, urllib.error
import json
import re
import csv
fhand = urllib.request.urlopen('https://padax.github.io/taipei-day-trip-resources/taipei-attractions-assignment-1')
file = json.load(fhand)
datas = file["data"]["results"]

##讀取地址檔案
fhand2 = urllib.request.urlopen('https://padax.github.io/taipei-day-trip-resources/taipei-attractions-assignment-2')
file2 = json.load(fhand2)
mrt = file2['data']
#print(file2['data'][1]['address'][5:8])
print(file2['data'][1]['SERIAL_NO'])
for data in datas:
    for st in mrt:
        if data['SERIAL_NO'] == st['SERIAL_NO']:
            data['MRT'] = st['MRT']
            data['district'] = st['address'][5:8]
for data in datas:
    url = re.findall('^http.+?jpg',data['filelist'].lower())
    #print(url[0])
    data['filelist'] = url[0]
#儲存SpotTitle,District,Longitude,Latitude,ImageURL 到spot_data
spotlist = list()
spot_data = list()
for data in datas:
    spotlist.append(data['stitle'])
    spotlist.append(data['district'])
    spotlist.append(data['longitude'])
    spotlist.append(data['latitude'])
    spotlist.append(data['filelist'])
    spot_data.append(spotlist)
    spotlist = []

print(datas[1]['district'])

with open('spot.csv', mode='w', newline='', encoding='cp950') as csvfile:
    writer = csv.writer(csvfile)
    writer.writerows(spot_data)

mrtlist = []
mrt_spot = []
for st in mrt:
    if st['MRT'] not in mrtlist:
        mrtlist.append(st['MRT'])
#print(mrtlist)

#製作mrt.csv
for i in range(len(mrtlist)):
    mrt_spot.append([mrtlist[i]])
    for data in datas:
        if data['MRT'] == mrtlist[i]:
            mrt_spot[i].append(data['stitle'])

print(mrt_spot)
with open('mrt.csv', mode='w', newline='', encoding='cp950') as csvfile:
    writer = csv.writer(csvfile)
    writer.writerows(mrt_spot)
