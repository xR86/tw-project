//global validateName ...

function validateName(i){
    var $userName = $(".form-name").eq(i).val();
    var $userNameObject = $(".form-name[data-toggle='tooltip']").eq(i);

    //console.log("B",$userName.eq(i).val().length);

    if($userName.length === 0 || $userName.length > 31){
        if( !($userNameObject.hasClass("bad-input-focus")) ){
            $userNameObject.tooltip('show');
            $userNameObject.addClass("bad-input-focus");
            //console.log("Tooltip !");
        }
    } else {
        if($userNameObject.hasClass("bad-input-focus")){
           $userNameObject.tooltip('hide');
            $userNameObject.removeClass("bad-input-focus");
        }
    }

}

function validateName1(){
    var userName = $("#formName1").val();
    var userNameObject = $("#formName1[data-toggle='tooltip']");

    if(userName.length === 0 || userName.length > 31){
        if( !(userNameObject.hasClass("bad-input-focus")) ){
            userNameObject.tooltip('show');
            userNameObject.addClass("bad-input-focus");
            //console.log("Tooltip !");
        }
    } else {
        if(userNameObject.hasClass("bad-input-focus")){
            userNameObject.tooltip('hide');
            userNameObject.removeClass("bad-input-focus");
        }
    }
}

function validateName2(){
    var userName = $("#formName2").val();
    var userNameObject = $("#formName2[data-toggle='tooltip']");

    if(userName.length === 0 || userName.length > 31){
        if( !(userNameObject.hasClass("bad-input-focus")) ){
            userNameObject.tooltip('show');
            userNameObject.addClass("bad-input-focus");
            //console.log("Tooltip !");
        }
    } else {
        if(userNameObject.hasClass("bad-input-focus")){
            userNameObject.tooltip('hide');
            userNameObject.removeClass("bad-input-focus");
        }
    }
}


function validateEmail() {
    //var userEmail = document.getElementById("email").childNodes[0].nodeValue;
    
    var userEmail = $("#email").val();
    var userEmailObject = $("#email[data-toggle='tooltip']");

    if(userEmail.indexOf("@") === -1 || userEmail.indexOf(".") === -1 || userEmail.length  < 6 || userEmail.length > 31){
        if( !(userEmailObject.hasClass("bad-input-focus")) ){
            userEmailObject.tooltip('show');
            userEmailObject.addClass("bad-input-focus");
            //console.log("Tooltip !");
        }
    } else {
        if(userEmailObject.hasClass("bad-input-focus")){
            userEmailObject.tooltip('hide');
            userEmailObject.removeClass("bad-input-focus");
        }
    }
}

function validatePassword(){
    var userPassword = $("#password").val();
    var userPasswordObject = $("#password[data-toggle='tooltip']");
    
    if(userPassword.length < 6 || userPassword.length > 31){
        if( !(userPasswordObject.hasClass("bad-input-focus")) ){
            userPasswordObject.tooltip('show');
            userPasswordObject.addClass("bad-input-focus");
            //console.log("Tooltip !");
    } else {
        if(userPasswordObject.hasClass("bad-input-focus")){
            userPasswordObject.tooltip('hide');
            userPasswordObject.removeClass("bad-input-focus");
        }
       }
   }

}