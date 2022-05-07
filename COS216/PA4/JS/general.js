setupDate();

window.addEventListener('load', function () {
    setTheme(theme);
})

function setupDate(){
    const date = new Date();
    let days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
    let months = ['January','February','March','April','May','June','July','August','September','October','November','December'];

    let weekDay = days[date.getDay()];
    let day = date.getDate();
    let month = months[date.getMonth()]
    let year = date.getFullYear();

    let dateSpan = document.getElementById("date-time").children[1];      

    dateSpan.innerHTML = weekDay + ", " + day + " " + month + " " + year;
}

function loginPage(){
    var url = '/u21649988/COS216/PA4/php/LoginPage/login.php';
    window.location.href = url;
}

function registerPage(){
    var url = '/u21649988/COS216/PA4/php/SignupPage/signup.php';
    window.location.href = url;
}

function getDate() {
    var d = new Date(),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear();

    if (month.length < 2) {
        month = '0' + month;
    }
    if (day.length < 2) {
        day = '0' + day;
    }

    return [year, month, day].join('-');
}

function logOut(){
    var url = '/u21649988/COS216/PA4/php/logOut/Logout.php';
    window.location.href = url; 
}

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

function setTheme(themeChange){
    if(themeChange == "light"){
        document.querySelector("#light-theme").classList.remove("display-none-theme");
        document.querySelector("#dark-theme").classList.add("display-none-theme");
        document.documentElement.className = "light";
    }

    if(themeChange == "dark"){
        document.querySelector("#dark-theme").classList.remove("display-none-theme");
        document.querySelector("#light-theme").classList.add("display-none-theme");
        document.documentElement.className = "dark";
    }
}

function setStars(ratingObject, avgRating){
    if(avgRating >= 5){
        ratingObject.querySelectorAll("input")[0].checked = true;
        return;
    } 
    if(avgRating >= 4){
        ratingObject.querySelectorAll("input")[1].checked = true;
        return;
    } 
    if(avgRating >= 3){
        ratingObject.querySelectorAll("input")[2].checked = true;
        return;
    } 
    if(avgRating >= 2){
        ratingObject.querySelectorAll("input")[3].checked = true;
        return;
    } 
    if(avgRating >= 1){
        ratingObject.querySelectorAll("input")[4].checked = true;
        return;
    } 
}

function rate(event){
    event.stopPropagation();

    if(typeof event.target.type !== 'undefined'){
        if(logged_in){
            let article = event.target.closest('.article');
            let articleID = article.querySelector(".article_id").innerHTML;
            let rating = event.target.value;

            const request = new XMLHttpRequest();

            request.open("POST", "/u21649988/api.php");
            request.setRequestHeader("Content-type", "application/json");

            date = getDate();
            let requestData = {
                "key": api_key,
                "type":"rate",
                "rating":rating,
                "article_id": articleID,
                "user_id": user_id,
                "return":["*"]
            };
            request.send(JSON.stringify(requestData));
            request.onload = function(){
                json = JSON.parse(this.responseText);

                if(json.status == "success"){                      
                    let popup = document.querySelector(".notification-container");
                    popup.children[0].style.backgroundColor = "rgb(64, 187, 40)";
                    popup.children[0].innerHTML = json.data.message;
                    popup.style.transform = "translateY(150px)";

                    setTimeout(function(){
                        popup.style.transform = "translateY(0px)";
                    }, 2500);
                }else if(json.status == "failed"){
                    let popup = document.querySelector(".notification-container");
                    popup.children[0].style.backgroundColor = "rgb(179, 51, 51)";
                    popup.children[0].innerHTML = json.data.message;
                    popup.style.transform = "translateY(150px)";

                    setTimeout(function(){
                        popup.style.transform = "translateY(0px)";
                    }, 2500);
                }
                
                console.log(json);
                setStars(event.target.parentElement.parentElement, json.data.rating.avgRating);
            }
        }
        else{
            let popup = document.querySelector(".notification-container");
            popup.children[0].style.backgroundColor = "rgb(179, 51, 51)";
            popup.children[0].innerHTML = "Please Login To Rate This Article";
            popup.style.transform = "translateY(150px)";

            setTimeout(function(){
                popup.style.transform = "translateY(0px)";
            }, 2500);   
        }
    }
}