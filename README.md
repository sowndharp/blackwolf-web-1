# Blackwolf BMW Showroom

Full-stack BMW showroom website with:

- HTML/CSS/JavaScript frontend
- Node.js + Express backend
- SQLite database
- bcrypt password hashing
- JWT authentication
- Vehicle collection and details pages
- Enquiry submission API
- Login, register and protected dashboard

## Run

From the project root:

```bash
npm install
cd backend
npm install
cd ..
cp backend/.env.example backend/.env
npm run build
npm start
```

Open:

<http://localhost:5000>

Demo:

Email: <admin@example.com>
Password: Admin@123

API endpoints:

- `GET /api/health`
- `GET /api/vehicles`
- `GET /api/vehicles/:id`
- `POST /api/enquiries`
- `GET /api/enquiries/mine` (authenticated)
