import React, { useState } from "react";
import { Link } from "react-router-dom";
import type {
  AssignRoleRequest,
  LoginRequest,
  LoginResponse,
} from "../interfaces/auth";
import { assignRole, login } from "../services/auth";
import { toast } from "sonner";

const LoginPage = () => {
  const [data, setData] = useState<LoginRequest>({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({ email: "", password: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors: { email: string; password: string } = {
      email: "",
      password: "",
    };

    if (!data.email) {
      newErrors.email = "Email is required";
      isValid = false;
    }

    if (!data.password) {
      newErrors.password = "Password is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      const response: LoginResponse = await login(data);
      localStorage.setItem("token", response.token);
      const temp: AssignRoleRequest = { email: data.email, role: "customer" };
      const message: string = await assignRole(temp);
      console.log(message);
    } catch (e: any) {
      toast.error(e.message || "Something went wrong when sending the data");
    }
  };

  return (
    <div className="relative min-h-screen flex justify-center items-center overflow-hidden">
      {/* white card */}
      <div className="bg-white shadow-2xl p-8 rounded-md w-full sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl">
        <h3 className="text-center text-2xl font-bold mb-4">Login</h3>
        <form onSubmit={handleLogin} className="space-y-4 lg:space-y-8">
          <div className="flex flex-col">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              name="email"
              onChange={handleChange}
              className="border border-gray-300 focus:outline-none focus:ring-0 rounded-lg px-4 py-3  focus:border-blue-500 focus:border-2 transition-all duration-200 placeholder-gray-400"
            />
            {errors.email && (
              <span className="text-red-500 text-sm">{errors.email}</span>
            )}
          </div>
          <div className="flex flex-col">
            <label htmlFor="password">Password</label>
            <input
              type="text"
              name="password"
              onChange={handleChange}
              className="border border-gray-300 focus:outline-none focus:ring-0 rounded-lg px-4 py-3  focus:border-blue-500 focus:border-2 transition-all duration-200 placeholder-gray-400"
            />
            {errors.password && (
              <span className="text-red-500 text-sm">{errors.password}</span>
            )}
          </div>
          <div>
            <button
              type="submit"
              className="w-full bg-blue-600 px-4 py-3 rounded-md font-semibold text-white hover:bg-blue-800 transition-colors duration-200 cursor-pointer"
            >
              Login
            </button>
          </div>
          <div>
            <p className="text-center">
              Don't have an account?{" "}
              <span className="text-blue-400 cursor-pointer hover:underline">
                <Link to="/register">register here</Link>
              </span>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
