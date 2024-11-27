import React from "react";

function Message({ message }) {
  const authUser = JSON.parse(localStorage.getItem("ChatApp"));
  const itsMe = message.senderId === authUser.user._id;

  const chatName = itsMe ? "chat-end justify-end" : "chat-start justify-start";
  const chatColor = itsMe ? "bg-blue-600" : "bg-gray-600"; // Updated color scheme

  const createdAt = new Date(message.createdAt);
  const formattedTime = createdAt.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="p-2">
      <div className={`chat ${chatName} mb-3`}>
        <div
          className={`chat-bubble ${chatColor} text-white max-w-[80%] p-3 rounded-lg shadow-lg`}
        >
          {message.message}
        </div>
        <div className="text-xs text-gray-400 mt-1">{formattedTime}</div>
      </div>
    </div>
  );
}

export default Message;
