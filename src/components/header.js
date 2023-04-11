// Header.js
import React from 'react';
import { Link } from 'react-router-dom';
import { DarkModeSwitch } from 'react-toggle-dark-mode';

function Header({ handleDarkModeToggle, cartItems,
darkMode, setDarkMode }) {

  //const [isDarkMode, setDarkMode] = React.useState(false);

  const toggleDarkMode = (checked) => {
    setDarkMode(checked);
  };

  return (
    <nav className=" sticky top-0 z-100 bg-rose-700 shadow-md shadow-slate-100
    bg-cyan-800  flex-shrink-0 text-white
    shadow-sm dark:bg-slate-900 " >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <Link to="/" className=" font-bold" >My Ecommerce Site</Link>
          </div>

          <div className=" w-8 h-8" >
              < DarkModeSwitch
                
                checked={darkMode}
                onChange={toggleDarkMode}
                size={25}
                sunColor="white"
              
              />
          </div>

          <div className="flex items-center">
            <Link to="/cart" className=" mr-6 ">
            <div className="inline-block" >
              <div className="inline-block" >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-cart-fill" viewBox="0 0 16 16">
                  <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
                </svg>
              </div>
              {
                cartItems.length > 0 && (
                  <span className="inline-block text-xs px-1 rounded-full 
                  -mt-4 bg-red-600 -mr-4
                  " >
                    {cartItems.length}
                  </span>
                )
              }

            </div>
            </Link>
            
            
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Header;
