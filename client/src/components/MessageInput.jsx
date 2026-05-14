import React from "react";
import { useState } from "react";

function MessageInput() {
  const [message, setMessage] = useState("");

  const sendMessage = () => {
    if (!message.trim()) return;
    handleSendMessage(message);
    setMessage("");
  };
  return (
    <div className="flex gap-2 p-4 border-t bg-white">
      <input
        type="text"
        placeholder="Type message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
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
