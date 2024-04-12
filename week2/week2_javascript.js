console.log('======task1======')
function findAndPrint(messages, currentStation) {
    const songshan = ['Songshan', 'Nanjing Sanmin', 'Taipei Arena', 'Nanjing Fuxing', 'Songjiang Nanjing',
        'Zhongshan', 'Beimen', 'Ximen', 'Xiaonanmen',
        'Chiang Kai-Shek Memorial Hall', 'Guting', 'Taipower Building', 'Gongguan',
        'Wanlong', 'Jingmei', 'Dapinglin', 'Qizhang', 'Xindian City Hall', 'Xindian', 'Xiaobitan'];

    const nearSt = {};
    const distance = {};
    const currentIndex = songshan.indexOf(currentStation);
    let minIndex = 20;
    let closePerson = null;

    for (const [key, value] of Object.entries(messages)) {
        for (const station of songshan) {
            if (value.includes(station)) {
                nearSt[key] = station;
                break;
            }
        }
    }

    for (const [key, value] of Object.entries(nearSt)) {
        let index;
        if (value === 'Xiaobitan') {
            if (['Songshan', 'Nanjing Sanmin', 'Taipei Arena', 'Nanjing Fuxing', 'Songjiang Nanjing',
                'Zhongshan', 'Beimen', 'Ximen', 'Xiaonanmen',
                'Chiang Kai-Shek Memorial Hall', 'Guting', 'Taipower Building', 'Gongguan',
                'Wanlong', 'Jingmei', 'Dapinglin', 'Qizhang'].includes(currentStation)) {
                index = Math.abs(17 - currentIndex);
                distance[key] = index;
            } else if (['Xindian City Hall', 'Xindian', 'Xiaobitan'].includes(currentStation)) {
                index = Math.abs(19 - currentIndex);
                distance[key] = index;
            }
        } else {
            if (currentStation === 'Xiaobitan') {
                if (['Songshan', 'Nanjing Sanmin', 'Taipei Arena', 'Nanjing Fuxing', 'Songjiang Nanjing',
                    'Zhongshan', 'Beimen', 'Ximen', 'Xiaonanmen',
                    'Chiang Kai-Shek Memorial Hall', 'Guting', 'Taipower Building', 'Gongguan',
                    'Wanlong', 'Jingmei', 'Dapinglin', 'Qizhang'].includes(value)) {
                    index = Math.abs(songshan.indexOf(value) - 17);
                    distance[key] = index;
                } else {
                    index = Math.abs(songshan.indexOf(value) - 19);
                    distance[key] = index;
                }
            } else {
                index = Math.abs(songshan.indexOf(value) - currentIndex);
                distance[key] = index;
            }
        }
    }

    for (const [name, dist] of Object.entries(distance)) {
        if (minIndex > dist) {
            minIndex = dist;
            closePerson = name;
        }
    }
    console.log(closePerson);
}

const messages = {
    "Leslie": "I'm at home near Xiaobitan station.",
    "Bob": "I'm at Ximen MRT station.",
    "Mary": "I have a drink near Jingmei MRT station.",
    "Copper": "I just saw a concert at Taipei Arena.",
    "Vivian": "I'm at Xindian station waiting for you."
};

findAndPrint(messages, "Wanlong"); // print Mary
findAndPrint(messages, "Songshan"); // print Copper
findAndPrint(messages, "Qizhang"); // print Leslie
findAndPrint(messages, "Ximen"); // print Bob
findAndPrint(messages, "Xindian City Hall"); // print Vivian

console.log('======task2======')

let timeTable = [];

