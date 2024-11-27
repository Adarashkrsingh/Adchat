import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthProvider";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

function Login() {
  const [authUser, setAuthUser] = useAuth();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const userInfo = {
      email: data.email,
      password: data.password,
    };
    axios
      .post("/api/user/login", userInfo)
      .then((response) => {
        if (response.data) {
          toast.success("Login successful");
        }
        localStorage.setItem("ChatApp", JSON.stringify(response.data));
        setAuthUser(response.data);
      })
      .catch((error) => {
        if (error.response) {
          toast.error("Error: " + error.response.data.error);
        }
      });
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-600 via-purple-500 to-pink-500 flex items-center justify-center px-6">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white shadow-2xl rounded-lg p-10 space-y-8 w-full max-w-lg transform hover:scale-105 transition-transform"
      >
        <h1 className="text-4xl font-extrabold text-center text-gray-900">
          Welcome to <span className="text-indigo-600">AdChat</span>
        </h1>
        <p className="text-gray-500 text-center text-lg">
          Please login to continue
        </p>
        {/* Email */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Email Address
          </label>
          <div className="flex items-center border border-gray-300 rounded-md px-3 py-2 focus-within:ring-2 focus-within:ring-indigo-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              className="w-5 h-5 text-gray-400"
              viewBox="0 0 16 16"
            >
              <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
              <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5-1.5 0 0 0-1.5-1.5V6.954Z" />
            </svg>
            <input
              type="email"
              className="ml-2 w-full focus:outline-none"
              placeholder="Enter your email"
              {...register("email", { required: true })}
            />
          </div>
          {errors.email && (
            <span className="text-red-500 text-sm">Email is required</span>
          )}
        </div>
        {/* Password */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <div className="flex items-center border border-gray-300 rounded-md px-3 py-2 focus-within:ring-2 focus-within:ring-indigo-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              className="w-5 h-5 text-gray-400"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                clipRule="evenodd"
              />
            </svg>
            <input
              type={showPassword ? "text" : "password"}
              className="ml-2 w-full focus:outline-none"
              placeholder="Enter your password"
              {...register("password", { required: true })}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="ml-2 text-gray-500 hover:text-gray-700 focus:outline-none"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
          {errors.password && (
            <span className="text-red-500 text-sm">Password is required</span>
          )}
        </div>
        {/* Actions */}
        <div className="flex justify-between items-center">
          <p className="text-sm text-gray-600">
            New here?{" "}
            <Link to="/signup" className="text-indigo-600 hover:underline">
              Sign up
            </Link>
          </p>
          <button
            type="submit"
            className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors"
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;
