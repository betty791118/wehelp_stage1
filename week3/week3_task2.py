def get_data(page_url):
    import urllib.request 
    import bs4
    import csv
    def connect_to_time(url):
        request = urllib.request.Request(url, headers = {
            "Cookie":"over18=1",
            "User-Agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36"
        })
        fhand = urllib.request.urlopen(request)
        file = fhand.read().decode('utf-8').strip()
        root = bs4.BeautifulSoup(file, "html.parser")
        time_element = root.find('span', class_='article-meta-tag', string='時間')
        #因為article-meta-value不只一個, 所以要先找到article-meta-tag的string 是時間, 在印出sibling 的span
        if time_element:
            time_value = time_element.find_next_sibling('span', class_='article-meta-value').text.strip()
            return time_value
        else:
            return ""
    #加入CSV檔
    def write_csv(data, file):
        with open(file, mode='a', newline='', encoding='cp950') as csvfile:
            writer = csv.writer(csvfile)
            writer.writerow(data)

    #找到title 那一行
    #取得Title
    #取得title 裡面的link
    #進入link把time 印出來
    #創造一個函數可以直接連線到link

    request = urllib.request.Request(page_url, headers = {
            "Cookie":"over18=1",
            "User-Agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36"
        })
    fhand = urllib.request.urlopen(request)
    file = fhand.read().decode('utf-8').strip()
    root = bs4.BeautifulSoup(file, "html.parser")
    titles = root.find_all('div', class_='title')
    likecounts = root.find_all('div', class_='nrec')


    for title, count in zip(titles, likecounts):
        string = []
        if title.a != None:
            time = connect_to_time('https://www.ptt.cc'+title.a.get('href'))
            string.append(title.a.string)
            string.append(count.span.string if count.span else '0')
            string.append(time)
            print(string)
            write_csv(string, 'article.csv')
    #找到上一頁的link 並且return出來
    lastpage = root.find('a', string = '‹ 上頁')
    lastpage_url = 'https://www.ptt.cc'+lastpage.get('href')
    return lastpage_url
    

#第一頁的資訊
page_url = 'https://www.ptt.cc/bbs/Lottery/index2081.html'

#用迴圈, 不斷去要下一頁的資訊
count = 3
while count > 0:
    print('page:'+ str(count))
    page_url = get_data(page_url)
    #print(get_data(page_url))
    count = count - 1
