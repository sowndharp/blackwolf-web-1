document.querySelectorAll(".site-header nav a").forEach((link) => {
	if (link.pathname === window.location.pathname) link.classList.add("active");
});

const token = localStorage.getItem("token");
const headerAction = document.querySelector(".site-header > .btn");
if (token && headerAction) {
	headerAction.href = "/dashboard.html";
	headerAction.textContent = "Dashboard";
	const logoutLink = document.createElement("a");
	logoutLink.className = "nav-logout";
	logoutLink.href = "/login.html";
	logoutLink.textContent = "Sign out";
	logoutLink.addEventListener("click", () => {
		localStorage.removeItem("token");
		localStorage.removeItem("user");
	});
	headerAction.insertAdjacentElement("afterend", logoutLink);
}

document.querySelectorAll(".site-header").forEach((header) => {
	const nav = header.querySelector("nav");
	if (!nav) return;
	const toggle = document.createElement("button");
	toggle.className = "menu-toggle";
	toggle.type = "button";
	toggle.setAttribute("aria-label", "Toggle navigation");
	toggle.setAttribute("aria-expanded", "false");
	toggle.innerHTML = "<span></span><span></span>";
	header.insertBefore(toggle, nav);
	toggle.addEventListener("click", () => {
		const open = header.classList.toggle("menu-open");
		toggle.setAttribute("aria-expanded", String(open));
	});
});