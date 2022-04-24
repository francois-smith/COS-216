const port = ('; '+document.cookie).split(`; port_number=`).pop().split(';')[0];

setupNavigation();
setupArticles();

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
        document.querySelector("#light-theme").classList.remove("display-none-theme");
        document.querySelector("#dark-theme").classList.add("display-none-theme");
        document.documentElement.className = "light";
    }

    if(theme == "dark"){
        document.querySelector("#dark-theme").classList.remove("display-none-theme");
        document.querySelector("#light-theme").classList.add("display-none-theme");
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

    navbar.addEventListener("mouseleave", function(){
        navbar.style.width = "75px";
        let userButton = document.querySelector('#user-account');
        if(!userButton.classList.contains('hidden')) {
            userButton.classList.add('hidden');
            userButton.classList.remove('flex');
        }
    });

    navbar.addEventListener("mouseenter", function(){
        navbar.style.width = "220px";
    });
}

let userButtonActive = false;
function showUserAccount(){
    let userButton = document.querySelector('#user-account');
    if(userButton.classList.contains('hidden')) {
        userButton.classList.remove('hidden');
        userButton.classList.add('flex');
    }
    else {
        userButton.classList.add('hidden');
        userButton.classList.remove('flex');
    }
}

function setupArticles(){
    let articles;
    $.ajax({
        url: "http://localhost:"+port+"/get_articles",
        type: "POST",
        success: function(data){
            articles = data.data;
        }
    }).done(function(){
        let article = articles[articles.length-3];
        console.log(article);
        $('#article-id').html = article.id;
    });
}

/*
    <span id="article-id" style="display: none;"></span>
    <a></a>
    <span id="article-date"></span>
    <h2 id="article-title"></h2>
    <span id="article-author"></span>
    <img onclick="goToArticle()">
    <p id="article-description"></p>
*/

function goToArticle(){

}