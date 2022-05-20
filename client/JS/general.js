const port = ('; '+document.cookie).split(`; port_number=`).pop().split(';')[0];
let reply_message = "";
let is_reply = false;

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

function submitMessage(){
    if(sessionStorage.getItem('logged_in') == null){
        openLogin();
    }
    else{
        if(document.getElementsByName("message")[0].value != ""){
            $.ajax({
                url: "http://localhost:"+port+"/login",
                type: "POST",
                contentType: 'application/json',
                data: JSON.stringify({
                    id: $('#article-id').html(),
                    // is_reply: ,
                    // reply_id: ,
                    // message_contents: document.getElementsByName("message")[0].value,
                    // user_id: ,
                    // time: ,
                    // article_id: 
                }),
                success: function(data){
                    console.log(data);
    
                    // if(data.data.message != "Message was unable to send"){
                    //     //document.querySelector('#login-form').reset();
                    // }
                    // else{
                    //     //else display toastr message
                    //     //displayMessageError();
                    // }
                }
            }) 
        }
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
        let article = articles[15];
        $('#article-id').html(article.id);
        $('#article-link').attr("href", article.link);

        let date = (article.date).split("T")[0];
        let time = (article.date).split("T")[1].split("-")[1];
        if(time == 'undefined'){
            time = "";
        }
        $('#article-date').html("Published " + date + " " + time);
        if(article.title == ""){
            $('#article-title').html("By Unknown Author");
        }
        else{
            $('#article-title').html(article.title);
        }
        $('#article-author').html(article.author);
        $('#article-image').attr("src", article.image)
        $('#article-description').html(article.description);
    });
}

function goToArticle(event){
    let link = event.parentElement.querySelector("#article-link").getAttribute("href");;
    window.open(link, '_blank');
}

function toggleReply(e){
    let message = e.parentElement.parentElement;

    if(is_reply){
        if(message.querySelector(".message_id").innerHTML == reply_message){
            reply_message = "";
            is_reply = false;
            let reply = document.querySelector("#replyto");
            reply.style.visibility = "hidden";
        }
        else{
            reply_message = message.querySelector(".message_id").innerHTML;
            is_reply = true;
            let reply = document.querySelector("#replyto");
            reply.style.visibility = "visible";
            reply.querySelector("span").innerHTML = "Replying to: " + message.querySelector(".user-name").innerHTML;
        }
    }
    else{
        reply_message = message.querySelector(".message_id").innerHTML;
        is_reply = true;
        let reply = document.querySelector("#replyto");
        reply.style.visibility = "visible";
        reply.querySelector("span").innerHTML = "Replying to: " + message.querySelector(".user-name").innerHTML;
    }
}