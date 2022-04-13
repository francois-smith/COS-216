<?php require_once("../General/header.php"); ?>

<main>
    <div class="form-container">
        <div class="input-container">
            <h2>Let's get you started</h2>
            <form id="signup-form" action="/COS216/PA3/php/SignupPage/validate-signup.php" method="post">
                <div class="input-title-container">
                    <label for="name">First Name*</label><br>
                    <span class="error-message" id="name-error">Please enter a valid name</span>
                </div><br/>
                <input type="text" id="name" name="name" required><br>

                <div class="input-title-container">
                    <label for="surname">Surname*</label><br>
                    <span class="error-message" id="surname-error">Please enter a valid name</span>
                </div><br/>
                <input type="text" id="surname" name="surname" required><br>

                <div class="input-title-container">
                    <label for="email">Email*</label><br>
                    <span class="error-message" id="email-error">Please enter a valid email address</span>
                </div><br/>
                <input type="email" id="email" name="email" required><br>
                

                <div class="input-title-container">
                    <label for="email">Create Password*</label><br>
                    <span class="error-message" id="password-error">Please enter a valid password</span>
                </div><br/>
                <input type="password" id="password" name="password" required><img onclick="toggleIcon(this)" class="visibilty-toggle" src="/u21649988/COS216/PA3/img/SVG/invisible.svg" alt="none"><br>

                <div id="password-tips">
                    <ul>
                        <li>Minimum of 8 characters</li>
                        <li>Contain one symbol e.g. @,!</li>
                        <li>Contain at least one capital letter</li>
                        <li>Contain at least one numeric character</;>
                    </ul>
                </div>

                <div class="input-title-container">
                    <label for="confirmPassword">Confirm Password*</label><br>
                    <span class="error-message" id="confirm-error" required>Passwords do not match</span>
                </div><br/>
                <input type="password" id="confirmPassword" name="confirmPassword"><img onclick="toggleIcon(this)" class="visibilty-toggle" src="/u21649988/COS216/PA3/img/SVG/invisible.svg" alt="none"><br>

                <input type="submit" value="Sign Up">
            </form>
            <p>Already a user? <span onclick="loginPage()" id="login-link">Login</span></p>
            <img id="logo-background" src="/u21649988/IMG/logo.svg" alt="logo">
        </div>
        <div class="quote-contianer">
            <p><span class="blue-text">Spreading </span><span>Knowledge</span></p>
        </div>
    </div>
</main>
<script src="/u21649988/COS216/PA3/JS/signup.js"></script>

<?php require_once("../General/footer.php"); ?>