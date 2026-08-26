const token = localStorage.getItem("token");

if (!token) {
  window.location.href = "/login.html";
}

async function loadDashboard() {
  try {
    const meResponse = await fetch("/api/auth/me", {
      headers: { Authorization: `Bearer ${token}` }
    });

    if (!meResponse.ok) throw new Error("Session expired");

    const me = await meResponse.json();
    const user = me.user;

    document.getElementById("userName").textContent = user.name;
    document.getElementById("userEmail").textContent = user.email;
    document.getElementById("welcomeName").textContent = user.name;
    document.getElementById("avatar").textContent = user.name.charAt(0).toUpperCase();

    const dashResponse = await fetch("/api/dashboard", {
      headers: { Authorization: `Bearer ${token}` }
    });

    const dash = await dashResponse.json();
    document.getElementById("userCount").textContent = dash.stats.users;
    document.getElementById("apiStatus").textContent = "● Connected";
  } catch (error) {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/login.html";
  }
}

document.getElementById("logoutBtn").addEventListener("click", () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  window.location.href = "/login.html";
});

loadDashboard();
