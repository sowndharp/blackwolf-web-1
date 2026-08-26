const Database = require("better-sqlite3");
const bcrypt = require("bcryptjs");
const path = require("path");
const fs = require("fs");

const dataDir = path.join(__dirname, "data");
fs.mkdirSync(dataDir, { recursive: true });

const db = new Database(path.join(dataDir, "showroom.db"));
db.pragma("journal_mode = WAL");

db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS vehicles (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    model TEXT NOT NULL,
    series TEXT NOT NULL,
    year INTEGER NOT NULL,
    price INTEGER NOT NULL,
    image TEXT NOT NULL,
    engine TEXT NOT NULL,
    power TEXT NOT NULL,
    transmission TEXT NOT NULL,
    fuel TEXT NOT NULL,
    description TEXT NOT NULL,
    featured INTEGER NOT NULL DEFAULT 0
  );

  CREATE TABLE IF NOT EXISTS enquiries (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    vehicle_id INTEGER,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    message TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'new',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (vehicle_id) REFERENCES vehicles(id)
  );
`);

const vehicleCount = db.prepare("SELECT COUNT(*) AS count FROM vehicles").get().count;
if (vehicleCount === 0) {
  const insertVehicle = db.prepare(`INSERT INTO vehicles (model, series, year, price, image, engine, power, transmission, fuel, description, featured) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`);
  const seedVehicles = [
    ["BMW 3 Series", "3 Series", 2025, 45900, "/assets/images/vehicles/bmw-3-series.jpg", "2.0L Turbo", "255 hp", "8-speed automatic", "Petrol", "A focused sports sedan with everyday refinement and precise handling.", 1],
    ["BMW 5 Series", "5 Series", 2025, 58900, "/assets/images/vehicles/bmw-5-series.jpg", "2.0L Turbo", "255 hp", "8-speed automatic", "Petrol", "Executive comfort meets responsive performance in a beautifully balanced sedan.", 1],
    ["BMW 7 Series", "7 Series", 2025, 96900, "/assets/images/vehicles/bmw-7-series.jpg", "3.0L TwinPower Turbo", "375 hp", "8-speed automatic", "Petrol", "Flagship luxury with intelligent technology and first-class comfort.", 0],
    ["BMW X5", "X Series", 2025, 67200, "/assets/images/vehicles/bmw-x5.jpg", "3.0L TwinPower Turbo", "335 hp", "8-speed automatic", "Petrol", "Confident SUV capability with a driver-focused BMW character.", 1],
    ["BMW X7", "X Series", 2025, 81900, "/assets/images/vehicles/bmw-x7.jpg", "3.0L TwinPower Turbo", "375 hp", "8-speed automatic", "Petrol", "Three-row luxury SUV space with effortless long-distance performance.", 0],
    ["BMW M4", "M Series", 2025, 79900, "/assets/images/vehicles/bmw-m4.jpg", "3.0L Twin-Turbo", "503 hp", "8-speed automatic", "Petrol", "Pure M performance, sculpted design and thrilling rear-wheel-drive balance.", 1]
  ];
  db.transaction(() => seedVehicles.forEach((vehicle) => insertVehicle.run(...vehicle)))();
}

const existing = db.prepare("SELECT id FROM users WHERE email = ?").get("admin@example.com");
if (!existing) {
  const hash = bcrypt.hashSync("Admin@123", 12);
  db.prepare("INSERT INTO users (name, email, password) VALUES (?, ?, ?)")
    .run("Admin User", "admin@example.com", hash);
  console.log("Demo user created: admin@example.com / Admin@123");
}

module.exports = db;
