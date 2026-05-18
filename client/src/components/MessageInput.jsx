import React, { useRef } from "react";
import { useState } from "react";

function MessageInput({ handleSendMessage, handleTyping, handleStopTyping }) {
  const [message, setMessage] = useState("");
  const typingTimeout = useRef(null);

  const sendMessage = () => {
    if (!message.trim()) return;
    handleSendMessage(message);
    handleStopTyping();
    clearTimeout(typingTimeout.current);
    setMessage("");
  };

  const handleChange = (e) => {
    setMessage(e.target.value);
    handleTyping();

    clearTimeout(typingTimeout.current);

    typingTimeout.current = setTimeout(() => {
      handleStopTyping();
    }, 1000);
  };
  return (
    <div className="flex gap-2 p-4 border-t bg-white">
      <input
        type="text"
        placeholder="Type message..."
        value={message}
        onChange={handleChange}
        onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        className="flex-1 border rounded-md p-3 outline-none"
      />

      <button
        onClick={sendMessage}
        className="bg-blue-500 text-white px-6 rounded-md hover:bg-blue-600 transition"
      >
        Send
      </button>
    </div>
  );
}

export default MessageInput;
