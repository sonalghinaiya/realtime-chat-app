# Vibely — Client

React frontend for the Vibely real-time chat application.

## Tech Stack

- React.js (Vite)
- Tailwind CSS
- Socket.IO Client
- React Router DOM
- react-hot-toast
- Lucide React (icons)

## Features

- User registration and login with client-side form validation
- JWT token stored in localStorage for session persistence
- Protected routes (redirect to login if unauthenticated)
- Public routes (redirect to chat if already logged in)
- Welcome screen with animated loader after login
- Join or create a named chat room
- Real-time messaging with sent/received alignment
- Displays username and timestamp on each message
- System messages for user join/leave events
- Live typing indicator with 1-second debounce on stop-typing
- Auto-scroll to the latest message
- Leave room and return to the room selector

## Project Structure

```
client/
├── src/
│   ├── api/
│   │   └── api.js              # Base API URL from env
│   ├── components/
│   │   ├── Chat.jsx            # Main chat container
│   │   ├── JoinRoom.jsx        # Room entry form
│   │   ├── MessageInput.jsx    # Input bar with typing events
│   │   └── MessageList.jsx     # Message feed with auto-scroll
│   ├── pages/
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   └── Welcome.jsx
│   ├── routes/
│   │   ├── ProtectedRoute.jsx
│   │   └── PublicRoutes.jsx
│   ├── socket/
│   │   └── socket.js           # Socket.IO client instance
│   ├── App.jsx
│   └── main.jsx
```

## Getting Started

```bash
cd client
npm install
```

### Environment Variables

Create a `.env` file in the `client/` directory:

```env
VITE_API_URL=http://localhost:5000
```

For production, set `VITE_API_URL` to your deployed backend URL.

### Run Development Server

```bash
npm run dev
```

The app will be available at `http://localhost:5173`.

### Build for Production

```bash
npm run build
```

## Deployment

Deploy the `dist/` folder to **Vercel**. Set the `VITE_API_URL` environment variable in your Vercel project settings to point to your backend on Render.


## 🧑‍💻 Author
**Sonal Ghinaiya**