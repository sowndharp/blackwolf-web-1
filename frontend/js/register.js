const form = document.getElementById("registerForm");
const message = document.getElementById("message");
const submitButton = form.querySelector("button[type='submit']");

setupPasswordToggle("registerPasswordToggle", "password");

if (isAuthenticated()) window.location.replace("/dashboard.html");

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  if (!form.checkValidity() || submitButton.disabled) return;
  submitButton.disabled = true;
  submitButton.innerHTML = "Creating account...";
  message.textContent = "";
  message.className = "message";

  try {
    const response = await fetch(`${API_BASE_URL}/api/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        password: document.getElementById("password").value
      })
    });

    const data = await response.json();

    if (!response.ok) throw new Error(friendlyAuthError(response.status, data.message || "Registration failed"));

    message.classList.add("success");
    message.textContent = "Account created. Redirecting...";
    setTimeout(() => window.location.href = "/login.html", 800);
  } catch (error) {
    message.textContent = error instanceof TypeError ? "Unable to connect to the server. Please try again." : error.message;
    message.classList.add("error");
    submitButton.disabled = false;
    submitButton.innerHTML = "Create account <span aria-hidden='true'>→</span>";
  }
});
