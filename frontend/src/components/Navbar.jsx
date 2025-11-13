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
    <nav className="bg-gray-900 text-white shadow-md w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <div className="text-2xl font-bold text-indigo-400 tracking-wide">
          <Link to="/">Gym<span className="text-white">Zone</span></Link>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-8 text-lg font-medium">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `transition hover:text-indigo-400 ${isActive ? 'text-indigo-400' : ''}`
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              `transition hover:text-indigo-400 ${isActive ? 'text-indigo-400' : ''}`
            }
          >
            About Us
          </NavLink>

          {user ? (
            <button
              onClick={handleLogout}
              className="transition hover:text-indigo-400"
            >
              Sign Out
            </button>
          ) : (
            <NavLink
              to="/sign-in"
              className={({ isActive }) =>
                `transition hover:text-indigo-400 ${isActive ? 'text-indigo-400' : ''}`
              }
            >
              Sign In
            </NavLink>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-gray-300 hover:text-white focus:outline-none"
        >
          {menuOpen ? (
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
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

          {user ? (
            <button
              onClick={handleLogout}
              className="block text-left w-full hover:text-indigo-400"
            >
              Sign Out
            </button>
          ) : (
            <NavLink
              to="/sign-in"
              onClick={() => setMenuOpen(false)}
              className="block hover:text-indigo-400"
            >
              Sign In
            </NavLink>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
