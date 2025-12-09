import React, { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router";
import { AuthContext } from "../../Provider/AuthContext";

const Navbar = () => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
  };

  const menuItems = [
    { name: "Clint Table", path: "/table" },
    { name: "Add Clint Info", path: "/add" },
    {name:"Home", path:'/'}
  ];

  return (
    <nav className="fixed top-0 left-0 w-full bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 shadow-lg z-50 px-6 transition-all duration-500">
      <div className="flex items-center justify-between p-4 flex-wrap">
        
        {/* Logo / Title */}
        <h1
          className="text-white font-extrabold text-3xl sm:text-4xl tracking-wide drop-shadow-md cursor-pointer"
          onClick={() => navigate("/")}
        >
          Clint Handel
        </h1>

        {/* Mobile Menu Button */}
        <div className="sm:hidden">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-white focus:outline-none"
          >
            {menuOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Menu Items */}
        <div
          className={`w-full sm:w-auto sm:flex sm:items-center justify-end ${
            menuOpen ? "block" : "hidden"
          }`}
        >
          <ul className="flex flex-col sm:flex-row items-center gap-6 sm:gap-10 mt-4 sm:mt-0 text-white font-semibold text-lg sm:text-xl">
            
            {menuItems.map((item) => (
              <li key={item.name}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `hover:text-yellow-200 transition-colors duration-300 ${
                      isActive ? "text-yellow-300 underline" : ""
                    }`
                  }
                  onClick={() => setMenuOpen(false)}
                >
                  {item.name}
                </NavLink>
              </li>
            ))}

            <li>
              <button
                onClick={handleLogout}
                className="bg-red-500 px-4 py-2 rounded-lg hover:bg-red-600 text-white shadow-md transition-all duration-300"
              >
                Logout
              </button>
            </li>

          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
