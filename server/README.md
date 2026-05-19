# Vibely — Server

Node.js + Express backend with Socket.IO for the Vibely real-time chat application.

## Tech Stack

- Node.js + Express.js
- Socket.IO
- MongoDB + Mongoose
- JWT (jsonwebtoken)
- bcryptjs
- CORS

## Features

- REST API for user registration and login
- Password hashing with bcryptjs
- JWT token generation on login
- MongoDB user persistence with Mongoose
- Socket.IO server with room-based messaging
- Real-time events: message, typing, stop-typing, join, leave, disconnect
- Graceful disconnect — notifies room when a user drops unexpectedly
- CORS configured for local dev and Vercel production frontend

## Project Structure

```
server/
├── config/
│   └── db.js               # MongoDB connection
├── controllers/
│   └── authController.js   # Register & login logic
├── models/
│   └── User.js             # Mongoose user schema
├── routes/
│   └── authRoutes.js       # Auth route definitions
└── index.js                # Express app, Socket.IO, server entry
```

## Socket.IO Events

### Server listens for:

| Event | Payload | Description |
|-------|---------|-------------|
| `join-room` | `{ username, room }` | Joins a named room |
| `user-message` | `{ username, room, message, time }` | Broadcasts message to room |
| `leave-room` | `{ username, room }` | Leaves a room |
| `typing` | `{ room, username }` | Broadcasts typing status |
| `stop-typing` | `{ room, username }` | Clears typing status |
| `disconnect` | — | Auto-notifies room of user leaving |

### Server emits:

| Event | Description |
|-------|-------------|
| `user-joined` | Sent to room when a user joins |
| `user-left` | Sent to room when a user leaves or disconnects |
| `message` | Broadcasts a chat message to all room members |
| `user-typing` | Broadcasts who is typing |
| `user-stop-typing` | Clears typing indicator |

## REST API

### `POST /api/auth/register`

**Body:** `{ name, email, password }`

**Response:** `201` on success, `400` if validation fails or user exists.

### `POST /api/auth/login`

**Body:** `{ email, password }`

**Response:** `200` with JWT token and user data, `401` on invalid credentials.

## Getting Started

```bash
cd server
npm install
```

### Environment Variables

Create a `.env` file in the `server/` directory:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=7d
```

### Run Development Server

```bash
npm run dev
```

Server runs at `http://localhost:5000`.

## Deployment

Deploy to **Render**. Add all `.env` variables in the Render dashboard environment settings. Ensure the CORS `origin` array in `index.js` includes your Vercel frontend URL.


## 🧑‍💻 Author
**Sonal Ghinaiya**