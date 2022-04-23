document.getElementById("email").addEventListener("blur", checkEmail);

$("#login-form").submit(function(e) {
    e.preventDefault();

    if(checkEmail()){
        let email = document.getElementById("email").value;
        let password = document.getElementById("password").value;

        $.ajax({
            url: "http://localhost:"+port+"/login",
            type: "POST",
            contentType: 'application/json',
            data: JSON.stringify({
                'email': email,
                'password': password,
            }),
            error: function (request, status, error) {
                console.log(request.responseText);
            }
        });
    }
    else{
        checkEmail();
        return false;
    }
});

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