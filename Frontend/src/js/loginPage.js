// Select elements
const loginForm = document.getElementById("loginForm");
const email = document.getElementById("email");
const password = document.getElementById("password");
const rememberMe = document.getElementById("rememberMe");

// Load saved email
window.onload = function () {
    const savedEmail = localStorage.getItem("savedEmail");
    if (savedEmail) {
        email.value = savedEmail;
        rememberMe.checked = true;
    }
};

// Handle login
loginForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const userEmail = email.value.trim();
    const userPassword = password.value.trim();

    if (userEmail === "" || userPassword === "") {
        alert("Please fill in all fields.");
        return;
    }

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
});