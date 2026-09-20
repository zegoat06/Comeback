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
loginForm.addEventListener("submit", async function (event) {
  event.preventDefault();

  const userEmail = email.value.trim();
  const userPassword = password.value.trim();

  // Validation
  if (userEmail === "" || userPassword === "") {
    alert("Please fill in all fields.");
    return;
  }

  try {
    // Call backend API
    const response = await api.login({
      email: userEmail,
      password: userPassword,
    });

    // Save email if "Save" is checked
    if (rememberMe.checked) {
      localStorage.setItem("savedEmail", userEmail);
    } else {
      localStorage.removeItem("savedEmail");
    }

    // Save user info to sessionStorage
    sessionStorage.setItem("token", response.token);
    sessionStorage.setItem("user", JSON.stringify(response.user));
    sessionStorage.setItem("role", response.user.role || "customer");

    alert("Login Successful!");

    // Redirect based on role
    if (response.user.role === "admin") {
      window.location.href = "../admin/dashboard.html";
    } else {
      window.location.href = "../customer/dashboard.html";
    }

  } catch (error) {
    console.error("Login error:", error);
    alert("Login failed: " + error.message);
  }
});