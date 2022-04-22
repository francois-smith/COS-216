setupPage();

function setupPage() {
    let head = document.getElementsByTagName('head')[0]; 

    let stylesheet = document.createElement('link');
    stylesheet.rel = 'stylesheet'; 
    stylesheet.type = 'text/css';
    stylesheet.href = '/u21649988/COS216/PA4/CSS/Login.css'; 

    head.appendChild(stylesheet); 
}

if(document.querySelector(".input-container") != null){  
    document.getElementById("email").addEventListener("blur", checkEmail);

    document.getElementById('signup-form').addEventListener('submit', function(event){
        event.preventDefault();

        if(checkEmail()){
            let email = document.getElementById("email").value;
            let password = document.getElementById("password").value;

            const request = new XMLHttpRequest();
            request.open("POST", "/u21649988/api.php");
            request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            request.send("type=login&email="+email+"&password="+password);
            request.onload = function(){
                console.log(this.responseText);
            }
        }
        else{
            checkEmail();
            return false;
        }
    });
}

function checkEmail(){
    let elementValue = document.getElementById("email").value;
    var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if(!emailPattern.test(elementValue)){
        document.getElementById("email").classList.add("invalid");
        document.getElementById("email-error").classList.add("display-error");
        return false;
    }
    else{
        document.getElementById("email").classList.remove("invalid");
        document.getElementById("email-error").classList.remove("display-error");
        return true;
    }
}

// function checkPassword() {
//     let elementValue = document.getElementById("password").value;
//     var passwordPattern = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
    
//     if(!passwordPattern.test(elementValue)){
//         document.getElementById("password").classList.add("invalid");
//         document.getElementById("password-error").classList.add("display-error");
//         if(document.getElementById("confirmPassword").value.trim().length != 0){
//             checkConfirm();
//         }
//         globalScope.password = false;
//     }
//     else{
//         document.getElementById("password").classList.remove("invalid");
//         document.getElementById("password-error").classList.remove("display-error");
//         if(document.getElementById("confirmPassword").value.trim().length != 0){
//             checkConfirm();
//         }
//         globalScope.password = true;
//     }
// }

function toggleIcon(e){
    let password = document.getElementById("password");
    const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
    password.setAttribute('type', type);

    if (e.src.match("/u21649988/COS216/PA4/img/SVG/invisible.svg")) {
        e.src = "/u21649988/COS216/PA4/img/SVG/visible.svg";
    } else {
        e.src = "/u21649988/COS216/PA4/img/SVG/invisible.svg";
    }
}

