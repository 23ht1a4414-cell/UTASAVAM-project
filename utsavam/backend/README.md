# Utsavam Backend

Node.js + Express + MongoDB API for **Utsavam — Telugu Village Celebrations**.
Handles events/celebrations listing and bookings, with simple JWT authentication.

## Stack

- Express 4
- MongoDB + Mongoose 8
- JWT auth (jsonwebtoken + bcryptjs)
- CORS-enabled for the Vite frontend

## Setup

```bash
cd utsavam-backend
npm install
cp .env.example .env   # then edit MONGO_URI / JWT_SECRET as needed
npm run dev            # starts on http://localhost:5000 (requires nodemon, included in devDependencies)
```

Make sure MongoDB is running locally, or set `MONGO_URI` in `.env` to a MongoDB Atlas connection string.

### Optional: seed sample data

```bash
node utils/seed.js
```

Creates an admin user (`admin@utsavam.com` / `admin123`) and 3 sample events.

## Project structure

```
utsavam-backend/
├── config/db.js              MongoDB connection
├── models/                   User, Event, Booking (Mongoose schemas)
├── controllers/               Route handler logic
├── routes/                    Express routers
├── middleware/                 Auth (JWT) + centralized error handling
├── utils/                      Token generation, seed script
└── server.js                  App entry point
```

## API Reference

Base URL: `http://localhost:5000/api`

### Auth

| Method | Endpoint         | Access  | Description              |
|--------|------------------|---------|---------------------------|
| POST   | `/auth/register` | Public  | Create an account         |
| POST   | `/auth/login`    | Public  | Log in, returns JWT       |
| GET    | `/auth/me`       | Private | Get current user profile  |

Send the JWT as `Authorization: Bearer <token>` on private routes.

### Events

| Method | Endpoint      | Access        | Description                              |
|--------|---------------|---------------|-------------------------------------------|
| GET    | `/events`     | Public        | List events. Query: `search, category, village, from, to, page, limit` |
| GET    | `/events/:id` | Public        | Get one event                             |
| POST   | `/events`     | Admin         | Create an event                           |
| PUT    | `/events/:id` | Admin         | Update an event                           |
| DELETE | `/events/:id` | Admin         | Delete an event                           |

Event fields: `title, description, category, village, district, state, date, endDate, time, imageUrl, price, capacity, organizer, contactPhone, isActive`. `availableSlots` is computed automatically (`capacity - bookedSlots`).

### Bookings

| Method | Endpoint             | Access  | Description                                  |
|--------|----------------------|---------|-----------------------------------------------|
| POST   | `/bookings`          | Private | Book slots for an event                       |
| GET    | `/bookings/me`       | Private | List the logged-in user's bookings            |
| GET    | `/bookings/:id`      | Private | Get one booking (owner or admin)               |
| PUT    | `/bookings/:id/cancel` | Private | Cancel a booking (releases the reserved slots) |
| GET    | `/bookings`          | Admin   | List all bookings. Query: `eventId, status`    |

`POST /bookings` body:
```json
{
  "eventId": "...",
  "guestName": "Ravi Kumar",
  "guestEmail": "ravi@example.com",
  "guestPhone": "9876543210",
  "numberOfGuests": 2,
  "notes": "optional"
}
```

Booking slots are reserved atomically, so two people can't overbook the same event's remaining capacity.

## Connecting the frontend

In your Vite frontend, set the API base URL (e.g. via an `.env` file: `VITE_API_URL=http://localhost:5000/api`) and call it with `axios`, which is already in your frontend's `package.json`.

Make sure `CLIENT_ORIGIN` in the backend `.env` matches your frontend's dev URL (defaults to `http://localhost:5173`, Vite's default).
