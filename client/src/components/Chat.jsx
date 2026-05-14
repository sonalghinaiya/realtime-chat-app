import React from "react";
import JoinRoom from "./JoinRoom";
import { useState } from "react";
import { socket } from "../socket/socket";
import MessageInput from "./MessageInput";
import MessageList from "./MessageList";
import { useEffect } from "react";

function Chat() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [joined, setJoined] = useState(false);
  const [messages, setMessages] = useState([]);

  // Join Room
  const handleJoinRoom = () => {
    if (!username || !room) return;
    socket.emit("join-room", {
      username,
      room,
    });
    setJoined(true);
  };

  // Send Message
  const handleSendMessage = (message) => {
    const time = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    socket.emit("user-message", {
      username,
      room,
      message,
      time,
    });
  };

  useEffect(() => {
    const handleMessage = (data) => {
      setMessages((prev) => [...prev, data]);
    };

    const handleUserJoined = (msg) => {
      setMessages((prev) => [
        ...prev,
        {
          system: true,
          message: msg,
        },
      ]);
    };
    const handleUserLeft = (msg) => {
      setMessages((prev) => [
        ...prev,
        {
          system: true,
          message: msg,
        },
      ]);
    };
    socket.on("message", handleMessage);
    socket.on("user-joined", handleUserJoined);
    socket.on("user-left", handleUserLeft);

    return () => {
      socket.off("message", handleMessage);
      socket.off("user-joined", handleUserJoined);
      socket.off("user-left", handleUserLeft);
    };
  }, []);
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
        <div className="w-full max-w-2xl h-[90vh] bg-white rounded-xl shadow-lg flex flex-col overflow-hidden">
          <div className="bg-blue-500 text-white p-4 text-xl font-bold">
            Room: {room}
          </div>
          <MessageList messages={messages} username={username} />

          <MessageInput handleSendMessage={handleSendMessage} />
        </div>
      )}
    </div>
  );
}

export default Chat;
