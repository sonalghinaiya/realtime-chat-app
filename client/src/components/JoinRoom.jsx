import React from "react";
import { MessageSquare, Loader2 } from "lucide-react";

function JoinRoom({ username, setUsername, room, setRoom, handleJoinRoom }) {
  return (
    <div className="flex flex-col gap-4 sm:gap-6 bg-white p-6 sm:p-8 rounded-xl shadow-2xl w-full max-w-md mx-4">
      <div className="text-center">
        <div className="bg-gradient-to-r from-blue-500 to-indigo-500 w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
          <MessageSquare className="text-white w-8 h-8 sm:w-10 sm:h-10" />
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-1 sm:mb-2">
          Join Chat Room
        </h2>
        <p className="text-xs sm:text-sm text-gray-500">
          Connect with others in real-time
        </p>
      </div>

      <div className="space-y-3 sm:space-y-4">
        <div>
          <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
            Username
          </label>
          <input
            type="text"
            placeholder="Enter your name"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full border-2 border-gray-200 p-3 sm:p-4 rounded-lg outline-none focus:border-blue-500 transition text-sm sm:text-base"
          />
        </div>

        <div>
          <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
            Room Name
          </label>
          <input
            type="text"
            placeholder="Enter room name"
            value={room}
            onChange={(e) => setRoom(e.target.value)}
            className="w-full border-2 border-gray-200 p-3 sm:p-4 rounded-lg outline-none focus:border-blue-500 transition text-sm sm:text-base"
          />
        </div>
      </div>

      <button
        onClick={handleJoinRoom}
        disabled={!username.trim() || !room.trim()}
        className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white py-3 sm:py-4 rounded-lg font-semibold transition disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform active:scale-95 flex items-center justify-center gap-2 text-sm sm:text-base"
      >
        Join Room
      </button>

      <div className="text-center text-xs sm:text-sm text-gray-500 mt-2">
        <p>Enter a room name to create or join an existing room</p>
      </div>
    </div>
  );
}

export default JoinRoom;
