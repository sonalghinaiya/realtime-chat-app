import React, { useEffect, useRef } from "react";

function MessageList({ messages, username }) {
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  return (
    <div className="flex-1 overflow-y-auto p-4 bg-gray-100">
      {messages.map((msg, index) => (
        <div
          key={index}
          className={`mb-3 ${
            msg.system
              ? "text-center text-sm text-gray-500"
              : `flex ${
                  msg.username === username ? "justify-end" : "justify-start"
                }`
          }`}
        >
          <div
            className={`${
              msg.system
                ? ""
                : `max-w-[70%] px-4 py-2 rounded-xl shadow ${
                    msg.username === username ? "bg-green-300" : "bg-white"
                  }`
            }`}
          >
            {!msg.system && (
              <p className="text-sm font-semibold">
                {msg.username} ({msg.time})
              </p>
            )}

            <p>{msg.message}</p>
          </div>
        </div>
      ))}

      <div ref={bottomRef}></div>
    </div>
  );
}

export default MessageList;
