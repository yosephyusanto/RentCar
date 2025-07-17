import React from "react";
import { Link } from "react-router-dom";

const RegisterPage = () => {
  return (
    <div className="flex justify-center items-center h-screen w-screen ">
      <div className="bg-white p-2 rounded-md shadow-2xl md:w-xl md:p-8">
        <h3 className="text-center text-2xl font-bold mb-4">Register</h3>
        <form
          action=""
          className="space-y-2 md:space-y-4 lg:space-y-6 xl:space-y-8"
        >
          <div className="flex flex-col">
            <label htmlFor="fullname">Fullname</label>
            <input
              type="text"
              name="fullname"
              className="border border-gray-300 focus:outline-none focus:ring-0 rounded-lg px-4 py-3  focus:border-blue-500 focus:border-2 transition-all duration-200 placeholder-gray-400"
            />
          </div>
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
          <div className="flex flex-col">
            <label htmlFor="confirm_password">Confirm Password</label>
            <input
              type="text"
              name="confirm_password"
              className="border border-gray-300 focus:outline-none focus:ring-0 rounded-lg px-4 py-3  focus:border-blue-500 focus:border-2 transition-all duration-200 placeholder-gray-400"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="phonenumber">Phone number</label>
            <input
              type="text"
              name="phonenumber"
              placeholder="+62 XXX-XXXX-XXXX"
              className="border border-gray-300 focus:outline-none focus:ring-0 rounded-lg px-4 py-3  focus:border-blue-500 focus:border-2 transition-all duration-200 placeholder-gray-400"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="alamat">Alamat</label>
            <input
              type="text"
              name="alamat"
              className="border border-gray-300 focus:outline-none focus:ring-0 rounded-lg px-4 py-3  focus:border-blue-500 focus:border-2 transition-all duration-200 placeholder-gray-400"
            />
          </div>
          <div>
            <button className="w-full text-white font-semibold bg-blue-600 px-4 py-3 rounded-md hover:bg-blue-800 transition-colors duration-200 cursor-pointer">
              Register
            </button>
          </div>
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
