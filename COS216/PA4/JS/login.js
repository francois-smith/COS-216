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
            request.setRequestHeader("Content-type", "application/json");

            date = getDate();
            let requestData = {
                "type":"login",
                "email":email,
                "password":password,
                "return":["*"]
            };
            request.send(JSON.stringify(requestData));
            request.onload = function(){
                json = JSON.parse(this.responseText);
                if(json.status == "success"){
                    var url = '/u21649988/COS216/PA4/index.php';
                    window.location.href = url;
                }
                else{
                    let popup = document.querySelector(".notification-container");
                    console.log(popup);
                    popup.style.transform = "translateY(150px)";

                    setTimeout(function(){
                        popup.style.transform = "translateY(0px)";
                    }, 2500);
                }
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

