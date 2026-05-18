import React from "react";
import JoinRoom from "./JoinRoom";
import { useState } from "react";
import { socket } from "../socket/socket";
import MessageInput from "./MessageInput";
import MessageList from "./MessageList";
import { useEffect } from "react";
import { ChevronDown, LogOut, Users } from "lucide-react";

function Chat() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [joined, setJoined] = useState(false);
  const [messages, setMessages] = useState([]);
  const [typingUsers, setTypingUsers] = useState([]);

  // Join Room
  const handleJoinRoom = () => {
    if (!username || !room) return;
    socket.emit("join-room", {
      username,
      room,
    });
    setJoined(true);
  };

  //Leave Room
  const handleLeaveRoom = () => {
    socket.emit("leave-room", {
      username,
      room,
    });
    setJoined(false);
    setMessages([]);
    setTypingUsers([]);
    setRoom("");
    setUsername("");
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

  // Handle Typing
  const handleTyping = () => {
    socket.emit("typing", { room, username });
  };
  const handleStopTyping = () => {
    socket.emit("stop-typing", { room, username });
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

    const handleUserTyping = (username) => {
      setTypingUsers(`${username} is typing...`);
    };

    const handleUserStopTyping = () => {
      setTypingUsers("");
    };

    socket.on("message", handleMessage);
    socket.on("user-joined", handleUserJoined);
    socket.on("user-left", handleUserLeft);
    socket.on("user-typing", handleUserTyping);
    socket.on("user-stop-typing", handleUserStopTyping);

    return () => {
      socket.off("message", handleMessage);
      socket.off("user-joined", handleUserJoined);
      socket.off("user-left", handleUserLeft);
      socket.off("user-typing", handleUserTyping);
      socket.off("user-stop-typing", handleUserStopTyping);
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
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-3 sm:p-4 flex justify-between items-center shadow-lg">
            <div className="flex-1 min-w-0">
              <h3 className="text-lg sm:text-xl font-bold truncate">
                Room: {room}
              </h3>
            </div>

            <button
              onClick={handleLeaveRoom}
              className="bg-red-500 hover:bg-red-600 px-3 py-2 sm:px-4 sm:py-2 rounded-lg transition flex items-center gap-1 sm:gap-2 text-sm sm:text-base ml-2"
            >
              <LogOut size={16} className="sm:w-5 sm:h-5" />
              <span className="hidden sm:inline">Leave</span>
            </button>
          </div>
          <MessageList messages={messages} username={username} />

          {typingUsers.length > 0 && (
            <div className="px-4 pb-2 text-sm text-gray-500 italic">
              {typingUsers}
            </div>
          )}
          <MessageInput
            handleSendMessage={handleSendMessage}
            handleTyping={handleTyping}
            handleStopTyping={handleStopTyping}
          />
        </div>
      )}
    </div>
  );
}

export default Chat;
