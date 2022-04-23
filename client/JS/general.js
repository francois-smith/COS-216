const port = ('; '+document.cookie).split(`; port_number=`).pop().split(';')[0];
console.log(port);

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
