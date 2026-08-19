// Select the HTML elements
const loginForm = document.getElementById("loginForm");
const email = document.getElementById("email");
const password = document.getElementById("password");
const rememberMe = document.getElementById("rememberMe");

// Check if a saved email exists
window.onload = function () {

    const savedEmail = localStorage.getItem("savedEmail");

    if (savedEmail) {
        email.value = savedEmail;
        rememberMe.checked = true;
    }
};


// When the form is submitted
loginForm.addEventListener("submit", function (event) {

    // Prevent page refresh
    event.preventDefault();

    // Remove spaces
    const userEmail = email.value.trim();
    const userPassword = password.value.trim();

    // Validation
    if (userEmail === "" || userPassword === "") {
        alert("Please fill in all fields.");
        return;
    }

    // Example login credentials
    const correctEmail = "admin@gmail.com";
    const correctPassword = "12345";

    if (userEmail === correctEmail && userPassword === correctPassword) {

        // Save email if checkbox is checked
        if (rememberMe.checked) {
            localStorage.setItem("savedEmail", userEmail);
        } else {
            localStorage.removeItem("savedEmail");
        }

        alert("Login Successful!");

        // Redirect to another page
        window.location.href = "dashboard.html";

    } else {

        alert("Incorrect email or password.");

    }

});