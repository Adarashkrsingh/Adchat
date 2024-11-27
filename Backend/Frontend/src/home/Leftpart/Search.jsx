import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import useGetAllUsers from "../../context/useGetAllUsers";
import useConversation from "../../zustand/useConversation";
import toast from "react-hot-toast";

function Search() {
  const [search, setSearch] = useState("");
  const [allUsers] = useGetAllUsers();
  const { setSelectedConversation } = useConversation();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!search) return;
    const conversation = allUsers.find((user) =>
      user.fullname?.toLowerCase().includes(search.toLowerCase())
    );
    if (conversation) {
      setSelectedConversation(conversation);
      setSearch("");
    } else {
      toast.error("User not found");
    }
  };

  return (
    <div className="h-[10vh] flex items-center justify-center">
      <div className="w-full px-6 py-4">
        <form onSubmit={handleSubmit}>
          <div className="flex items-center space-x-4">
            <div className="relative w-full max-w-xl">
              <input
                type="text"
                className="w-full p-3 pl-10 text-lg bg-gray-800 text-white rounded-full border border-gray-600 focus:ring-2 focus:ring-green-400 transition-all duration-300"
                placeholder="Search for a user..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
            <button
              type="submit"
              className="p-3 bg-green-500 text-white rounded-full hover:bg-green-600 focus:ring-2 focus:ring-green-300 transition-all duration-300"
            >
              <FaSearch className="text-xl" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Search;
