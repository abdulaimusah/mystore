// Header.js
import React from 'react';
import { Link } from 'react-router-dom';

function Header({ handleDarkModeToggle, isDarkMode }) {
  return (
    <nav className={`sticky top-0 bg-rose-700 shadow-md shadow-slate-100
     ${isDarkMode ? 'bg-cyan-800' : 'bg-gray-200'} 
    shadow-sm dark:bg-slate-900  `}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <Link to="/" className={`font-bold ${isDarkMode ? 'text-white' : 'text-black'}`}>My Ecommerce Site</Link>
          </div>
          <div className="flex items-center">
            <Link to="/cart" className={`mr-6 ${isDarkMode ? 'text-white' : 'text-black'}`}>Cart</Link>
            <button
              className="p-2 rounded-md text-white dark:text-white focus:outline-none"
              onClick={handleDarkModeToggle}
            >
              {isDarkMode ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v.01M12 18v.01M4.93 4.93l.01-.01M19.07 19.07l-.01.01M6.83 17.17l.71-.71M17.17 6.83l-.71.71M1 12h2M21 12h2M12 1v2M12 21v2" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v.01M12 18v.01M4.93 4.93l.01-.01M19.07 19.07l-.01.01M6.83 17.17a6 6 0 1 1 8.49-8.49M17.17 6.83a6 6 0 1 1-8.49 8.49" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Header;
