import React from "react";
import JoinRoom from "./JoinRoom";
import { useState } from "react";
import { socket } from "../socket/socket";

function Chat() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [joined, setJoined] = useState(false);

  const handleJoinRoom = () => {
    if (!username || !room) return;
    socket.emit("join-room", {
      username,
      room,
    });
    setJoined(true);
  };
  return (
    <div className="h-screen bg-gray-100 flex justify-center items-center p-4">
      {!joined ? (
        <JoinRoom
          username={username}
          setUsername={setUsername}
          room={room}
          setRoom={setRoom}
          handleJoinRoom={handleJoinRoom}
        />
      ) : (
        <h1>You Joinedddddd</h1>
      )}
    </div>
  );
}

export default Chat;
