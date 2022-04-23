setupNavigation();

const port = ('; '+document.cookie).split(`; port_number=`).pop().split(';')[0];

//checks what theme is active and swaps it for the other option
function toggleTheme(){
    let theme = document.documentElement.className;
    if(theme == "light"){
        document.querySelector("#light-theme").classList.add("display-none-theme");
        document.querySelector("#dark-theme").classList.remove("display-none-theme");
        document.documentElement.className = "dark";
    }
    else{
        document.querySelector("#dark-theme").classList.add("display-none-theme");
        document.querySelector("#light-theme").classList.remove("display-none-theme");
        document.documentElement.className = "light";
    }
}

//passed in by successful user login, if a user logged in successfully thier saved theme will be loaded and applied to chat client
function setTheme(theme){
    if(theme == "light"){
        document.querySelector("#light-theme").classList.add("display-none-theme");
        document.querySelector("#dark-theme").classList.remove("display-none-theme");
        document.documentElement.className = "light";
    }

    if(theme == "dark"){
        document.querySelector("#dark-theme").classList.add("display-none-theme");
        document.querySelector("#light-theme").classList.remove("display-none-theme");
        document.documentElement.className = "dark";
    }
}

//pulls login screen into frame to allow login
function openLogin(){
    let form = document.querySelector(".form-container");
    form.style.transform = "translate(50%,-50%)";
}

//if cross on login sreen is pressed, hide the login screen from view
function closeLogin(){
    let form = document.querySelector(".form-container");
    form.style.transform = "translate(200%, -50%)";
}

function setupNavigation(){
    let navbar = document.querySelector("nav");
    let body = document.querySelector("body");

    navbar.addEventListener("mouseout", function(){
        console.log("yeet");
    });

    navbar.addEventListener("mouseover", function(){
        document.getElementById("myDIV").style.gridTemplateColumns = "50px 50px";
    });
}