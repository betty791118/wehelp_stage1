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

            
            // 前三個圖片
            for (let i = 0; i < 3; i++) {
                var promotion = document.getElementById(`promotion${i + 1}`);
                var promotionText = document.getElementById(`promotion${i + 1}Text`);
                let product = data.data.results[i];
                let firstURL = extractFirstURL(product.filelist);
                let name = product.stitle;

                let imgPro = document.createElement('img');
                imgPro.className = 'image_small';
                imgPro.src = firstURL;
                console.log(firstURL);

                let divPro = document.createElement('div');
                divPro.className = 'promotionText';
                divPro.innerText = name;
                console.log(divPro)
                promotion.appendChild(imgPro);
                promotionText.appendChild(divPro);
            }
            //大張的圖
            for (let i = 3; i < 13; i++) {
                var title = document.getElementById(`title${i - 2 }`);
                let product = data.data.results[i];
                let firstURL = extractFirstURL(product.filelist);
                let name = product.stitle; // 景點
                //圖片的url
                let normalImage = document.createElement('div');
                normalImage.className = 'image_big'
                normalImage.style.backgroundImage = "url("+firstURL+")";
                console.log(normalImage);
                //文字
                let normalText = document.createElement('div');
                normalText.className = 'titleText';
                normalText.innerText = name;
                console.log(normalText)
                title.appendChild(normalImage);
                title.appendChild(normalText);
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

