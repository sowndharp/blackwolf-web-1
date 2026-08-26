async function loadVehicles() {
	const grid = document.getElementById("vehicleGrid");
	try {
		const response = await fetch("/api/vehicles");
		if (!response.ok) throw new Error("Vehicle request failed");
		const data = await response.json();
		grid.innerHTML = data.vehicles.slice(0, 3).map(vehicleCard).join("");
	} catch (error) {
		grid.innerHTML = "<p class='loading'>Unable to load vehicles.</p>";
		console.error(error);
	}
}

loadVehicles();