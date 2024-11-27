import React, { useState } from "react";
import { BiLogOutCircle } from "react-icons/bi";
import axios from "axios";
import Cookies from "js-cookie";
import toast from "react-hot-toast";

function Logout() {
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    setLoading(true);
    try {
      const res = await axios.post("/api/user/logout");
      localStorage.removeItem("ChatApp");
      Cookies.remove("jwt");
      setLoading(false);
      toast.success("Logged out successfully");
      window.location.reload();
    } catch (error) {
      console.log("Error in Logout", error);
      toast.error("Error in logging out");
      setLoading(false);
    }
  };

  return (
    <div className="h-[10vh] flex items-center justify-center bg-gray-800 rounded-b-lg shadow-lg">
      <button
        onClick={handleLogout}
        disabled={loading}
        className="flex items-center gap-2 bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-red-400"
      >
        <BiLogOutCircle className="text-2xl" />
        {loading ? "Logging Out..." : "Logout"}
      </button>
    </div>
  );
}

export default Logout;
