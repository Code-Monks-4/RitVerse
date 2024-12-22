import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "react-toastify";
import { FaEnvelope, FaEye, FaEyeSlash } from "react-icons/fa";
import { signupUser } from "../services/api";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import "tailwindcss/tailwind.css";

const schema = yup.object({
  name: yup.string().required("Name is required"),
  email: yup.string().email("Please provide a valid email").required("Please provide an email"),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required"),
  role: yup.string(), // New validation for role
}).required();

const SignupForm = () => {
  const [selectedRole, setSelectedRole] = useState("user"); // Default role is 'user'
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    const payload = {
      name: data.name,
      email: data.email, // Using email instead of identifier
      password: data.password,
      role: selectedRole, // Add role in the payload
    };

    console.log("Form Payload:", payload); // Log the data, including the selected role

    try {
      const response = await signupUser(payload);
      toast.success("Signup Successful!");

      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Signup failed!");
      console.error("Error during signup:", error);
    }
  };

  return (
    <div className="relative w-full h-screen overflow-hidden" style={{ backgroundColor: "var(--bg-color)" }}>
      <div className="absolute top-0 left-0 w-full h-full bg-[#0d0d0d]"></div>

      <div className="absolute z-10 flex justify-center items-center w-full h-full">
        <div className="bg-white bg-opacity-20 backdrop-blur-lg p-8 rounded-lg shadow-2xl w-full sm:w-[400px] border-[2px] border-gray-300 transform transition-transform duration-700 hover:scale-105" style={{ backgroundColor: "var(--object-bg)" }}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <h2 className="text-2xl font-semibold text-center" style={{ color: "var(--text-color)" }}>Create Account</h2>

            <div>
              <input
                type="text"
                {...register("name")}
                className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-gray-400"
                placeholder="Full Name"
                style={{ backgroundColor: "var(--object-bg)", color: "var(--text-color)" }}
              />
              <p className="text-red-500 text-sm mt-1">{errors.name?.message}</p>
            </div>

            <div className="mt-4">
              <input
                {...register("email")}
                type="email" // Changed to email type
                className="w-full p-3 rounded-lg border-2 border-gray-300 focus:ring-2 focus:ring-gray-400"
                placeholder="Enter your email"
                style={{ backgroundColor: "var(--object-bg)", color: "var(--text-color)" }}
              />
              <p className="text-red-500 text-sm mt-1">{errors.email?.message}</p>
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
                  aria-label={showPassword ? "Hide Password" : "Show Password"}
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 cursor-pointer"
                >
                  {showPassword ? <FaEyeSlash className="text-gray-200" /> : <FaEye className="text-gray-200" />}
                </button>
              </div>
              <p className="text-red-500 text-sm mt-1">{errors.password?.message}</p>
            </div>

            <div>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  {...register("confirmPassword")}
                  className="w-full p-3 rounded-lg border-2 border-gray-300 focus:ring-2 focus:ring-gray-400"
                  placeholder="Confirm Password"
                  style={{ backgroundColor: "var(--object-bg)", color: "var(--text-color)" }}
                />
                <button
                  type="button"
                  aria-label={showConfirmPassword ? "Hide Confirm Password" : "Show Confirm Password"}
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-3 cursor-pointer"
                >
                  {showConfirmPassword ? <FaEyeSlash className="text-gray-200" /> : <FaEye className="text-gray-200" />}
                </button>
              </div>
              <p className="text-red-500 text-sm mt-1">{errors.confirmPassword?.message}</p>
            </div>

            {/* Role selection */}
            <div className="mt-4">
              <h3 className="text-lg font-semibold" style={{ color: "var(--text-color)" }}>Select Role</h3>
              <div className="flex w-full mt-4">
                {/* User Role (Left side) */}
                <div
                  onClick={() => setSelectedRole("user")}
                  className={`w-1/2 p-4 rounded-lg flex items-center justify-center cursor-pointer ${selectedRole === "user" ? "bg-gray-600 text-white" : "bg-transparent text-gray-300"} hover:bg-gray-600 hover:text-white transition-all duration-300`}
                >
                  <span className="text-sm">User</span>
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
              className="w-full py-3 bg-transparent text-gray-200 border-2 border-gray-600 hover:bg-gray-600 hover:text-white rounded-lg mt-4 focus:outline-none focus:ring-2 focus:ring-gray-400"
            >
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignupForm;
