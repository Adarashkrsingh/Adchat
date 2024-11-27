import React, { useState } from "react";
import { IoSend } from "react-icons/io5";
import useSendMessage from "../../context/useSendMessage.js";

function Typesend() {
  const [message, setMessage] = useState("");
  const { loading, sendMessages } = useSendMessage();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (message.trim()) {
      await sendMessages(message);
      setMessage("");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex items-center justify-between bg-gradient-to-r from-blue-500 via-indigo-600 to-purple-700 px-4 py-3 rounded-xl shadow-lg">
        <div className="w-[80%]">
          <input
            type="text"
            placeholder="Type a message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="bg-gray-800 text-white border border-gray-600 rounded-lg w-full px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300"
          />
        </div>
        <button
          type="submit"
          disabled={loading || !message}
          className={`p-2 rounded-full ${
            loading || !message
              ? "bg-gray-600 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          } transition duration-300`}
        >
          <IoSend className="text-white text-2xl" />
        </button>
      </div>
    </form>
  );
}

export default Typesend;
