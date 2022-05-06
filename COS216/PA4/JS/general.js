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

function openSettings(){

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