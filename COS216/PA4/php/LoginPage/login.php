<?php require_once("../General/header.php"); ?>
<main>
    <div class="form-container">
        <div class="input-container">
            <h2>Welcome Back</h2>
            <form id="signup-form">
                <div class="input-title-container">
                    <label for="email">Email</label><br>
                    <span class="error-message" id="email-error">Please enter a valid email address</span>
                </div><br/>
                <input type="email" id="email" name="email" required><br>
                
                <div class="input-title-container">
                    <label for="email">Password</label><br>
                    <span class="error-message" id="password-error">Please enter a valid password</span>
                </div><br/>
                <input type="password" id="password" name="password" required><img onclick="toggleIcon(this)" class="visibilty-toggle" src="/u21649988/COS216/PA4/img/SVG/invisible.svg" alt="none"><br>

                <input type="submit" value="Log In">
            </form>
            <p>New User? <span onclick="registerPage()" id="register-link">Register</span></p>
            <img id="logo-background" src="/u21649988/IMG/logo.svg" alt="logo">
        </div>
        <div class="quote-contianer">
            <p><span class="blue-text">Spreading </span><span>Knowledge</span></p>
        </div>
    </div>
</main>

<div class="notification-container">
    <div class="notification">
        Invalid Login Credentials
    </div>
</div>
<script src="/u21649988/COS216/PA4/JS/login.js"></script>

<?php require_once("../General/footer.php"); ?>