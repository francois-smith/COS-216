//simple check to see if a email is present in email field
//password does not have a check because API will check if email exists and if it has the inputted password
document.getElementById("email").addEventListener("blur", checkEmail);

//prevent form from submitting with default POST
$("#login-form").submit(function(e) {
    e.preventDefault();

    //if a valid email is inputted continue
    if(checkEmail()){
        //get password and email from input fields
        let email = document.getElementById("email").value;
        let password = document.getElementById("password").value;

        //run POST request to NodeJS server
        $.ajax({
            url: "http://localhost:"+port+"/login",
            type: "POST",
            contentType: 'application/json',
            data: JSON.stringify({
                'email': email,
                'password': password,
            }),
            success: function(data){
                //check if user was found
                if(data.data.message != "Invalid Login Credentials"){
                    //if user with credentials was found set session storage
                    loginUser(data);
                }
                else{
                    //else display toastr message
                    failMessage(data.data.message);
                }
            }
        })
    }
    else{
        //otherwise email will display error message
        checkEmail();
        return false;
    }
});

//if user is not found in database with inputted credentials
function failMessage(error){
    toastr.options = {
        "closeButton": true,
        "debug": false,
        "newestOnTop": false,
        "progressBar": true,
        "positionClass": "toast-top-center",
        "preventDuplicates": true,
        "onclick": null,
        "showDuration": "300",
        "hideDuration": "1000",
        "timeOut": "4000",
        "extendedTimeOut": "1000",
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "fadeIn",
        "hideMethod": "fadeOut"
    }

    //add toastr error to screen
    toastr["error"]("Invalid Login Credentials", "Error");
}

//function will only call if input field corrispond to a user in the database
//save user to localstorage for session
function loginUser(user){
    sessionStorage.setItem('logged_in', true);
    sessionStorage.setItem('name', user.data.message.name);
    sessionStorage.setItem('surname', user.data.message.surname);
    sessionStorage.setItem('api_key', user.data.message.api_key);
    sessionStorage.setItem('email', user.data.message.email);
    sessionStorage.setItem('id', user.data.message.id);
    
    //apply user's saved theme from database
    setTheme(user.data.message.theme);

    //remove login screen from view
    closeLogin();
}

//clear storage and remove reference to user
function logOut(){
    sessionStorage.clear();
}

//simple regex for email validation, checks basic so request isnt bad by default
function checkEmail(){
    let elementValue = document.getElementById("email").value;
    var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if(!emailPattern.test(elementValue)){
        document.getElementById("email").classList.add("invalid");
        document.getElementById("email-error").classList.add("display-error");
        return false;
    }
    else{
        document.getElementById("email").classList.remove("invalid");
        document.getElementById("email-error").classList.remove("display-error");
        return true;
    }
}

//toggle view password input to hide or show password
function toggleIcon(e){
    let password = document.getElementById("password");
    const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
    password.setAttribute('type', type);

    if (e.src.match("IMG/invisible.svg")) {
        e.src = "IMG/visible.svg";
    } else {
        e.src = "IMG/invisible.svg";
    }
}