import React from "react";
import useConversation from "../../zustand/useConversation.js";
import { useSocketContext } from "../../context/SocketContext.jsx";
import { CiMenuFries } from "react-icons/ci";

import profile from "../../../public/user.jpg"; // Getting photo from public folder.

function Chatuser() {
  const { selectedConversation } = useConversation();
  const { onlineUsers } = useSocketContext();

  const getOnlineUsersStatus = (userId) => {
    return onlineUsers.includes(userId) ? "Online" : "Offline";
  };

  return (
    <div className="relative flex items-center h-[10%] justify-between px-6 py-4 bg-gradient-to-r from-teal-600 to-teal-700 rounded-lg shadow-md hover:bg-gradient-to-r hover:from-teal-700 hover:to-teal-800 duration-300">
      <label
        htmlFor="my-drawer-2"
        className="btn btn-ghost drawer-button lg:hidden absolute left-5 text-white"
      >
        <CiMenuFries className="text-xl" />
      </label>
      <div className="flex space-x-4 items-center justify-center text-white">
        <div className={`avatar ${onlineUsers.includes(selectedConversation._id) ? "online" : "offline"}`}>
          <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-white">
            <img src={profile} alt="Profile" className="object-cover w-full h-full" />
          </div>
        </div>
        <div>
          <h1 className="text-2xl font-semibold">{selectedConversation.fullname}</h1>
          <span className="text-sm font-medium text-gray-200">{getOnlineUsersStatus(selectedConversation._id)}</span>
        </div>
      </div>
    </div>
  );
}

export default Chatuser;
