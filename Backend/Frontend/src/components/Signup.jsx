import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useAuth } from "../context/AuthProvider";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

function Signup() {
  const [authUser, setAuthUser] = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const password = watch("password", "");

  const onSubmit = async (data) => {
    const userInfo = {
      username: data.username,
      email: data.email,
      password: data.password,
      confirmPassword: data.confirmPassword,
    };

    try {
      const response = await axios.post("/api/user/signup", userInfo);
      if (response.data) {
        toast.success("Signup successful");
        localStorage.setItem("ChatApp", JSON.stringify(response.data));
        setAuthUser(response.data);
      }
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.error || "Signup failed");
      } else {
        toast.error("An error occurred. Please try again later.");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-green-500 px-6">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white shadow-lg rounded-lg p-8 space-y-6 w-full max-w-md"
      >
        <h1 className="text-3xl font-bold text-center text-gray-800">
          Chat<span className="text-green-500">App</span>
        </h1>
        <p className="text-gray-500 text-center">Create your account</p>

        {/* Username */}
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-gray-700">
            Username
          </label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-green-500 focus:outline-none"
            placeholder="Enter your username"
            {...register("username", { required: "Username is required" })}
          />
          {errors.username && (
            <span className="text-red-500 text-sm">{errors.username.message}</span>
          )}
        </div>

        {/* Email */}
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-gray-700">
            Email Address
          </label>
          <input
            type="email"
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-green-500 focus:outline-none"
            placeholder="Enter your email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                message: "Invalid email format",
              },
            })}
          />
          {errors.email && (
            <span className="text-red-500 text-sm">{errors.email.message}</span>
          )}
        </div>

        {/* Password */}
        <div className="space-y-2 relative">
          <label className="block text-sm font-semibold text-gray-700">
            Password
          </label>
          <input
            type={showPassword ? "text" : "password"}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-green-500 focus:outline-none"
            placeholder="Enter your password"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            })}
          />
          <span
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-9 cursor-pointer text-gray-500"
          >
            {showPassword ? "Hide" : "Show"}
          </span>
          {errors.password && (
            <span className="text-red-500 text-sm">{errors.password.message}</span>
          )}
        </div>

        {/* Confirm Password */}
        <div className="space-y-2 relative">
          <label className="block text-sm font-semibold text-gray-700">
            Confirm Password
          </label>
          <input
            type={showConfirmPassword ? "text" : "password"}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-green-500 focus:outline-none"
            placeholder="Confirm your password"
            {...register("confirmPassword", {
              required: "Confirm Password is required",
              validate: (value) =>
                value === password || "Passwords do not match",
            })}
          />
          <span
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-3 top-9 cursor-pointer text-gray-500"
          >
            {showConfirmPassword ? "Hide" : "Show"}
          </span>
          {errors.confirmPassword && (
            <span className="text-red-500 text-sm">
              {errors.confirmPassword.message}
            </span>
          )}
        </div>

        {/* Actions */}
        <div className="flex justify-between items-center">
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-500 hover:underline">
              Login
            </Link>
          </p>
          <button
            type="submit"
            className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition"
          >
            Signup
          </button>
        </div>
      </form>
    </div>
  );
}

export default Signup;
