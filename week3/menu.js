function toggleMobileMenu() {
    var mobileMenuContent = document.getElementById("mobile_menu_content");
    if (mobileMenuContent.style.display === "none"  || mobileMenuContent.style.display === ""){
        mobileMenuContent.style.display = "flex";
        console.log(mobileMenuContent.style.display);
        console.log("click1");
    }  else {
        mobileMenuContent.style.display = "none";
        console.log(mobileMenuContent.style.display);
        console.log("click2");
    }
}

function cancelMobileMenu() {
    var mobileMenuContent = document.getElementById("mobile_menu_content");
    if (mobileMenuContent.style.display === "flex" ){
        mobileMenuContent.style.display = "none";
        console.log(mobileMenuContent.style.display);
        console.log("cancel");
    } 
}

document.addEventListener('DOMContentLoaded', function() {
    getData();
});

function getData() {
    fetch("https://padax.github.io/taipei-day-trip-resources/taipei-attractions-assignment-1")
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            let promotion1 = document.getElementById("promotion1");
            let promotion2 = document.getElementById("promotion2");
            let promotion3 = document.getElementById("promotion3");

            let title1 = document.getElementById("title1");
            let title2 = document.getElementById("title2");
            let title3 = document.getElementById("title3");
            let title4 = document.getElementById("title4");
            let title5 = document.getElementById("title5");
            let title6 = document.getElementById("title6");
            let title7 = document.getElementById("title7");
            let title8 = document.getElementById("title8");
            let title9 = document.getElementById("title9");
            let title10 = document.getElementById("title10");

            // 前三個圖片
            for (let i = 0; i < 3; i++) {
                let product = data.data.results[i];
                let firstURL = extractFirstURL(product.filelist);
                let name = product.stitle;
                let img = document.createElement("img");
                img.className = 'image_small';
                img.src = firstURL;
                console.log(firstURL);
                let divPro = document.createElement("div");
                divPro.className = 'promotion';
                divPro.innerText = name;
                console.log(divPro)

                // 插入promotion 1~3 title 1~10圖片
                switch (i) {
                    case 0:
                        promotion1.appendChild(img);
                        promotion1Text.appendChild(divPro);
                        break;
                    case 1:
                        promotion2.appendChild(img);
                        promotion2Text.appendChild(divPro);
                        break;
                    case 2:
                        promotion3.appendChild(img);
                        promotion3Text.appendChild(divPro);
                        break;
                }
            }
            //大張的圖
            for (let i = 3; i < 13; i++) {
                let product = data.data.results[i];
                let firstURL = extractFirstURL(product.filelist);
                let name = product.stitle;
                let imgTitle = document.createElement("div");
                imgTitle.className = 'image_big';
                imgTitle.style.backgroundImage = "url("+firstURL+")";
                console.log(imgTitle);
                let divTitle = document.createElement("div");
                divTitle.className = 'title';
                divTitle.innerText = name;
                console.log(divTitle)

                // title 1~10圖片
                switch (i) {
                    case 3:
                        title1.appendChild(imgTitle);
                        title1.appendChild(divTitle)
                        break;
                    case 4:
                        title2.appendChild(imgTitle);
                        title2.appendChild(divTitle);
                        break;
                    case 5:
                        title3.appendChild(imgTitle);
                        title3.appendChild(divTitle);
                        break;
                    case 6:
                        title4.appendChild(imgTitle);
                        title4.appendChild(divTitle);
                        break;
                    case 7:
                        title5.appendChild(imgTitle);
                        title5.appendChild(divTitle);
                        break;
                    case 8:
                        title6.appendChild(imgTitle);
                        title6.appendChild(divTitle);
                        break;
                    case 9:
                        title7.appendChild(imgTitle);
                        title7.appendChild(divTitle);
                        break;
                    case 10:
                        title8.appendChild(imgTitle);
                        title8.appendChild(divTitle);
                        break;
                    case 11:
                        title9.appendChild(imgTitle);
                        title9.appendChild(divTitle);
                        break;
                    case 12:
                        title10.appendChild(imgTitle);
                        title10.appendChild(divTitle);
                        break;
                }
            }
        });
}


function extractFirstURL(filelist) {
    // 使用正则表达式从 filelist 中提取第一个 URL
    let lowercaseFilelist = filelist.toLowerCase();
    let regex = /^http.+?jpg/;
    let match = lowercaseFilelist.match(regex);
    return match ? match[0] : "";
}