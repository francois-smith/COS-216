<?php

?>

<div id="preferences-container">
    <div class="preferences">
        <div id="close-preferences">
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
                        <input class="preference-field" name="preference-title-email" type="text">
                        <input class="preference-field" name="preference-title-theme" type="text">
                        <input class="preference-field" name="preference-title-preference" type="text">
                    </div>
                </div>

                <h2>Update Password</h2>
                <div class="preferences-form-info">
                    <div class="preference-titles">
                        <span class="preference-title">New Password</span>
                        <span class="preference-title">Confirm Password</span>
                    </div>

                    <div class="preference-fields">
                        <input class="preference-field" name="preference-title-password" type="password">
                        <input class="preference-field" name="preference-title-newPass" type="password">
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
        document.getElementsByName("preference-title-theme")[0].value = theme;
        document.getElementsByName("preference-title-preference")[0].value = preference;
    }
   
</script>