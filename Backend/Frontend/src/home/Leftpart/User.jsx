import React from "react";
import useConversation from "../../zustand/useConversation.js";
import { useSocketContext } from "../../context/SocketContext.jsx";
import profile from "../../../public/user.jpg";

function User({ user }) {
  const { selectedConversation, setSelectedConversation } = useConversation();
  const isSelected = selectedConversation?._id === user._id;
  const { socket, onlineUsers } = useSocketContext();
  const isOnline = onlineUsers.includes(user._id);

  return (
    <div
      className={`${
        isSelected ? "bg-gradient-to-r from-green-400 to-green-600" : "hover:bg-gray-700"
      } rounded-lg transition-all duration-300 ease-in-out shadow-lg mb-2`}
      onClick={() => setSelectedConversation(user)}
    >
      <div className="flex items-center space-x-4 p-4 cursor-pointer">
        {/* Profile Picture and Online Indicator */}
        <div className={`relative ${isOnline ? "border-2 border-green-500" : ""}`}>
          <div className="w-14 h-14 rounded-full overflow-hidden">
            <img src={profile} alt={`${user.fullname} profile`} className="object-cover w-full h-full" />
          </div>
          {isOnline && (
            <div className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-green-500 border-2 border-white"></div>
          )}
        </div>
        {/* User Info */}
        <div>
          <h1 className={`font-semibold text-xl ${isSelected ? "text-white" : "text-gray-200"}`}>
            {user.fullname}
          </h1>
          <p className={`text-sm ${isSelected ? "text-white" : "text-gray-400"}`}>{user.username}</p>
        </div>
      </div>
    </div>
  );
}

export default User;
