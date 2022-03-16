loadTodayArticles();
var categories = [];

function loadTodayArticles(){
    const request = new XMLHttpRequest();

    request.open("get", "https://api.nytimes.com/svc/topstories/v2/home.json?api-key=D0YjNaMce336nUyLTHmot0vTCSFEUgdP");
    request.onload = () => {
        // try{
        //     
           
        // }
        // catch(e) {
        //     console.warn("Could not retrieve API");
        // }
        const json = JSON.parse(request.responseText);
        populateTodayArticles(json);
    };

    
    request.send();
}

function populateTodayArticles(json){
    const articles = document.getElementsByClassName("general-article");
    var i = 0;

    for (let article of articles) {
        //set data variable
        var data = json.results[i++];

        //set title of article
        var title = article.querySelector('.card-article-title, .card-article-title-small');
        title.innerHTML = data.title;

        //set author and date
        var author_date = article.querySelector('.card-author-date');
        author_date.innerHTML = data.byline.substr(0, data.byline.indexOf(',')) + " - " + data.published_date.substr(0, data.published_date.indexOf('T')); 

        //set image
        var image = article.querySelector(".card-article-image");
        image.src = data.multimedia[0].url;

        //set tag category with random color
        var tag = article.querySelector(".tag");
        
        tag.innerHTML = data.subsection;
        tag.style.background = tagGenerator();

        if ( !( 'bar' in foo ) ) {
            foo['bar'] = 42;
        }
    }    
}

function tagGenerator(){
    var colors= ["#bbd13d", "#2ECC71", "#A56CBD", "#997C00", "#42C0F5", "#F65050", "#0088FF", "#e7b54a"];

    var i = Math.floor(Math.random()*colors.length);
    return colors[i];
}