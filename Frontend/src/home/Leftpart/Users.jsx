import React from "react";
import User from "./User";
import useGetAllUsers from "../../context/useGetAllUsers";

function Users() {
  const [allUsers, loading] = useGetAllUsers();
  
  return (
    <div className="bg-gradient-to-r from-indigo-900 to-indigo-700 min-h-screen p-4">
      <h1 className="text-2xl font-semibold text-white bg-gradient-to-r from-blue-500 to-blue-700 p-3 rounded-md shadow-lg mb-4">
        Messages
      </h1>
      <div
        className="flex-1 overflow-y-auto max-h-[calc(84vh-10vh)] space-y-2"
        style={{ paddingBottom: "20px" }}
      >
        {allUsers?.map((user, index) => (
          <User key={index} user={user} />
        ))}
        {loading && <p className="text-center text-white">Loading...</p>}
      </div>
    </div>
  );
}

export default Users;
