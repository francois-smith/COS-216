<?php  
    if(!isset($_SESSION)){
        session_start();
    }
    if(isset($_SESSION["LOGGED_IN"])){
        if($_SESSION["LOGGED_IN"] == false){
            exit("Restricted Access");
        }
    }
    else{
        exit("Restricted Access");
    }
?>

<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <title>M Photography | Dashboard</title>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="stylesheet" href="dashboard.css">
        <script src="https://code.jquery.com/jquery-3.6.0.js" integrity="sha256-H+K7U5CnXl1h5ywQfKtSj8PCmoN9aaq30gDh27Xc0jk=" crossorigin="anonymous"></script>
    </head>
    <body>
        <div id="side-bar">
            <div id="logo-container">
                <img src="media/logo-placeholder.png"/>
            </div>
            <div id="buttons-container">
                <button class="section-button" data-for-section="upload"><img src="media/upload.svg"/>Upload Images</button>
                <button class="section-button" data-for-section="studio"><img src="media/lightbulb.svg" id="light-bulb"/>Studio Images</button>
                <button class="section-button" data-for-section="loc"><img src="media/location.svg"/>On Location Images</button>
            </div>
        </div>
        <div id="main-content">
            <div class="section-content" data-section="upload">
                <div class="section-header">
                    <h2>Upload</h2>
                </div>
                <form id="upload-form" action="upload.php" method="post">
                    <div class="input-title-container">
                        <label for="name">Photo Name</label>
                        <span id="name-error">Please enter a valid name</span>
                    </div>
                    <input type="text" name="name">

                    <div class="input-title-container">
                        <label for="photo-section">Photo Section</label>
                    </div>
                    <select name="photo-section">
                        <optgroup label="On Location">
                            <option value="loc-wedding">Wedding</option>
                            <option value="loc-couple">Couples & Engagement</option>
                            <option value="loc-family">Family</option>
                            <option value="loc-graduation">Graduation</option>
                            <option value="loc-maternity">Maternity</option>
                            <option value="loc-matric">Matric Farewell</option>
                            <option value="loc-mommy">Mommy & Me</option>
                            <option value="loc-portfolio">Portrait Portfolio</option>
                        </optgroup>
                        <optgroup label="Studio">
                            <option value="studio-portfolio">Studio Portfolio</option>
                            <option value="studio-newbord">Studio Newborn</option>
                            <option value="studio-milkcake">Studio Milkbath/Cakesmash</option>
                        </optgroup>
                    </select>

                    <div class="input-title-container">
                        <label for="description">Photo Description(Optional)</label>
                    </div><br/>
                    <textarea name="description"></textarea>

                    <div id="upload-image-container">
                        <button type="button" id="fileButton"><span>Select Image</span></button>
                        <input type="file" name="fileToUpload" id="fileUpload"/>
                        <span id="file-error">Please select an image</span>
                        <span id="fileName"></span>
                    </div>  
                    <input type="submit" value="Upload Image" name="submit"/>
                </form>
                <span id="submit-return-message"></span>
            </div>
            <div class="section-content" data-section="studio">
                <div class="section-header">
                    <h2>Studio Images</h2>
                </div>
                <div id="studio-container">
                    <div class="images-container">
                        
                    </div>
                </div>
            </div>
            <div class="section-content" data-section="loc">
                <div class="section-header">
                    <h2>On Location Images</h2>
                </div>
                <div class="images-container">
                        
                </div>
            </div>
        </div>
        <script src="dashboard.js"></script>
    </body>
</html>