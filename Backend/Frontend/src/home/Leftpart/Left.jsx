import React from "react";
import Search from "./Search";
import Users from "./Users";
import Logout from "./Logout";

function Left() {
  return (
    <div className="w-full h-full bg-gradient-to-b from-gray-900 to-black text-gray-300 shadow-lg rounded-lg">
      {/* Search Section */}
      <div className="p-4 border-b border-gray-700">
        <Search />
      </div>

      {/* Users Section */}
      <div
        className="flex-1 overflow-y-auto p-4"
        style={{ minHeight: "calc(84vh - 10vh)" }}
      >
        <h2 className="text-lg font-semibold text-white mb-3">Active Users</h2>
        <Users />
      </div>

      {/* Logout Section */}
      <div className="p-4 border-t border-gray-700 bg-gray-800">
        <Logout />
      </div>
    </div>
  );
}

export default Left;
