import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  const handleLogoutClick = () => {
    // Clear localStorage/sessionStorage if you are using them to store user data
    localStorage.removeItem("userRole");
    localStorage.removeItem("userId");
    navigate("/", { replace: true }); // Redirect to login
  };

  return (
    <header className="border-b py-4 bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 tracking-wide fixed top-0 left-0 w-full z-50 shadow-lg">
      <div className="max-w-7xl w-full mx-auto flex flex-wrap items-center gap-4 px-4 sm:px-10">
        <a href="javascript:void(0)" className="flex items-center gap-2">
          {/* Logo image */}
          <img
            src="/assets/logo.png" // Corrected path to your logo
            alt="HiTech Logo"
            className="h-12 w-auto" // Adjust size as needed
          />
          {/* Heading to the right of the logo */}
          <h1 className="text-2xl font-bold text-white">
            Hi-Tech Metal Forming
          </h1>
        </a>

        <div id="collapseMenu" className="max-lg:hidden lg:!block">
          <ul className="lg:flex lg:ml-12 lg:gap-x-6">
            {/* <li>
              <Link
                to="/pdi"
                className="hover:text-gray-300 block text-white font-semibold transition-all"
              >
                PDI
              </Link>
            </li> */}
            {/* <li>
              <Link
                to="/hydro"
                className="hover:text-gray-300 block text-white font-semibold transition-all"
              >
                HYDRO
              </Link>
            </li> */}
            {/* <li>
              <Link
                to="/dashboard"
                className="hover:text-gray-300 block text-white font-semibold transition-all"
              >
                Dashboard
              </Link>
            </li> */}
          </ul>
        </div>
        <div className="flex ml-auto">
          <button
            onClick={handleLogoutClick}
            className="bg-red-600 hover:bg-red-500 flex items-center transition-all font-semibold rounded-md px-5 py-3 text-white shadow-md"
          >
            LogOut
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-[14px] fill-current ml-2"
              viewBox="0 0 492.004 492.004"
            >
              <path d="M484.14 226.886 306.46 49.202c-5.072-5.072-11.832-7.856-19.04-7.856-7.216 0-13.972 2.788-19.044 7.856l-16.132 16.136c-5.068 5.064-7.86 11.828-7.86 19.04 0 7.208 2.792 14.2 7.86 19.264L355.9 207.526H26.58C11.732 207.526 0 219.15 0 234.002v22.812c0 14.852 11.732 27.648 26.58 27.648h330.496L252.248 388.926c-5.068 5.072-7.86 11.652-7.86 18.864 0 7.204 2.792 13.88 7.86 18.948l16.132 16.084c5.072 5.072 11.828 7.836 19.044 7.836 7.208 0 13.968-2.8 19.04-7.872l177.68-177.68c5.084-5.088 7.88-11.88 7.86-19.1.016-7.244-2.776-14.04-7.864-19.12z" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
