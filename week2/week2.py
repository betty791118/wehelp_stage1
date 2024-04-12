print('======task1======')
def find_and_print(messages, current_station):
    songshan = ['Songshan','Nanjing Sanmin', 'Taipei Arena','Nanjing Fuxing','Songjiang Nanjing'
                ,'Zhongshan','Beimen', 'Ximen', 'Xiaonanmen', 
                'Chiang Kai-Shek Memorial Hall', 'Guting', 'Taipower Building', 'Gongguan', 
                'Wanlong', 'Jingmei', 'Dapinglin', 'Qizhang', 'Xindian City Hall', 'Xindian','Xiaobitan']

    near_st = dict()
    distance = dict()
    current_index = int(songshan.index(current_station))
    min_index = 20
    close_person = None

    for key , value in messages.items():
        for station in songshan:
            if station in value:
                #print(station)
                near_st[key] = station
            else:continue
    #print(near_st)
    for key, value in near_st.items():
        if value == 'Xiaobitan':
            if current_station in ['Songshan','Nanjing Sanmin', 'Taipei Arena','Nanjing Fuxing','Songjiang Nanjing'
                ,'Zhongshan','Beimen', 'Ximen', 'Xiaonanmen', 
                'Chiang Kai-Shek Memorial Hall', 'Guting', 'Taipower Building', 'Gongguan', 
                'Wanlong', 'Jingmei', 'Dapinglin', 'Qizhang']:
                index = abs(17-current_index)
                distance[key] = index
            elif current_station in ['Xindian City Hall', 'Xindian','Xiaobitan']:
                index = abs(19-current_index)
                distance[key] = index
        else:
            if current_station =='Xiaobitan':
                if value in ['Songshan','Nanjing Sanmin', 'Taipei Arena','Nanjing Fuxing','Songjiang Nanjing'
                ,'Zhongshan','Beimen', 'Ximen', 'Xiaonanmen', 
                'Chiang Kai-Shek Memorial Hall', 'Guting', 'Taipower Building', 'Gongguan', 
                'Wanlong', 'Jingmei', 'Dapinglin', 'Qizhang']:
                    index = abs(int(songshan.index(value))-17)
                    distance[key] = index
                else:
                    index = abs(int(songshan.index(value))-19)
                    distance[key] = index
            else:
                index = abs(int(songshan.index(value))-current_index)
                distance[key] = index
    #print(distance)

    for name, distance in distance.items():
        if min_index > distance:
            min_index = distance
            close_person = name
    print(close_person)

messages={
"Leslie":"I'm at home near Xiaobitan station.",
"Bob":"I'm at Ximen MRT station.",
"Mary":"I have a drink near Jingmei MRT station.",
"Copper":"I just saw a concert at Taipei Arena.",
"Vivian":"I'm at Xindian station waiting for you."
}
find_and_print(messages, "Wanlong") # print Mary
find_and_print(messages, "Songshan") # print Copper
find_and_print(messages, "Qizhang") # print Leslie
find_and_print(messages, "Ximen") # print Bob
find_and_print(messages, "Xindian City Hall") # print Vivian

print('======task2======')
time_table = list()
#檢查john 15,16 ok, 加入com, 不ok, break
#檢查bob 15, 16 ok, 加入com, 不ok, break
#檢查jenny 15 16 ok, 加入com, 不ok, break
#檢查com 裡面有誰, 檢查每一個人的criteria, 得到criteria 符合的人
#將criteria 符合的人, 在time table 裡面將hour 加進去

def book(consultants, hour, duration, criteria):
    com = list()
    num = int(len(consultants))

    
## 創立time table 不同的consultants
    if time_table == []:
        for n in consultants:
            time_table.append([])
## 加入com list
    for p in range(num):
        check = True
        for t in range(duration):
            time = hour + t
            #print('time', time)
            if check == False:
                #print(time, check)
                break
            elif time not in time_table[p]:                
                check = True
                #print(time, check)
            else:
                check = False
                #print(time, check)
        if check == True:
            com.append(consultants[p]['name'])
            #print(p,'person ok')

        
    #print(com)
#檢查com 裡面的人是否符合crieteria
##先把名字和 criteria 弄成一個dict
    lowprice = None
    highrate = None
    bookname = None
    criteria_com = dict()
    if criteria == 'price' and com != []:
        for name in com:
            for consultant in consultants:
                if consultant['name'] == name:
                    criteria_com[name] = consultant['price']
        # 比較dict 裡面的criteria, low price
        for n, v in criteria_com.items():
            if lowprice == None or v < lowprice:
                lowprice = v
                bookname = n
        print(bookname)
    elif criteria == 'rate' and com != []:
        for name in com:
            for consultant in consultants:
                if consultant['name'] == name:
                    criteria_com[name] = consultant['rate']
        # 比較dict 裡面的criteria, high rate
        for n, v in criteria_com.items():
            if highrate == None or v > highrate:
                highrate = v
                bookname = n
        print(bookname, criteria)
    elif com == []:
        print('No service')

#把預定時間加入到bookname名字的time_table

    for k in range(num):
        if com == []: break
        if consultants[k]['name'] == bookname:
            for i in range(duration):
                #print('duration',duration)
                #print("i",i)
                #print('hour',hour)
                time_table[k].append(hour+i)
    
    
    #print(time_table)



consultants=[
{"name":"John", "rate":4.5, "price":1000},
{"name":"Bob", "rate":3, "price":1200},
{"name":"Jenny", "rate":3.8, "price":800}
]


book(consultants, 15, 1, "price") # Jenny
book(consultants, 11, 2, "price") # Jenny
book(consultants, 10, 2, "price") # John
book(consultants, 20, 2, "rate") # John
book(consultants, 11, 1, "rate") # Bob
book(consultants, 11, 2, "rate") # No Service
book(consultants, 14, 3, "price") # John

print('=====task3=====')
def func(*data):
    middle_names = dict()
    counts = dict()
    for i in data:
        if len(i) < 4:
            middle_names[i] = i[1]
        elif len(i) == 4:
            middle_names[i] = i[2]
        elif len(i) == 5:
            middle_names[i] = i[2]
    #print(middle_names)
    for name, middle_name in middle_names.items():
        counts[middle_name] = counts.get(middle_name,0) + 1
    #print(counts)

    one = list()
    for word, count in counts.items():
        if count == 1:
            one.append(word)
        else: continue
    
    if len(one) == 0:
        print("沒有")
    else:
        for i in one:
            for name, middle_name in middle_names.items():
                #print(name, middle_name)
                if i == middle_name:
                    print(name)

func("彭大牆", "陳王明雅", "吳明") # print 彭大牆
func("郭靜雅", "王立強", "郭林靜宜", "郭立恆", "林花花") # print 林花花
func("郭宣雅", "林靜宜", "郭宣恆", "林靜花") # print 沒有
func("郭宣雅", "夏曼藍波安", "郭宣恆") # print 夏曼藍波安

print('=====task4=====')
def get_number(index):
    sequence = [-1, 4, 4]
    i = 0
    while index > 0:        
        i = i + sequence[index%3]        
        index = index -1
    print (i)



get_number(1) # print 4
get_number(5) # print 15
get_number(10) # print 25
get_number(30) # print 70

