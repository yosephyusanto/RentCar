import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import type { AssignRoleRequest, RegisterRequest } from "../interfaces/auth";
import { assignRole, registerApi } from "../services/auth";
import { toast, Toaster } from "sonner";
import { FaSpinner } from "react-icons/fa6";

const RegisterPage = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const [data, setData] = useState<RegisterRequest>({
    email: "",
    password: "",
    confirmPassword: "",
    fullName: "",
    phoneNumber: "",
    address: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    fullName: "",
    phoneNumber: "",
    address: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      email: "",
      password: "",
      confirmPassword: "",
      fullName: "",
      phoneNumber: "",
      address: "",
    };

    // Validate Full Name
    if (!data.fullName) {
      newErrors.fullName = "Full Name is required";
      isValid = false;
    }

    // Validate Email
    if (!data.email) {
      newErrors.email = "Email is required";
      isValid = false;
    }

    // Validate Password
    if (!data.password) {
      newErrors.password = "Password is required";
      isValid = false;
    }

    // Validate Confirm Password
    if (!data.confirmPassword) {
      newErrors.confirmPassword = "Confirm Password is required";
      isValid = false;
    } else if (data.password !== data.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
      isValid = false;
    }

    // Validate Phone Number
    if (!data.phoneNumber) {
      newErrors.phoneNumber = "Phone Number is required";
      isValid = false;
    }

    // Validate Address
    if (!data.address) {
      newErrors.address = "Address is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Validate before proceeding
    if (!validateForm()) {
      setIsLoading(false);
      return;
    }

    try {
      const response: string = await registerApi(data);
      // Semua akun register sebagai customer, untuk sebagai employee diset manual di db
      const request: AssignRoleRequest = {
        email: data.email,
        role: "customer",
      };
      const message: string = await assignRole(request);
      console.log(message);
      toast.success(response); // registerApi return string pesan success
      navigate("/login");
    } catch (e: any) {
      toast.error(e.message || "Something went wrong when sending the data");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen w-screen">
      <div className="bg-white p-2 rounded-md shadow-2xl md:w-xl md:p-8">
        <h3 className="text-center text-2xl font-bold mb-4">Register</h3>
        <form
          onSubmit={handleRegister}
          className="space-y-2 md:space-y-4 lg:space-y-6 xl:space-y-8"
        >
          {/* Fullname Input */}
          <div className="flex flex-col">
            <label htmlFor="fullName">Fullname</label>
            <input
              type="text"
              name="fullName"
              onChange={handleChange}
              value={data.fullName}
              className="border border-gray-300 focus:outline-none focus:ring-0 rounded-lg px-4 py-3 focus:border-blue-500 focus:border-2 transition-all duration-200 placeholder-gray-400"
            />
            {errors.fullName && (
              <span className="text-red-500 text-sm">{errors.fullName}</span>
            )}
          </div>

          {/* Email Input */}
          <div className="flex flex-col">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              name="email"
              onChange={handleChange}
              value={data.email}
              className="border border-gray-300 focus:outline-none focus:ring-0 rounded-lg px-4 py-3 focus:border-blue-500 focus:border-2 transition-all duration-200 placeholder-gray-400"
            />
            {errors.email && (
              <span className="text-red-500 text-sm">{errors.email}</span>
            )}
          </div>

          {/* Password Input */}
          <div className="flex flex-col">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              onChange={handleChange}
              value={data.password}
              className="border border-gray-300 focus:outline-none focus:ring-0 rounded-lg px-4 py-3 focus:border-blue-500 focus:border-2 transition-all duration-200 placeholder-gray-400"
            />
            {errors.password && (
              <span className="text-red-500 text-sm">{errors.password}</span>
            )}
          </div>

          {/* Confirm Password Input */}
          <div className="flex flex-col">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              onChange={handleChange}
              value={data.confirmPassword}
              className="border border-gray-300 focus:outline-none focus:ring-0 rounded-lg px-4 py-3 focus:border-blue-500 focus:border-2 transition-all duration-200 placeholder-gray-400"
            />
            {errors.confirmPassword && (
              <span className="text-red-500 text-sm">
                {errors.confirmPassword}
              </span>
            )}
          </div>

          {/* Phone Number Input */}
          <div className="flex flex-col">
            <label htmlFor="phoneNumber">Phone Number</label>
            <input
              type="text"
              name="phoneNumber"
              placeholder="+62 XXX-XXXX-XXXX"
              onChange={handleChange}
              value={data.phoneNumber}
              className="border border-gray-300 focus:outline-none focus:ring-0 rounded-lg px-4 py-3 focus:border-blue-500 focus:border-2 transition-all duration-200 placeholder-gray-400"
            />
            {errors.phoneNumber && (
              <span className="text-red-500 text-sm">{errors.phoneNumber}</span>
            )}
          </div>

          {/* Address Input */}
          <div className="flex flex-col">
            <label htmlFor="address">Address</label>
            <input
              type="text"
              name="address"
              onChange={handleChange}
              value={data.address}
              className="border border-gray-300 focus:outline-none focus:ring-0 rounded-lg px-4 py-3 focus:border-blue-500 focus:border-2 transition-all duration-200 placeholder-gray-400"
            />
            {errors.address && (
              <span className="text-red-500 text-sm">{errors.address}</span>
            )}
          </div>

          {/* Register Button */}
          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full text-white font-semibold bg-blue-600 px-4 py-3 rounded-md hover:bg-blue-800 transition-colors duration-200 cursor-pointer"
            >
              {isLoading ? (
                <div className="flex justify-center items-center">
                  <FaSpinner className="animate-spin mr-2" />
                  Loading...
                </div>
              ) : (
                "Register"
              )}
            </button>
          </div>

          {/* Login Link */}
          <div className="text-center">
            Already have an account?{" "}
            <span className="text-blue-400 cursor-pointer hover:underline">
              <Link to="/login">Login</Link>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
