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