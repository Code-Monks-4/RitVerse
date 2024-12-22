import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/slices/authSlice';
import { toast } from 'react-toastify';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((state) => state.auth);

  const [isServicesOpen, setIsServicesOpen] = useState(false);
  let hoverTimeout;

  const handleLoginClick = () => navigate('/login');
  const handleSignupClick = () => navigate('/sign-up');
  const handleLogoutClick = () => {
    toast.error('Logged out Successfully!');
    dispatch(logout());
    navigate('/');
  };
  const handleDashboardClick = () => navigate('/dashboard');

  const getActiveLink = () => {
    if (location.pathname === '/') return 'home';
    if (location.pathname === '/about-us') return 'about';
    if (location.pathname === '/contact-us') return 'contact';
    if (location.pathname.startsWith('/services')) return 'services';
    if (location.pathname === '/connect') return 'connect';
    return '';
  };

  const activeLink = getActiveLink();

  const handleMouseEnter = () => {
    clearTimeout(hoverTimeout);
    setIsServicesOpen(true);
  };

  const handleMouseLeave = () => {
    hoverTimeout = setTimeout(() => {
      setIsServicesOpen(false);
    }, 1000); // Dropdown remains open for 1 second
  };

  return (
    <nav className="flex items-center justify-between px-6 py-4">
      {/* Logo */}
      <div className="text-2xl font-bold">
        <Link to="/" className="text-white">Logo</Link>
      </div>

      {/* Centered Links Section */}
      <div className="hidden md:flex items-center justify-center space-x-6">
        {['home', 'about', 'contact'].map((link) => (
          <div
            key={link}
            className={`relative cursor-pointer ${
              activeLink === link ? 'text-white scale-110' : 'text-white'
            }`}
          >
            <Link
              to={
                link === 'home'
                  ? '/'
                  : link === 'about'
                  ? '/about-us'
                  : '/contact-us'
              }
              className="relative"
            >
              {link.charAt(0).toUpperCase() + link.slice(1)}
              {activeLink === link && (
                <div
                  className="absolute -bottom-1 left-2 h-[2px] bg-green-500"
                  style={{ width: '60%' }}
                />
              )}
            </Link>
          </div>
        ))}

        {/* Services Dropdown */}
        {/* Services Dropdown */}
<div
  className="relative cursor-pointer text-white"
  onMouseEnter={handleMouseEnter}
  onMouseLeave={handleMouseLeave}
>
  <span
    className={`relative ${activeLink === 'services' ? 'scale-110' : ''}`}
  >
    Services
  </span>
  {isServicesOpen && (
    <div
      className="absolute top-8 left-0 w-48 bg-transparent backdrop-blur-md rounded-lg shadow-lg z-10 border border-gray-500 transition-all duration-300 hover:backdrop-blur-lg hover:border-gray-300"
    >
      <Link
  to="/services/buy-sell"
  className="block px-4 py-2 text-white hover:backdrop-blur-md hover:bg-transparent hover:text-green-500 transition duration-300 border-b border-gray-700"
>
  Buy and Sell
</Link>


<Link
  to="/services/buy-sell"
  className="block px-4 py-2 text-white hover:backdrop-blur-md hover:bg-transparent hover:text-green-500 transition duration-300 border-b border-gray-700"
>
  Lost and Found
</Link>

    </div>
  )}
</div>


        {/* Connect */}
        <div
          className={`relative cursor-pointer ${
            activeLink === 'connect' ? 'text-white scale-110' : 'text-white'
          }`}
        >
          <Link to="/connect" className="relative">
            Connect
            {activeLink === 'connect' && (
              <div
                className="absolute -bottom-1 left-2 h-[2px] bg-green-500"
                style={{ width: '60%' }}
              />
            )}
          </Link>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex space-x-4">
        {isLoggedIn ? (
          <>
            {/* Display for logged-in users */}
            <button
              onClick={handleDashboardClick}
              className="px-6 py-2 border-2 border-transparent text-white rounded-md focus:outline-none transition-all duration-300 hover:border-purple-500 hover:shadow-md hover:shadow-purple-500/50 md:flex hidden"
            >
              Dashboard
            </button>
            <button
              onClick={handleLogoutClick}
              className="px-6 py-2 border-2 border-transparent text-white rounded-md focus:outline-none transition-all duration-300 hover:border-red-500 hover:shadow-md hover:shadow-red-500/50"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            {/* Display for logged-out users */}
            <button
              onClick={handleLoginClick}
              className="px-6 py-2 border-2 border-transparent text-white rounded-md focus:outline-none transition-all duration-300 hover:border-green-500 hover:shadow-md hover:shadow-green-500/50"
            >
              Login
            </button>
            <button
              onClick={handleSignupClick}
              className="px-6 md:flex hidden py-2 border-2 border-transparent text-white rounded-md focus:outline-none transition-all duration-300 hover:border-blue-500 hover:shadow-md hover:shadow-blue-500/50"
            >
              Sign Up
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