function book(consultants, hour, duration, criteria) {
    let com = [];
    const num = consultants.length;

    // 創立time table 不同的consultants
    if (timeTable.length === 0) {
        for (const consultant of consultants) {
            timeTable.push([]);
        }
    }

    // 加入com list
    for (let p = 0; p < num; p++) {
        let check = true;
        for (let t = 0; t < duration; t++) {
            const time = hour + t;
            if (!timeTable[p].includes(time)) {
                check = true;
            } else {
                check = false;
                break;
            }
        }
        if (check) {
            com.push(consultants[p].name);
        }
    }

    // 檢查com 裡面的人是否符合criteria
    let bookName = null;
    let criteriaCom = {};
    if (criteria === 'price' && com.length !== 0) {
        for (const name of com) {
            for (const consultant of consultants) {
                if (consultant.name === name) {
                    criteriaCom[name] = consultant.price;
                }
            }
        }
        // 比較dict 裡面的criteria, low price
        let lowPrice = null;
        for (const [n, v] of Object.entries(criteriaCom)) {
            if (lowPrice === null || v < lowPrice) {
                lowPrice = v;
                bookName = n;
            }
        }
        console.log(bookName);
    } else if (criteria === 'rate' && com.length !== 0) {
        for (const name of com) {
            for (const consultant of consultants) {
                if (consultant.name === name) {
                    criteriaCom[name] = consultant.rate;
                }
            }
        }
        // 比較dict 裡面的criteria, high rate
        let highRate = null;
        for (const [n, v] of Object.entries(criteriaCom)) {
            if (highRate === null || v > highRate) {
                highRate = v;
                bookName = n;
            }
        }
        console.log(bookName);
    } else if (com.length === 0) {
        console.log('No service');
    }

    // 把預定時間加入到bookName名字的time_table
    for (let k = 0; k < num; k++) {
        if (com.length === 0) break;
        if (consultants[k].name === bookName) {
            for (let i = 0; i < duration; i++) {
                timeTable[k].push(hour + i);
            }
        }
    }

    // console.log(timeTable);
}

const consultants = [
    {"name": "John", "rate": 4.5, "price": 1000},
    {"name": "Bob", "rate": 3, "price": 1200},
    {"name": "Jenny", "rate": 3.8, "price": 800}
];

book(consultants, 15, 1, "price"); // Jenny
book(consultants, 11, 2, "price"); // Jenny
book(consultants, 10, 2, "price"); // John
book(consultants, 20, 2, "rate"); // John
book(consultants, 11, 1, "rate"); // Bob
book(consultants, 11, 2, "rate"); // No Service
book(consultants, 14, 3, "price"); // John

console.log('=====task3=====')
function func(...data) {
    const middleNames = {};
    const counts = {};

    for (const i of data) {
        if (i.length < 4) {
            middleNames[i] = i[1];
        } else if (i.length === 4 || i.length === 5) {
            middleNames[i] = i[2];
        }
    }

    for (const [name, middleName] of Object.entries(middleNames)) {
        counts[middleName] = (counts[middleName] || 0) + 1;
    }

    const one = [];

    for (const [word, count] of Object.entries(counts)) {
        if (count === 1) {
            one.push(word);
        }
    }

    if (one.length === 0) {
        console.log("沒有");
    } else {
        for (const i of one) {
            for (const [name, middleName] of Object.entries(middleNames)) {
                if (i === middleName) {
                    console.log(name);
                }
            }
        }
    }
}

func("彭大牆", "陳王明雅", "吳明"); // print 彭大牆
func("郭靜雅", "王立強", "郭林靜宜", "郭立恆", "林花花"); // print 林花花
func("郭宣雅", "林靜宜", "郭宣恆", "林靜花"); // print 沒有
func("郭宣雅", "夏曼藍波安", "郭宣恆"); // print 夏曼藍波安

console.log('=====task4=====')
function getNumber (index){
    const sequence = [-1, 4, 4];
    let i = 0;
    while (index > 0){
        i += sequence [index%3];
        index --;
    }
    console.log(i)
}

getNumber(1); // print 4
getNumber(5); // print 15
getNumber(10); // print 25
getNumber(30); // print 70

