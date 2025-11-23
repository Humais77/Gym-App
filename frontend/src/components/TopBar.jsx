import { useRef, useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../redux/user/authSlice';
import { FiMenu, FiX } from 'react-icons/fi';
import Tab from './Tab';
import Cursor from './Cursor';

const TopBar = () => {
  const [position, setPosition] = useState({ left: 0, width: 0, opacity: 0 });
  const location = useLocation();
  const [activeTab, setActiveTab] = useState(location.pathname);
  const [hoverTab, setHoverTab] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    setActiveTab(location.pathname);
  }, [location.pathname]);

  // Tabs based on user role
  const tabs = user
    ? user.role === 'admin'
      ? [
          { label: "Dashboard", to: "/admin/dashboard" },
          { label: "Analytics", to: "/admin/analytics" },
          { label: "Trainers", to: "/admin/trainers" },
          { label: "Memberships", to: "/admin/memberships" },
        ]
      : [
          { label: "Home", to: "/" },
          { label: "My Plan", to: "/myplan" },
          { label: "Workout", to: "/workout" },
          { label: "Profile", to: "/profile" },
        ]
    : [
        { label: "Home", to: "/" },
        { label: "About", to: "/about" },
        { label: "Contact", to: "/contact" },
      ];

  return (
    <div className="bg-gray-800 text-gray-200 shadow relative z-10">
      <div className="container mx-auto flex justify-between items-center py-3 px-4">
        {/* Left: Logo */}
        <Link to="/" className="text-xl font-bold text-white" onClick={()=>{
            setActiveTab("/");
            setHoverTab(null);
            setPosition({left:0,width:0,opacity:0});
        }}>
          GymLogo
        </Link>

        {/* Center Tabs for md+ devices */}
        <ul
          onMouseLeave={() => {
            setHoverTab(null);
            if (activeTab) {
              const activeElement = document.querySelector(`a[data-to="${activeTab}"]`);
              if (activeElement) {
                const { width, left } = activeElement.getBoundingClientRect();
                const parentLeft = activeElement.parentElement.getBoundingClientRect().left;
                setPosition({ left: left - parentLeft, width, opacity: 1 });
              } else {
                setPosition(pv => ({ ...pv, opacity: 0 }));
              }
            }
          }}
          className="hidden md:flex relative w-fit rounded-full border border-gray-700 bg-gray-800 p-1"
        >
          {tabs.map(({ label, to }) => (
            <Tab
              key={label}
              setPosition={setPosition}
              to={to}
              isActive={hoverTab === to || (!hoverTab && activeTab === to)}
              onClick={() => setActiveTab(to)}
              onHover={() => setHoverTab(to)}
            >
              {label}
            </Tab>
          ))}
          <Cursor position={position} />
        </ul>

        {/* Right: Action & Hamburger */}
        <div className="flex items-center">
          {/* Action button for md+ devices */}
          {user ? (
            <button
              onClick={() => dispatch(logout())}
              className="hidden md:block bg-pink-500 text-white px-4 py-1.5 rounded-full hover:bg-pink-600 transition"
            >
              Logout
            </button>
          ) : (
            <Link
              to="/login"
              className="hidden md:block bg-pink-500 text-white px-4 py-1.5 rounded-full hover:bg-pink-600 transition"
            >
              Login
            </Link>
          )}

          {/* Hamburger for sm devices */}
          <button
            className="md:hidden ml-2 text-white text-2xl"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu for sm devices */}
      {menuOpen && (
        <div className="md:hidden bg-gray-800 border-t border-gray-700">
          <ul className="flex flex-col p-4 space-y-2">
            {tabs.map(({ label, to }) => (
              <li key={label}>
                <Link
                  to={to}
                  onClick={() => {
                    setActiveTab(to);
                    setMenuOpen(false);
                  }}
                  className={`block px-4 py-2 rounded-md transition-colors
                    ${activeTab === to ? 'bg-white text-gray-900' : 'text-gray-300'}
                    hover:bg-white hover:text-gray-900`}
                >
                  {label}
                </Link>
              </li>
            ))}

            {/* Action button at bottom */}
            <li>
              {user ? (
                <button
                  onClick={() => { dispatch(logout()); setMenuOpen(false); }}
                  className="w-full bg-pink-500 text-white px-4 py-2 rounded-full hover:bg-pink-600 transition"
                >
                  Logout
                </button>
              ) : (
                <Link
                  to="/sign-in"
                  onClick={() => setMenuOpen(false)}
                  className="w-full bg-pink-500 text-white px-4 py-2 rounded-full hover:bg-pink-600 transition"
                >
                  Login
                </Link>
              )}
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};



export default TopBar;
