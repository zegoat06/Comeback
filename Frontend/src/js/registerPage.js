// Select HTML elements
const registerForm = document.getElementById("registerForm");

const fullname = document.getElementById("fullname");
const email = document.getElementById("email");
const contact = document.getElementById("contact");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirmPassword");
const terms = document.getElementById("terms");


// When Register button is clicked
registerForm.addEventListener("submit", function(event){

    // Stop page refresh
    event.preventDefault();

    // Read values
    const fullNameValue = fullname.value.trim();
    const emailValue = email.value.trim();
    const contactValue = contact.value.trim();
    const passwordValue = password.value.trim();
    const confirmPasswordValue = confirmPassword.value.trim();

    // Check empty fields
    if(
        fullNameValue === "" ||
        emailValue === "" ||
        contactValue === "" ||
        passwordValue === "" ||
        confirmPasswordValue === ""
    ){
        alert("Please fill in all fields.");
        return;
    }

    // Password length
    if(passwordValue.length < 8){
        alert("Password must be at least 8 characters.");
        return;
    }

    // Password confirmation
    if(passwordValue !== confirmPasswordValue){
        alert("Passwords do not match.");
        return;
    }

    // Terms
    if(!terms.checked){
        alert("Please accept the terms and conditions.");
        return;
    }

    // Create user object
    const user = {

        fullname: fullNameValue,
        email: emailValue,
        contact: contactValue,
        password: passwordValue

    };

    // Save user
    localStorage.setItem("user", JSON.stringify(user));

    alert("Registration Successful!");

    // Go to login page
    window.location.href = "loginPage.html";

});