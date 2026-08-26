const grid = document.getElementById("vehicleGrid");
const search = document.getElementById("vehicleSearch");
const count = document.getElementById("vehicleCount");
const emptyState = document.getElementById("emptyState");
const errorState = document.getElementById("errorState");
let vehicles = [];
let selectedCategory = "All";

function text(value, fallback = "Details unavailable") {
	return typeof value === "string" && value.trim() ? value.trim() : fallback;
}

function categoryFor(vehicle) {
	const category = text(vehicle.category, "");
	if (category) return category;
	return vehicle.series === "M Series" ? "M Performance" : vehicle.series === "X Series" ? "SUV" : "Sedan";
}

function safeCard(vehicle) {
	const id = Number(vehicle.id);
	const model = text(vehicle.model, "BMW Vehicle");
	const category = categoryFor(vehicle);
	const variant = text(vehicle.variant, text(vehicle.series, "BMW Collection"));
	const price = typeof vehicle.price === "number" ? formatPrice(vehicle.price) : text(vehicle.price, "Price on request");
	const power = text(vehicle.power, "Power on request");
	const transmission = text(vehicle.transmission, "Automatic");
	const fuel = text(vehicle.fuel, "Petrol");
	const detailsUrl = Number.isInteger(id) && id > 0 ? `/vehicle-details.html?id=${encodeURIComponent(id)}` : "/vehicles.html";
	return `<article class="vehicle-card"><div class="vehicle-visual"><small>${category}</small><strong>M</strong></div><div class="vehicle-card-body"><p class="eyebrow">${text(vehicle.series, category)}</p><h3>${model}</h3><p class="variant">${variant}</p><div class="vehicle-specs"><span>${power}</span><span>${transmission}</span><span>${fuel}</span></div><div class="vehicle-footer"><strong class="vehicle-price">${price}</strong><a class="details-link" href="${detailsUrl}">View Details</a></div></div></article>`;
}

function render() {
	const query = search.value.trim().toLowerCase();
	const filtered = vehicles.filter((vehicle) => {
		const category = categoryFor(vehicle);
		const haystack = [vehicle.model, vehicle.variant, vehicle.series, vehicle.category, category].map((value) => text(value, "").toLowerCase()).join(" ");
		return (selectedCategory === "All" || category === selectedCategory) && (!query || haystack.includes(query));
	});
	count.textContent = `${filtered.length} ${filtered.length === 1 ? "vehicle" : "vehicles"}`;
	grid.innerHTML = filtered.map(safeCard).join("");
	emptyState.hidden = filtered.length !== 0;
}

async function loadVehicles() {
	errorState.hidden = true;
	grid.innerHTML = "<p class='loading'>Loading collection...</p>";
	try {
		const response = await fetch("/api/vehicles");
		if (!response.ok) throw new Error("Vehicle request failed");
		const data = await response.json();
		vehicles = Array.isArray(data.vehicles) ? data.vehicles.filter((vehicle) => vehicle && typeof vehicle === "object") : [];
		render();
	} catch (error) {
		vehicles = [];
		count.textContent = "Unavailable";
		grid.innerHTML = "";
		emptyState.hidden = true;
		errorState.hidden = false;
		console.error(error);
	}
}

document.querySelectorAll(".filter-button").forEach((button) => button.addEventListener("click", () => { selectedCategory = button.dataset.category || "All"; document.querySelectorAll(".filter-button").forEach((item) => item.classList.toggle("active", item === button)); render(); }));
search.addEventListener("input", render);
document.getElementById("resetFilters").addEventListener("click", () => { search.value = ""; selectedCategory = "All"; document.querySelectorAll(".filter-button").forEach((button) => button.classList.toggle("active", button.dataset.category === "All")); render(); });
document.getElementById("retryVehicles").addEventListener("click", loadVehicles);
loadVehicles();