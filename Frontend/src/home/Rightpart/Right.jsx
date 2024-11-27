import React, { useEffect } from "react";
import Chatuser from "./Chatuser";
import Messages from "./Messages";
import Typesend from "./Typesend";
import useConversation from "../../zustand/useConversation.js";
import { useAuth } from "../../context/AuthProvider.jsx";
import { CiMenuFries } from "react-icons/ci";

function Right() {
  const { selectedConversation, setSelectedConversation } = useConversation();
  useEffect(() => {
    return setSelectedConversation(null);
  }, [setSelectedConversation]);
  
  return (
    <div className="w-full bg-gradient-to-b from-gray-800 via-gray-900 to-black text-gray-300">
      <div>
        {!selectedConversation ? (
          <NoChatSelected />
        ) : (
          <>
            <Chatuser />
            <div
              className="flex-1 overflow-y-auto p-4"
              style={{ maxHeight: "calc(92vh - 8vh)" }}
            >
              <Messages />
            </div>
            <Typesend />
          </>
        )}
      </div>
    </div>
  );
}

export default Right;

const NoChatSelected = () => {
  const [authUser] = useAuth();
  return (
    <div className="relative flex items-center justify-center h-screen bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-8 rounded-lg shadow-lg">
      <label
        htmlFor="my-drawer-2"
        className="btn btn-ghost drawer-button lg:hidden absolute left-5 top-5"
      >
        <CiMenuFries className="text-white text-2xl" />
      </label>
      <div className="text-center">
        <h1 className="text-2xl font-semibold mb-4">
          Welcome{" "}
          <span className="font-bold text-xl">{authUser.user.fullname}</span>
        </h1>
        <p className="text-lg opacity-90">
          No chat selected, please start a conversation by selecting someone
          from your contacts
        </p>
      </div>
    </div>
  );
};
