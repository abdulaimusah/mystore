import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/header";
import Footer from "./components/footer";
import ProductsList from "./components/nproductslist";
import SingleProduct from "./components/singleproduct";
import Cart from "./components/cart";
import Checkout from "./components/checkout";
import AddProduct from "./components/addproduct";
import LoginPage from "./components/login";
import SignUpPage from "./components/signup";
import EditProductForm from "./components/editproduct";
import ConfirmDelete from "./components/confirmdelete";

function App() {
	const [isLoggedIn, setIsLoggedIn] = useState(false);

	const [darkMode, setDarkMode] = useState(false);
	const [products, setProducts] = useState([]);
	const [cartItems, setCartItems] = useState([]);
	const [toggleFetch, setToggleFetch] = useState(false);
	const [isError, setIsError] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [token, setToken] = useState(localStorage.token && localStorage.token);

	const onLogin = () => {
		setIsLoggedIn(true);
	};

	useEffect(() => {
		token &&
			fetch("https://mystore-backend-1xri.onrender.com/authenticate", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Accept: "application/json",
					Authorization: `Bearer ${token}`,
				},
			})
				.then(async (res) => {
					const statusCode = res.status; // Capture the status code
					const data = await res.json();
					return { statusCode, data }; // Parse JSON and return as object
				})
				.then(({ data, statusCode }) => {
					if (statusCode === 401) {
						setIsLoggedIn(false);
						localStorage.removeItem("token");
					} else if (statusCode === 200) {
						setIsLoggedIn(true);
					}
				})
				.catch((err) => {
					console.log(err);
				});
	});

	useEffect(() => {
		const fetchProducts = async () => {
			setIsLoading(true);
			fetch("https://mystore-backend-1xri.onrender.com/products")
				.then((res) => res.json())
				.then((res) => setProducts(res.data.reverse()))
				.catch((err) => setIsError(true))
				.finally(() => setIsLoading(false));
		};

		fetchProducts();
	}, [toggleFetch]);

	useEffect(() => {
		const storedCartItems = JSON.parse(localStorage.getItem("cartItems"));
		if (storedCartItems) {
			setCartItems(storedCartItems);
		}
	}, []);

	useEffect(() => {
		localStorage.setItem("cartItems", JSON.stringify(cartItems));
	}, [cartItems]);

	const handleAddToCart = (product, quantity) => {
		const existingCartItem = cartItems.find((item) => item._id === product._id);
		if (existingCartItem) {
			setCartItems(
				cartItems.map((item) =>
					item._id === product._id
						? { ...item, quantity: item.quantity + quantity }
						: item,
				),
			);
		} else {
			setCartItems([...cartItems, { ...product, quantity }]);
		}
	};

	const handleQuantityUpdate = (_id, quantity) => {
		setCartItems(
			cartItems.map((item) =>
				item._id === _id ? { ...item, quantity } : item,
			),
		);
	};

	const handleRemoveItem = (_id) => {
		setCartItems(cartItems.filter((item) => item._id !== _id));
	};

	const handleDarkModeToggle = () => {
		setDarkMode(!darkMode);
	};

	const cartTotal = cartItems.reduce(
		(acc, item) => acc + item.price * item.quantity,
		0,
	);

	return (
		<Router>
			<div className={`${darkMode ? "dark" : ""}`}>
				<div
					className={`
			min-h-screen flex 
			flex-col dark:bg-slate-700
			 `}
				>
					<Header
						darkMode={darkMode}
						handleDarkModeToggle={handleDarkModeToggle}
						cartItems={cartItems}
						setDarkMode={setDarkMode}
						isLoggedIn={isLoggedIn}
						setToken={setToken}
						setIsLoggedIn={setIsLoggedIn}
					/>
					<div
						className="flex-grow dark:bg-slate-700 
        dark:text-white px-2 md:px-4 mt-8"
					>
						<Routes>
							<Route
								index
								element={
									<ProductsList
										products={products}
										isLoggedIn={isLoggedIn}
										isError={isError}
										isLoading={isLoading}
										onAddToCart={handleAddToCart}
									/>
								}
							/>
							<Route
								path="/product/:_id"
								element={
									<SingleProduct
										products={products}
										handleAddToCart={handleAddToCart}
									/>
								}
							/>
							<Route
								path="/cart"
								element={
									<Cart
										cartItems={cartItems}
										handleQuantityUpdate={handleQuantityUpdate}
										handleRemoveItem={handleRemoveItem}
									/>
								}
							/>
							<Route
								path="/checkout"
								element={
									<Checkout
										cartItems={cartItems}
										cartTotal={cartTotal}
									/>
								}
							/>
							<Route
								path="/addproduct"
								element={
									<AddProduct
										token={token}
										isLoggedIn={isLoggedIn}
										toggleFetch={toggleFetch}
										setToggleFetch={setToggleFetch}
									/>
								}
							/>
							<Route
								path="/editproduct/:_id"
								element={
									<EditProductForm
										token={token}
										products={products}
										isLoggedIn={isLoggedIn}
										toggleFetch={toggleFetch}
										setToggleFetch={setToggleFetch}
									/>
								}
							/>
							<Route
								path="/delete/:_id"
								element={
									<ConfirmDelete
										token={token}
										products={products}
										isLoggedIn={isLoggedIn}
										toggleFetch={toggleFetch}
										setToggleFetch={setToggleFetch}
									/>
								}
							/>
							<Route
								path="/login"
								token={token}
								element={
									<LoginPage
										onLogin={onLogin}
										setToken={setToken}
									/>
								}
							/>
							<Route
								path="/signup"
								element={<SignUpPage setToken={setToken} />}
							/>
						</Routes>
					</div>
					<Footer />
				</div>
			</div>
		</Router>
	);
}

export default App;
