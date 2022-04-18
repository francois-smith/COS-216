document.addEventListener("DOMContentLoaded", ()=>{
    setupTabs();

    document.querySelectorAll(".section-button")[0].click();
});

function setupTabs(){
    document.querySelectorAll(".section-button").forEach(button => {
        button.addEventListener("click", () => {
            document.querySelector("#submit-return-message").innerHTML = "";
            const sideBar = button.parentElement;
            const sectionsContainer = document.getElementById("main-content");
            const sectionValue = button.dataset.forSection;
            const sectionToActivate = sectionsContainer.querySelector(`.section-content[data-section="${sectionValue}"]`);

            getImages(sectionValue);

            sideBar.querySelectorAll(".section-button").forEach(button =>{
                button.classList.remove("active-button");
            });

            button.classList.add("active-button");

            sectionsContainer.querySelectorAll(".section-content").forEach(section =>{
                section.classList.remove("active-section");
            });

            sectionToActivate.classList.add("active-section");
        });
    });
}

document.getElementById("fileButton").addEventListener("click", function(){
    document.getElementById("fileUpload").click();  // trigger the click of actual file upload button
});

document.getElementById("fileUpload").addEventListener("change", function(){
    var fullPath = this.value;
    var fileName = fullPath.split(/(\\|\/)/g).pop(); 
    document.getElementById("fileName").innerHTML = fileName; 
    validateImage();
}, false);

document.getElementsByName("name")[0].addEventListener("blur", validateName);

function validateName(){
    let value = document.getElementsByName("name")[0].value;
    if(value.length == 0){
        document.querySelector("#name-error").classList.add("error-message");
        return false;
    }
    else{
        document.querySelector("#name-error").classList.remove("error-message");
        return true;
    }
}

function validateImage(){
    let image = document.getElementById("fileUpload");
    if(image.value == ""){
        document.querySelector("#file-error").classList.add("error-message");
        return false;
    }
    else{
        document.querySelector("#file-error").classList.remove("error-message");
        return true;
    }
}

document.getElementById("upload-form").addEventListener("submit", function(event){
    event.preventDefault();
    
    let name = validateName();
    let image = validateImage();
    
    if(name && image){
        let data = new FormData(this);
        data.append("date", new Date().toISOString());
        $.ajax({
            url: "upload.php",
            type: "POST",
            data: data,
            contentType: false,
            cache: false,
            processData:false,
            success: function(data){
                returnMessage(data);
            },error: function(e) 
            {
                returnMessage(e);
            }          
        });
        return true;
    }
    else{
        return false;
    }
});

function returnMessage(returnMessage){
    let returnContainer = document.querySelector("#submit-return-message");
    document.getElementById("upload-form").reset();
    document.getElementById("fileName").innerHTML = "";
    returnContainer.innerHTML = returnMessage;
}

function createImage(imageInput){
    let image = document.createElement("div");
    //id, name, src, section, description, size, uploaded

    let imageSrc = document.createElement("img");
    imageSrc.setAttribute("src", '../uploads/'+imageInput.src);
    image.appendChild(imageSrc);
    return image;
}

function getImages(sectionValue){
    if(sectionValue == "upload") return;

    $.get("config.php", {section: sectionValue}, function(data){
        populateImages(sectionValue, JSON.parse(data));
    });
}

function populateImages(sectionValue, images){
    const sectionsContainer = document.getElementById("main-content");
    const sectionToActivate = sectionsContainer.querySelector(`.section-content[data-section="${sectionValue}"]`);
    const imageContainer = sectionToActivate.querySelector(".images-container");
    imageContainer.innerHTML = "";

    for (let image of images.data) {
        let newImage = createImage(image);
        imageContainer.appendChild(newImage);
    }
}
