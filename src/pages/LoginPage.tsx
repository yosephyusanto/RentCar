import React from "react";
import { Link } from "react-router-dom";

const LoginPage = () => {
  return (
    <div className="relative min-h-screen flex justify-center items-center overflow-hidden">
      {/* white card */}
      <div className="bg-white shadow-2xl p-8 rounded-md w-full sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl">
        <h3 className="text-center text-2xl font-bold mb-4">Login</h3>
        <form action="" className="space-y-4 lg:space-y-8">
          <div className="flex flex-col">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              name="email"
              className="border border-gray-300 focus:outline-none focus:ring-0 rounded-lg px-4 py-3  focus:border-blue-500 focus:border-2 transition-all duration-200 placeholder-gray-400"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="password">Password</label>
            <input
              type="text"
              name="password"
              className="border border-gray-300 focus:outline-none focus:ring-0 rounded-lg px-4 py-3  focus:border-blue-500 focus:border-2 transition-all duration-200 placeholder-gray-400"
            />
          </div>
          <div>
            <button className="w-full bg-blue-600 px-4 py-3 rounded-md font-semibold text-white hover:bg-blue-800 transition-colors duration-200 cursor-pointer">
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
