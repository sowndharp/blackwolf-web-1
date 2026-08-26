const form = document.getElementById("loginForm");
const message = document.getElementById("message");
const submitButton = form.querySelector("button[type='submit']");

setupPasswordToggle("loginPasswordToggle", "password");

if (isAuthenticated()) window.location.replace("/dashboard.html");

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  if (!form.checkValidity() || submitButton.disabled) return;
  submitButton.disabled = true;
  submitButton.innerHTML = "Signing in...";
  message.textContent = "";
  message.className = "message";

  try {
    const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: document.getElementById("email").value,
        password: document.getElementById("password").value
      })
    });

    const data = await response.json();

    if (!response.ok) throw new Error(friendlyAuthError(response.status, data.message || "Login failed"));

    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));
    window.location.href = "/dashboard.html";
  } catch (error) {
    message.textContent = error instanceof TypeError ? "Unable to connect to the server. Please try again." : error.message;
    message.classList.add("error");
    submitButton.disabled = false;
    submitButton.innerHTML = "Sign in <span aria-hidden='true'>→</span>";
  }
});
