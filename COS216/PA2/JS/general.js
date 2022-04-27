setupDate();

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