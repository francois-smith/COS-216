<?php

?>

<div id="preferences-container">
    <div class="preferences">
        <div id="close-preferences" onclick="closePrefs()">
            <i class="fa-regular fa-x"></i>
        </div>
        <div class="preferences-info">
            <h1>User Information</h1>
            <form id="preferences-form">
                <div class="preferences-form-info">
                    <div class="preference-titles">
                        <span class="preference-title">Name</span>
                        <span class="preference-title">Surname</span>
                        <span class="preference-title">Email</span>
                        <span class="preference-title">Theme</span>
                        <span class="preference-title">Preference</span>
                    </div>

                    <div class="preference-fields">
                        <input class="preference-field" name="preference-title-name" type="text">
                        <input class="preference-field" name="preference-title-surname" type="text">
                        <input class="preference-field" name="preference-title-email" type="text" disabled>
                        <select class="preference-field" name="preference-title-theme">
                            <option value="light">Light</option>
                            <option value="dark">Dark</option>
                        </select>
                        <select class="preference-field" name="preference-title-preference">
                            <option value="none">None</option>
                            <option value="World">World</option>
                            <option value="Business">Business</option>
                            <option value="Health">Health</option>
                            <option value="Sports">Sports</option>
                            <option value="Technology">Technology</option>
                        </select>
                    </div>
                </div>
               
                <input class="preference-button save" type="submit" value="Save">
                <button class="preference-button discard" onclick="resetPreferences()">Discard</button>
            </form>
        </div>
        <div class="preferences-quote-contianer">
            <p><span class="blue-text">Spreading </span><span>Knowledge</span></p>
        </div>
    </div>
</div>

<script>
    resetPreferences();

    function resetPreferences(){
        document.getElementsByName("preference-title-name")[0].value = user_name;
        document.getElementsByName("preference-title-surname")[0].value = user_surname;
        document.getElementsByName("preference-title-email")[0].value = email;
        if(theme == "light"){
            document.getElementsByName("preference-title-theme")[0].selectedIndex = 0;
        }
        else{
            document.getElementsByName("preference-title-theme")[0].selectedIndex = 1;
        }

        switch(preference){
            case "none":
                document.getElementsByName("preference-title-preference")[0].selectedIndex = 0;
                break;
            case "World":
                document.getElementsByName("preference-title-preference")[0].selectedIndex = 1;
                break;
            case "Business":
                document.getElementsByName("preference-title-preference")[0].selectedIndex = 2;
                break;
            case "Health":
                document.getElementsByName("preference-title-preference")[0].selectedIndex = 3;
                break;
            case "Sports":
                document.getElementsByName("preference-title-preference")[0].selectedIndex = 4;
                break;
            case "Technology":
                document.getElementsByName("preference-title-preference")[0].selectedIndex = 5;
            break;
        }
    }
    
    function closePrefs(){
        document.getElementById("preferences-container").style.left = "100vw";
        resetPreferences();
    }

    function openPrefs(){
        document.getElementById("preferences-container").style.left = "0px";
        resetPreferences();
    }

    document.getElementById('preferences-form').addEventListener('submit', function(event){
        event.preventDefault();

        if(logged_in){
            let newTheme = document.getElementsByName("preference-title-theme")[0].value;
            let newPreference = document.getElementsByName("preference-title-preference")[0].value;
            let newName = document.getElementsByName("preference-title-name")[0].value;
            let newSurname = document.getElementsByName("preference-title-surname")[0].value;

            let updatedInfo = {"newName": newName, "newSurname": newSurname, "newTheme": newTheme, "newPreference": newPreference};

            const request = new XMLHttpRequest();
            request.open("POST", "/u21649988/api.php");
            request.setRequestHeader("Content-type", "application/json");

            date = getDate();
            let requestData = {
                "type": "update",
                "key": api_key,
                "updatedInfo": updatedInfo,
                "email": email,
                "return":["*"]
            };
            request.send(JSON.stringify(requestData));
            request.onload = function(){
                let json = JSON.parse(this.responseText);
                if(json.data.message == "Details updated successfully"){
                    location.reload(); 
                }
                else{
                    let popup = document.querySelector(".notification-container");
                        popup.style.transform = "translateY(150px)";
                        popup.innerHTML = "Details could not be updated";
                        setTimeout(function(){
                            popup.style.transform = "translateY(0px)";
                        }, 2500);
                }
            }
        }
    });
</script>