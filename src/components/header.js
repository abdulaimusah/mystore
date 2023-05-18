// Header.js
import React from "react";
import { Link, useNavigate, useMatch } from "react-router-dom";
import { DarkModeSwitch } from "react-toggle-dark-mode";

function Header({
	handleDarkModeToggle,
	cartItems,
	darkMode,
	setDarkMode,
	isLoggedIn,
	setToken,
	token,
	setIsLoggedIn
}) {
	const navigate = useNavigate();

	//const [isDarkMode, setDarkMode] = React.useState(false);

	const toggleDarkMode = (checked) => {
		setDarkMode(checked);
	};

	const handleLogout = () => {
		setToken(null);
		localStorage.removeItem("token");
		setIsLoggedIn(false)

		
	};

	//const location = useMatch();
	//console.log(location);

	return (
		<nav
			className={` sticky top-0 z-50 bg-rose-700 relative
    bg-cyan-800  flex-shrink-0 text-white 
     ${isLoggedIn && "bg-rose-600"} 
     shadow-sm shadow-slate-500 `}
		>
			<div
				className="container mx-auto px-4 sm:px-6 lg:px-8
      shadow-sm shadow-slate-100 dark:shadow-slate-600 "
			>
				<div className="flex items-center justify-between h-12">
					<div className="flex-shrink-0">
						<Link
							to="/"
							className=" font-bold"
						>
							{isLoggedIn ? "Admin Home" : "User Home"}
						</Link>
					</div>

					<div className=" w-8 h-8">
						<DarkModeSwitch
							checked={darkMode}
							onChange={toggleDarkMode}
							size={25}
							sunColor="white"
						/>
					</div>

					<div className="flex items-center">
						{ isLoggedIn ? (
							<button
								className="inline-block
            px-2 py-1 rounded-md"
								onClick={handleLogout}
							>
								Log out
							</button>
						) : (
							<Link
								to="/cart"
								className=" mr-6 "
							>
								<div className="inline-block">
									<div className="inline-block">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width="20"
											height="20"
											fill="currentColor"
											className="bi bi-cart-fill"
											viewBox="0 0 16 16"
										>
											<path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
										</svg>
									</div>
									{cartItems.length > 0 && (
										<span
											className="inline-block text-xs px-1 rounded-full 
                  -mt-4 bg-red-600 -mr-4
                  "
										>
											{cartItems.length}
										</span>
									)}
								</div>
							</Link>
						)}
					</div>
				</div>
			</div>
			<div className="absolute z-50 inline-block top-16   left-8">
				{isLoggedIn ? (
					<button
						r
						className="inline-block
            bg-indigo-700 text-white px-4 py-1 rounded-lg my-1 ml-8"
						onClick={() => navigate("/addproduct")}
					>
						Add a product
					</button>
				) : (
					<button
						className="inline-block
              bg-indigo-700 tex-white px-4 py-1 rounded-lg "
						onClick={() => navigate("/login")}
					>
						Login/Signup as Admin
					</button>
				)}
			</div>
		</nav>
	);
}

export default Header;
