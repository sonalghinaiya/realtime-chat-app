import React from "react";

function JoinRoom({ username, setUsername, room, setRoom, handleJoinRoom }) {
  return (
    <div className="flex flex-col gap-4 bg-white p-6 rounded-xl shadow-md w-full max-w-md">
      <h2 className="text-2xl font-bold text-center">Join Chat Room</h2>

      <input
        type="text"
        placeholder="Enter Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="border p-3 rounded-md outline-none"
      />

      <input
        type="text"
        placeholder="Enter Room"
        value={room}
        onChange={(e) => setRoom(e.target.value)}
        className="border p-3 rounded-md outline-none"
      />

      <button
        onClick={handleJoinRoom}
        className="bg-blue-500 text-white py-3 rounded-md hover:bg-blue-600 transition"
      >
        Join Room
      </button>
    </div>
  );
}

export default JoinRoom;
