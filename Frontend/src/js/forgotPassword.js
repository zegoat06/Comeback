const resetForm = document.getElementById("resetForm");

const email = document.getElementById("email");
const newPassword = document.getElementById("newPassword");
const confirmPassword = document.getElementById("confirmPassword");

resetForm.addEventListener("submit", function(event){

    event.preventDefault();

    const emailValue = email.value.trim();
    const passwordValue = newPassword.value.trim();
    const confirmValue = confirmPassword.value.trim();

    // Get registered user
    const savedUser = JSON.parse(localStorage.getItem("user"));

    if(savedUser === null){
        alert("No registered user found.");
        return;
    }

    // Check email
    if(emailValue !== savedUser.email){
        alert("Email not found.");
        return;
    }

    // Password length
    if(passwordValue.length < 8){
        alert("Password must be at least 8 characters.");
        return;
    }

    // Confirm password
    if(passwordValue !== confirmValue){
        alert("Passwords do not match.");
        return;
    }

    // Update password
    savedUser.password = passwordValue;

    localStorage.setItem("user", JSON.stringify(savedUser));

    alert("Password changed successfully!");

    window.location.href = "loginPage.html";

});