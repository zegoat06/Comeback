// Select HTML elements
const registerForm = document.getElementById("registerForm");
const fullname = document.getElementById("fullname");
const email = document.getElementById("email");
const contact = document.getElementById("contact");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirmPassword");
const terms = document.getElementById("terms");

// When Register button is clicked
registerForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const fullNameValue = fullname.value.trim();
    const emailValue = email.value.trim();
    const contactValue = contact.value.trim();
    const passwordValue = password.value.trim();
    const confirmPasswordValue = confirmPassword.value.trim();

    // Check empty fields
    if (!fullNameValue || !emailValue || !contactValue || !passwordValue || !confirmPasswordValue) {
        alert("Please fill in all fields.");
        return;
    }

    // Password length
    if (passwordValue.length < 8) {
        alert("Password must be at least 8 characters.");
        return;
    }

    // Password confirmation
    if (passwordValue !== confirmPasswordValue) {
        alert("Passwords do not match.");
        return;
    }

    // Terms
    if (!terms.checked) {
        alert("Please accept the terms and conditions.");
        return;
    }

    // Create user object
    const user = {
        fullName: fullNameValue,
        email: emailValue,
        phone: contactValue,
        password: passwordValue,
        role: 'customer',
        registeredAt: new Date().toISOString()
    };

    // Get existing users from localStorage
    let users = JSON.parse(localStorage.getItem('users')) || [];

    // Check if email already exists
    if (users.find(u => u.email === emailValue)) {
        alert("An account with this email already exists. Please login.");
        return;
    }

    // Add new user
    users.push(user);

    // Save back to localStorage
    localStorage.setItem('users', JSON.stringify(users));

    alert("Registration Successful! Please login.");

    // Go to login page
    window.location.href = "../../pages/auth/loginPage.html";
});