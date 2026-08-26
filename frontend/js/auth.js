const API_BASE_URL = window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1" ? "http://localhost:5000" : "";

function getToken() {
	return localStorage.getItem("token");
}

function getCurrentUser() {
	const value = localStorage.getItem("user");
	try {
		return value ? JSON.parse(value) : null;
	} catch {
		return null;
	}
}

function isAuthenticated() {
	return Boolean(getToken());
}

function authHeaders() {
	const token = getToken();
	return token ? { Authorization: `Bearer ${token}` } : {};
}

async function authenticatedFetch(path, options = {}) {
	const headers = { ...authHeaders(), ...(options.headers || {}) };
	return fetch(`${API_BASE_URL}${path}`, { ...options, headers });
}

function logout() {
	localStorage.removeItem("token");
	localStorage.removeItem("user");
	window.location.href = "/login.html";
}

function friendlyAuthError(status, fallback) {
	if (!navigator.onLine) return "Unable to connect to the server. Please try again.";
	if (status === 400 || status === 422) return "Please check the information you entered.";
	if (status === 401) return "Email or password is incorrect.";
	if (status === 403) return "You are not allowed to continue.";
	if (status === 409) return "This email is already registered.";
	if (status === 429) return "Too many attempts. Please try again later.";
	if (status >= 500) return "The service is temporarily unavailable. Please try again.";
	return fallback;
}

function setupPasswordToggle(buttonId, inputId) {
	const button = document.getElementById(buttonId);
	const input = document.getElementById(inputId);
	if (!button || !input) return;
	button.addEventListener("click", () => {
		const visible = input.type === "text";
		input.type = visible ? "password" : "text";
		button.setAttribute("aria-pressed", String(!visible));
		button.setAttribute("aria-label", visible ? "Show password" : "Hide password");
		button.textContent = visible ? "Show" : "Hide";
	});
}