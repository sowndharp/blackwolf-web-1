function formatPrice(value) { return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(value); }

function vehicleCard(vehicle) {
  return `<article class="vehicle-card"><img src="${vehicle.image}" alt="${vehicle.model}" onerror="this.style.display='none'"><div class="vehicle-card-body"><p class="eyebrow">${vehicle.series} / ${vehicle.year}</p><h3>${vehicle.model}</h3><p>${vehicle.description}</p><div class="vehicle-meta"><span class="price">${formatPrice(vehicle.price)}</span><a class="text-link" href="/vehicle-details.html?id=${vehicle.id}">View details</a></div></div></article>`;
}