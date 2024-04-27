let checkBox = function(){
    let checkValue = document.getElementById("checkbox").checked
    if (!checkValue){
       alert("Please check the checkbox first");
       return false;
    }else{
        document.getElementById("loginForm").submit();        
    }
}

let square = function() {
    let numberInput = document.getElementById("number").value;
    let form = document.getElementById("squareForm");
    form.action = "/square/" + numberInput;
    form.submit();
}

