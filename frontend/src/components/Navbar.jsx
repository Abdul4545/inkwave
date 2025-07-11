import React, { useContext, useState } from 'react';
import { assets } from '../assets/assets';
import { Link, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

const Navbar = () => {
  const { user, setShowLogin, logout, credit } = useContext(AppContext);
  const navigate = useNavigate();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(prev => !prev);
  const handleLogout = () => {
    setIsMenuOpen(false);
    logout();
  };

  return (
    <div className='flex items-center justify-between py-4'>
      <Link to="/">
        <img src={assets.logo} alt="Logo" className='w-22 sm:w-32 lg:w-32' style={{ height: "80px" }} />
      </Link>

      <div>
        {user ? (
          <div className='flex items-center gap-2 sm:gap-3 relative'>
            <button
              onClick={() => navigate("/buy-credit")}
              className='flex items-center gap-2 bg-blue-100 px-4 sm:px-6 py-1.5 sm:py-3 rounded-full hover:scale-105 transition-all duration-700'
            >
              <img className='w-5' src={assets.credit_star} alt="credit" />
              <p className='text-xs sm:text-sm font-medium text-gray-600'>Credit left : {credit}</p>
            </button>

            <p className='text-gray-600 max-sm:hidden pl-4'>Hi, {user.name}</p>

            {/* Profile dropdown trigger */}
            <img
              src={assets.profile_icon}
              alt="user"
              className='w-10 drop-shadow cursor-pointer'
              onClick={toggleMenu}
            />

            {/* Dropdown menu */}
            {isMenuOpen && (
              <div className='absolute top-16 right-0 z-10 text-black rounded'>
                <ul className='list-none m-0 p-2 bg-white rounded-md border text-sm shadow-lg'>
                  <li className='py-1 px-2 cursor-pointer pr-10' onClick={handleLogout}>
                    Logout
                  </li>
                </ul>
              </div>
            )}
          </div>
        ) : (
          <div className='flex items-center gap-2 sm:gap-5'>
            <p className='cursor-pointer' onClick={() => navigate("/buy-credit")}>Pricing</p>
            <button
              className='bg-zinc-800 text-white px-7 py-2 sm:px-10 text-sm rounded-full'
              onClick={() => setShowLogin(true)}
            >
              Login
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
