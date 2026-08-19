<<<<<<< HEAD
// Select the HTML elements
=======
// Select elements
>>>>>>> origin/bsc-inf-41-25
const loginForm = document.getElementById("loginForm");
const email = document.getElementById("email");
const password = document.getElementById("password");
const rememberMe = document.getElementById("rememberMe");

<<<<<<< HEAD
// Check if a saved email exists
window.onload = function () {

    const savedEmail = localStorage.getItem("savedEmail");

=======
// Load saved email
window.onload = function () {
    const savedEmail = localStorage.getItem("savedEmail");
>>>>>>> origin/bsc-inf-41-25
    if (savedEmail) {
        email.value = savedEmail;
        rememberMe.checked = true;
    }
};

<<<<<<< HEAD

// When the form is submitted
loginForm.addEventListener("submit", function (event) {

    // Prevent page refresh
    event.preventDefault();

    // Remove spaces
    const userEmail = email.value.trim();
    const userPassword = password.value.trim();

    // Validation
=======
// Handle login
loginForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const userEmail = email.value.trim();
    const userPassword = password.value.trim();

>>>>>>> origin/bsc-inf-41-25
    if (userEmail === "" || userPassword === "") {
        alert("Please fill in all fields.");
        return;
    }

<<<<<<< HEAD
    /*Example login credentials
    const correctEmail = "admin@gmail.com";
    const correctPassword = "12345"; */

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

=======
    // Get registered users from localStorage
    const users = JSON.parse(localStorage.getItem('users')) || [];

    // Find user with matching email
    const foundUser = users.find(u => u.email === userEmail);

    if (!foundUser) {
        alert("No account found with this email. Please register first.");
        return;
    }

    if (foundUser.password !== userPassword) {
        alert("Incorrect password. Please try again.");
        return;
    }

    // Save email if "Remember Me" is checked
    if (rememberMe.checked) {
        localStorage.setItem("savedEmail", userEmail);
    } else {
        localStorage.removeItem("savedEmail");
    }

    // Save session
    localStorage.setItem('loggedInUser', JSON.stringify(foundUser));

    alert("Login Successful!");

    // Redirect based on role
    if (userEmail === "admin@gmail.com") {
        window.location.href = "../admin/dashboard.html";
    } else {
        window.location.href = "../customer/dashboard.html";
    }
>>>>>>> origin/bsc-inf-41-25
});