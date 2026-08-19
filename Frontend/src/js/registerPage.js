// Select HTML elements
const registerForm = document.getElementById("registerForm");
<<<<<<< HEAD

=======
>>>>>>> origin/bsc-inf-41-25
const fullname = document.getElementById("fullname");
const email = document.getElementById("email");
const contact = document.getElementById("contact");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirmPassword");
const terms = document.getElementById("terms");

<<<<<<< HEAD

// When Register button is clicked
registerForm.addEventListener("submit", function(event){

    // Stop page refresh
    event.preventDefault();

    // Read values
=======
// When Register button is clicked
registerForm.addEventListener("submit", function(event) {
    event.preventDefault();

>>>>>>> origin/bsc-inf-41-25
    const fullNameValue = fullname.value.trim();
    const emailValue = email.value.trim();
    const contactValue = contact.value.trim();
    const passwordValue = password.value.trim();
    const confirmPasswordValue = confirmPassword.value.trim();

    // Check empty fields
<<<<<<< HEAD
    if(
        fullNameValue === "" ||
        emailValue === "" ||
        contactValue === "" ||
        passwordValue === "" ||
        confirmPasswordValue === ""
    ){
=======
    if (!fullNameValue || !emailValue || !contactValue || !passwordValue || !confirmPasswordValue) {
>>>>>>> origin/bsc-inf-41-25
        alert("Please fill in all fields.");
        return;
    }

    // Password length
<<<<<<< HEAD
    if(passwordValue.length < 8){
=======
    if (passwordValue.length < 8) {
>>>>>>> origin/bsc-inf-41-25
        alert("Password must be at least 8 characters.");
        return;
    }

    // Password confirmation
<<<<<<< HEAD
    if(passwordValue !== confirmPasswordValue){
=======
    if (passwordValue !== confirmPasswordValue) {
>>>>>>> origin/bsc-inf-41-25
        alert("Passwords do not match.");
        return;
    }

    // Terms
<<<<<<< HEAD
    if(!terms.checked){
=======
    if (!terms.checked) {
>>>>>>> origin/bsc-inf-41-25
        alert("Please accept the terms and conditions.");
        return;
    }

    // Create user object
    const user = {
<<<<<<< HEAD

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

=======
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
>>>>>>> origin/bsc-inf-41-25
});