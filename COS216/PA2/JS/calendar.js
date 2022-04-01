let json;
const date = new Date();

function getNews(searchDate){
	const request = new XMLHttpRequest();

    request.open("GET", "http://api.mediastack.com/v1/news?limit=5&access_key=7c2da267305e87eeca21143f460ae7fb&sources=en&date="+searchDate);
	request.onload = () => {
        json = JSON.parse(request.responseText);
    };

	request.send();
}

const renderCalendar = () =>{ 
    const monthDays = document.querySelector(".days-of-month");

    const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    const prevLastDay = new Date(date.getFullYear(), date.getMonth(), 0).getDate();

    const firstDayIndex = date.getDay();
    const lastDayIndex = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDay();

    const nextDays = 7 - lastDayIndex - 1;

    const months = ['January','February','March','April','May','June','July','August','September','October','November','December'];

    document.querySelector(".date h1").innerHTML = months[date.getMonth()];
    document.querySelector(".date p").innerHTML = date.toDateString();

    let days = "";

    for(let x = firstDayIndex; x > 0; x--){
        days += `<div class="prev-date">${prevLastDay - x +1}</div>`
    }
    
    for(let i = 1; i <= lastDay; i++){
        if(i === new Date().getDate() && date.getMonth() === new Date().getMonth() && date.getYear() === new Date().getYear())
        {
            days += `<div class="today" onclick="selectDate(this)">${i}</div>`;
        }
        else{
            days += `<div onclick="selectDate(this)">${i}</div>`;
        }
    }

    for(let j = 1; j <= nextDays; j++){
        days += `<div class="next-date">${j}</div>`;
    }

    monthDays.innerHTML = days;
}

document.querySelector(".prev").addEventListener("click", () => {
    date.setMonth(date.getMonth() - 1);
    renderCalendar();
})

document.querySelector(".next").addEventListener("click", () => {
    date.setMonth(date.getMonth() + 1);
    renderCalendar();
})

renderCalendar();

var article = document.querySelector(".article");
var articleContainer = document.querySelector(".articles-container");

let selectedDate = new Date();
function selectDate(event){
    const container = document.querySelector(".days-of-month");
    const monthDays = container.querySelectorAll("div");
    for(let day of monthDays){
        day.classList.remove("selected");
    }
    event.classList.add("selected");
    let selectedDate = new Date(date.getFullYear(), date.getMonth(), event.innerHTML);

    let year = selectedDate.getFullYear();
    let month = selectedDate.getMonth()+1;
    let day = selectedDate.getDate();
    let searchDate = year+"-"+month+"-"+day;
    getNews(searchDate);

    setTimeout(() => {
        console.log(json);
        articleContainer.innerHTML = "";
        article.style.display = "flex";

        for(let i = 0; i < 5; i++) {
            const clone = article.cloneNode(true);
            clone.querySelector(".article-date").innerHTML = (json.data[i].published_at).split("T")[0];
            clone.querySelector(".article-title").innerHTML = json.data[i].title;
            clone.querySelector(".link").setAttribute("href", json.data[i].url);
            articleContainer.appendChild(clone);
        }
    }, 1000)
}

function goToLink(event){
    var link = event.querySelector(".link").href;
    window.open(link, '_blank').focus();
}
