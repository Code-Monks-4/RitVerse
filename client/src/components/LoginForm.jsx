import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "react-toastify";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { loginUser } from "../services/api";
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { login } from '../redux/slices/authSlice';

const schema = yup.object({
  email: yup.string().required("Please provide an email").email("Please enter a valid email"),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters"),
  role: yup.string(),
}).required();

const LoginForm = () => {
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedRole, setSelectedRole] = useState("student"); // default role is 'user'

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    const payload = {
      email: data.email, // changed identifier to email
      password: data.password,
      role: selectedRole, // include selected role
    };

    // Log the payload to the console
    console.log("Payload being sent to axios:", payload);

    setIsLoading(true);
    try {
      const response = await loginUser(payload);
      toast.success("Login Successful!");
      console.log(response.data);
      dispatch(login());
      navigate("/");
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed. Please try again.");
      console.error("Error during login:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative w-full h-screen overflow-hidden" style={{ backgroundColor: "var(--bg-color)" }}>
      <div className="absolute top-0 left-0 w-full h-full bg-[#0d0d0d]"></div>
      <div className="absolute z-10 flex justify-center items-center w-full h-full">
        <div className="bg-white bg-opacity-20 backdrop-blur-lg p-8 rounded-lg shadow-2xl w-full sm:w-[400px] border-[2px] border-gray-300 transform transition-transform duration-700 hover:scale-105" style={{ backgroundColor: "var(--object-bg)" }}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <h2 className="text-2xl font-semibold text-center" style={{ color: "var(--text-color)" }}>Login</h2>
            <div className="mt-4">
              <input
                {...register("email")} // changed from identifier to email
                type="text"
                className="w-full p-3 rounded-lg border-2 border-gray-300 focus:ring-2 focus:ring-gray-400"
                placeholder="Enter your email"
                style={{ backgroundColor: "var(--object-bg)", color: "var(--text-color)" }}
              />
              <p className="text-red-500 text-sm mt-1">{errors.email?.message}</p> {/* changed from identifier to email */}
            </div>
            <div>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  {...register("password")}
                  className="w-full p-3 rounded-lg border-2 border-gray-300 focus:ring-2 focus:ring-gray-400"
                  placeholder="Password"
                  style={{ backgroundColor: "var(--object-bg)", color: "var(--text-color)" }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 cursor-pointer"
                >
                  {showPassword ? <FaEyeSlash className="text-gray-200" /> : <FaEye className="text-gray-200" />}
                </button>
              </div>
              <p className="text-red-500 text-sm mt-1">{errors.password?.message}</p>
            </div>

            {/* Role selection section */}
            <div className="mt-4">
              <h3 className="text-lg font-semibold" style={{ color: "var(--text-color)" }}>Select Role</h3>
              <div className="flex w-full mt-4">
                {/* User Role (Left side) */}
                <div
                  onClick={() => setSelectedRole("student")}
                  className={`w-1/2 p-4 rounded-lg flex items-center justify-center cursor-pointer ${selectedRole === "student" ? "bg-gray-600 text-white" : "bg-transparent text-gray-300"} hover:bg-gray-600 hover:text-white transition-all duration-300`}
                >
                  <span className="text-sm">Students</span>
                </div>

                {/* Mentor Role (Right side) */}
                <div
                  onClick={() => setSelectedRole("mentor")}
                  className={`w-1/2 p-4 rounded-lg flex items-center justify-center cursor-pointer ${selectedRole === "mentor" ? "bg-gray-600 text-white" : "bg-transparent text-gray-300"} hover:bg-gray-600 hover:text-white transition-all duration-300`}
                >
                  <span className="text-sm">Mentor</span>
                </div>
              </div>
              <p className="text-red-500 text-sm mt-1">{errors.role?.message}</p>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-3 rounded-lg mt-4 border-2 border-gray-600 bg-transparent text-gray-200 hover:bg-gray-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-gray-400 ${isLoading ? "cursor-not-allowed opacity-50" : ""}`}
            >
              {isLoading ? "Logging in..." : "Login"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
