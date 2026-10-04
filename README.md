# Inventory Manager (Spring Boot + MySQL + React/Redux)

Full-stack food-service inventory app.

- **backend/** Java 17, Spring Boot 3, Spring Data JPA, Bean Validation, MySQL
- **frontend/** React 18, Redux Toolkit, Vite

## Prerequisites
- JDK 17+, Maven
- MySQL 8 running on localhost:3306
- Node.js 18+

## 1. Run the backend
The database `inventorydb` is created automatically. Set your MySQL credentials
(defaults are `root` / `root`):

    cd backend
    # Windows PowerShell:  $env:DB_PASSWORD="your_password"
    # Linux / macOS:       export DB_PASSWORD=your_password
    mvn spring-boot:run

API runs on http://localhost:8080 and seeds 5 sample products on first start.

## 2. Run the frontend

    cd frontend
    npm install
    npm run dev

Open http://localhost:5173. Vite proxies `/api` to the backend, so no CORS setup is needed.

## API
| Method | URL | Description |
|--------|-----|-------------|
| GET | /api/products | List all (optional `?category=Oils`) |
| GET | /api/products/{id} | Get one |
| GET | /api/products/low-stock?threshold=10 | Items below a stock level |
| POST | /api/products | Create |
| PUT | /api/products/{id} | Update |
| DELETE | /api/products/{id} | Delete |

## Tests (no MySQL needed, uses H2)

    cd backend && mvn test

## Where Redux is used
`frontend/src/store/productsSlice.js`: async thunks (fetch/save/remove), filters and edit state in one slice.
