let toggles;
let globalScope = this;
setupPage();

function setupPage() {
    let head = document.getElementsByTagName('head')[0]; 

    let stylesheet = document.createElement('link');
    stylesheet.rel = 'stylesheet'; 
    stylesheet.type = 'text/css';
    stylesheet.href = '/u21649988/COS216/PA4/CSS/Signup.css'; 

    head.appendChild(stylesheet); 
}

if(document.querySelector(".input-container") != null){
    let email = false;
    let name = false;
    let surname = false;
    let password = false;
    let confirmPass = false;
    

    toggles = document.querySelectorAll(".visibilty-toggle");
    document.getElementById("name").addEventListener("blur", checkName);
    document.getElementById("surname").addEventListener("blur", checkSurname);
    document.getElementById("email").addEventListener("blur", checkEmail);
    document.getElementById("password").addEventListener("blur", checkPassword);
    document.getElementById("confirmPassword").addEventListener("blur", checkConfirm);

    document.getElementById('signup-form').addEventListener('submit', function(event){
        if(globalScope.name && globalScope.surname && globalScope.email && globalScope.password && globalScope.confirmPass){
            return true;
        }
        else{
            event.preventDefault();
            checkConfirm();
            checkPassword();
            checkEmail();
            checkName();
            checkSurname();
            return false;
        }
    });
}

function checkName() {
    let elementValue = document.getElementById("name").value;
    var namePattern = /^[a-zA-Z]{3,}$/;

    if(!namePattern.test(elementValue)){
        document.getElementById("name").classList.add("invalid");
        document.getElementById("name-error").classList.add("display-error");
        globalScope.name = false;
    }
    else{
        document.getElementById("name").classList.remove("invalid");
        document.getElementById("name-error").classList.remove("display-error");
        globalScope.name = true;
    }
}

function checkSurname() {
    let elementValue = document.getElementById("surname").value;
    var surnamePattern = /^[a-zA-Z]{3,}$/;

    if(!surnamePattern.test(elementValue)){
        document.getElementById("surname").classList.add("invalid");
        document.getElementById("surname-error").classList.add("display-error");
        globalScope.surname = false;
    }
    else{
        document.getElementById("surname").classList.remove("invalid");
        document.getElementById("surname-error").classList.remove("display-error");
        globalScope.surname = true;
    }
}

function checkEmail(){
    let elementValue = document.getElementById("email").value;
    var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if(!emailPattern.test(elementValue)){
        document.getElementById("email").classList.add("invalid");
        document.getElementById("email-error").classList.add("display-error");
        globalScope.email = false;
    }
    else{
        document.getElementById("email").classList.remove("invalid");
        document.getElementById("email-error").classList.remove("display-error");
        globalScope.email = true;
    }
}

function checkPassword() {
    let elementValue = document.getElementById("password").value;
    var passwordPattern = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;

    /*=======================Pattern Explanation=======================*/
    /*--------At least one upper case English letter(?=.*?[A-Z])-------*/
    /*----------------At least one digit(?=.*?[0-9])-------------------*/
    /*-------At least one lower case English letter(?=.*?[a-z])--------*/
    /*--------At least one special character(?=.*?[#?!@$%^&*-])--------*/
    
    if(!passwordPattern.test(elementValue)){
        document.getElementById("password").classList.add("invalid");
        document.getElementById("password-error").classList.add("display-error");
        if(document.getElementById("confirmPassword").value.trim().length != 0){
            checkConfirm();
        }
        globalScope.password = false;
    }
    else{
        document.getElementById("password").classList.remove("invalid");
        document.getElementById("password-error").classList.remove("display-error");
        if(document.getElementById("confirmPassword").value.trim().length != 0){
            checkConfirm();
        }
        globalScope.password = true;
    }
}

function checkConfirm(){
    let elementValue = document.getElementById("confirmPassword").value;
    var passwordValue = document.getElementById("password").value;

    if(passwordValue != elementValue){
        document.getElementById("confirmPassword").classList.add("invalid");
        document.getElementById("confirm-error").classList.add("display-error");
        globalScope.confirmPass = false;
    }
    else{
        document.getElementById("confirmPassword").classList.remove("invalid");
        document.getElementById("confirm-error").classList.remove("display-error");
        globalScope.confirmPass = true;
    }
}

function toggleIcon(e){
    let password;
    if(e == toggles[0]){
        password = document.getElementById("password");
    }
    else{
        password = document.getElementById("confirmPassword")
    }
    const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
    password.setAttribute('type', type);

    // Toggle the eye slash icon
    if (e.src.match("/u21649988/COS216/PA4/img/SVG/invisible.svg")) {
        e.src = "/u21649988/COS216/PA4/img/SVG/visible.svg";
    } else {
        e.src = "/u21649988/COS216/PA4/img/SVG/invisible.svg";
    }
}

