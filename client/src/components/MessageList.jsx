import React, { useEffect, useRef } from "react";
import { MessageCircle } from "lucide-react";

function MessageList({ messages, username }) {
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  return (
    <div className="flex-1 overflow-y-auto p-4 bg-gray-100">
      {/* {messages.length === 0 && (
        <div className="h-full flex flex-col items-center justify-center text-gray-400">
          <MessageCircle size={48} className="sm:w-16 sm:h-16 mb-3 sm:mb-4" />
          <p className="text-base sm:text-lg font-medium">No messages yet</p>
          <p className="text-xs sm:text-sm mt-1 sm:mt-2">
            Start the conversation!
          </p>
        </div>
      )} */}
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
