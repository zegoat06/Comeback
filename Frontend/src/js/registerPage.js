// Select HTML elements
const registerForm = document.getElementById("registerForm");
const fullname = document.getElementById("fullname");
const email = document.getElementById("email");
const contact = document.getElementById("contact");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirmPassword");
const terms = document.getElementById("terms");

// When Register button is clicked
registerForm.addEventListener("submit", async function (event) {
  event.preventDefault();

  const fullNameValue = fullname.value.trim();
  const emailValue = email.value.trim();
  const contactValue = contact.value.trim();
  const passwordValue = password.value.trim();
  const confirmPasswordValue = confirmPassword.value.trim();

  // Validation
  if (!fullNameValue || !emailValue || !contactValue || !passwordValue || !confirmPasswordValue) {
    alert("Please fill in all fields.");
    return;
  }

  if (passwordValue.length < 8) {
    alert("Password must be at least 8 characters.");
    return;
  }

  if (passwordValue !== confirmPasswordValue) {
    alert("Passwords do not match.");
    return;
  }

  if (!terms.checked) {
    alert("Please accept the terms and conditions.");
    return;
  }

  try {
    // Send to backend with CORRECT field names
    await api.register({
      fullName: fullNameValue,
      email: emailValue,
      phoneNumber: contactValue,
      password: passwordValue,
    });

    alert("Registration Successful! Please login.");
    window.location.href = "loginPage.html";

  } catch (error) {
    console.error("Register error:", error);
    alert("Registration failed: " + error.message);
  }
});