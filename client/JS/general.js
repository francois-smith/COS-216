setupDate();

const port = ('; '+document.cookie).split(`; port_number=`).pop().split(';')[0];
console.log(port);

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

function loginPage(){
    var request = new XMLHttpRequest();
    var path = "http://localhost:"+port+"/login";
    request.open("POST", path, true);
    request.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
    var text= '{"member_nm":"' + "dwawadwa" + '","member_type":"' + "dwadwa" + '"}';
    request.send ( text );

}
// function logOut(){

// }