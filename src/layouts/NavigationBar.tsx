import { useState } from "react";
import { Link } from "react-router-dom";

const NavigationBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  return (
    <nav className="fixed top-0 left-0 right-0 w-full h-16 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm z-50">
      <div className="md:max-w-7xl lg:max-w-screen-2xl mx-auto px-10 sm:px-8 md:px-6 lg:px4 xl:px-0">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link
              to="/"
              className="text-2xl font-bold text-gray-900 hover:text-blue-600 transition-colors duration-200"
            >
              RentalCar
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="hidden lg:block">
            <ul className="flex items-center space-x-8">
              <li>
                <Link
                  to="/"
                  className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200 relative group"
                >
                  Home
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-200 group-hover:w-full"></span>
                </Link>
              </li>
              <li>
                <Link
                  to="/history"
                  className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200 relative group"
                >
                  History
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-200 group-hover:w-full"></span>
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200 relative group"
                >
                  Contact
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-200 group-hover:w-full"></span>
                </Link>
              </li>
              <li>
                <Link
                  to="/employee/upload"
                  className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200 relative group"
                >
                  Upload
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-200 group-hover:w-full"></span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Auth Buttons */}
          <div className="hidden lg:flex items-center space-x-4 ">
            <button className="text-gray-700 hover:text-blue-600 font-semibold transition-colors duration-200 cursor-pointer">
              Login
            </button>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 shadow-sm hover:shadow-md transform hover:-translate-y-0.5 cursor-pointer">
              Register
            </button>
          </div>

          {/* Hamburger Icon */}
          <div className="lg:hidden">
            <i
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`bx ${isMenuOpen ? "bx-x" : "bx-menu"} text-5xl cursor-pointer hover:text-blue-700 transition-colors duration-300 transform ${isMenuOpen ? "rotate-180" : "rotate-0"} transition-transform duration-300 ease-in-out`}
            ></i>
          </div>

          {/* Hamburger Menu Open */}
          <div
            className={`absolute lg:hidden top-[63px] left-0 right-0 bg-white/95  flex flex-col gap-y-2 font-semibold text-lg transform transition-transform backdrop-blur border-b border-gray-200 shadow-sm ${
              isMenuOpen ? "opacity-100" : "hidden"
            }`}
            style={{ transition: "transform 0.3s ease, opacity 0.3 ease" }}
          >
            <li className="list-none w-full text-center p-4 hover:bg-blue-600 hover:text-white transition-all cursor-pointer">
              Home
            </li>
            <li className="list-none w-full text-center p-4 hover:bg-blue-600 hover:text-white transition-all cursor-pointer">
              History
            </li>
            <li className="list-none w-full text-center p-4 hover:bg-blue-600 hover:text-white transition-all cursor-pointer">
              Contact
            </li>
            <li className="list-none w-full text-center p-4 hover:bg-blue-600 hover:text-white transition-all cursor-pointer">
              Upload
            </li>
            <div className="text-center p-4">
              <button className="text-gray-700 hover:text-blue-600 font-semibold transition-colors duration-200 cursor-pointer">
                Login
              </button>
            </div>
            <div className="text-center p-4">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 shadow-sm hover:shadow-md transform hover:-translate-y-0.5 cursor-pointer">
                Register
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavigationBar;
