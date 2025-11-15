import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/user/authSlice';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    setMenuOpen(false);
    navigate('/sign-in');
  };

  return (
    <nav className="bg-gray-900 text-white shadow-md w-full">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-indigo-400">
          Gym<span className="text-white">Zone</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8 text-lg font-medium">

          <NavLink
            to="/"
            className={({ isActive }) =>
              `hover:text-indigo-400 transition ${isActive ? "text-indigo-400" : ""}`
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/about"
            className={({ isActive }) =>
              `hover:text-indigo-400 transition ${isActive ? "text-indigo-400" : ""}`
            }
          >
            About Us
          </NavLink>

          {/* Auth Menu */}
          {!user ? (
            <div className="flex items-center space-x-4">
              <NavLink
                to="/sign-in"
                className={({ isActive }) =>
                  `hover:text-indigo-400 transition ${isActive ? "text-indigo-400" : ""}`
                }
              >
                Login
              </NavLink>

              {/* Divider */}
              <div className="h-5 w-px bg-gray-500"></div>

              <NavLink
                to="/sign-up"
                className={({ isActive }) =>
                  `hover:text-indigo-400 transition ${isActive ? "text-indigo-400" : ""}`
                }
              >
                Register
              </NavLink>
            </div>
          ) : (
            <button
              onClick={handleLogout}
              className="hover:text-indigo-400 transition"
            >
              Logout
            </button>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-gray-300 hover:text-white"
        >
          {menuOpen ? (
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div className="md:hidden bg-gray-800 px-6 py-4 space-y-4 text-lg">

          <NavLink
            to="/"
            onClick={() => setMenuOpen(false)}
            className="block hover:text-indigo-400"
          >
            Home
          </NavLink>

          <NavLink
            to="/about"
            onClick={() => setMenuOpen(false)}
            className="block hover:text-indigo-400"
          >
            About Us
          </NavLink>

          {!user ? (
            <>
              <NavLink
                to="/sign-in"
                onClick={() => setMenuOpen(false)}
                className="block hover:text-indigo-400"
              >
                Login
              </NavLink>

              {/* Divider */}
              <div className="w-full h-px bg-gray-600"></div>

              <NavLink
                to="/sign-up"
                onClick={() => setMenuOpen(false)}
                className="block hover:text-indigo-400"
              >
                Register
              </NavLink>
            </>
          ) : (
            <button
              onClick={handleLogout}
              className="block text-left w-full hover:text-indigo-400"
            >
              Logout
            </button>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
