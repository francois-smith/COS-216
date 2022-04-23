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

$.ajax({
    type: "POST",
    'url': 'https://wheatley.cs.up.ac.za/u21649988/api.php',
    dataType: "json",
    data:{
        "type":"login",
        "email":"Test@gmail.com",
        "password": "TestPass1!",
        "return": ["*"]
    },
    username: 'u21649988',
    password: 'Faffa0319',
    error: function(xhr, status, error) {
        alert(xhr.responseText);
    },
    success: function (res) {
        console.log(jQuery.parseJSON(res));
    }
})

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
