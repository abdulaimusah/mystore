import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignUpPage = ({ setToken }) => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [error, setError] = useState("");
	const [signupSuccess, setSignupSuccess] = useState(false);
	const navigate = useNavigate();

	const handleSubmit = (e) => {
		e.preventDefault();
		// Check if passwords match
		if (password !== confirmPassword) {
			setError("Passwords do not match");
			return;
		}
		// Check if the username already exists
		fetch("https://mystore-backend-1xri.onrender.com/check-username", {
			method: "POST",
			body: JSON.stringify({ username: email }),
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
			},
		})
			.then((res) => res.json())
			.then((res) => {
				if (res.res === "user found") {
					setError("Username already exists");
				} else {
					// Send signup data to API
					fetch("https://mystore-backend-1xri.onrender.com/signup", {
						method: "POST",
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify({
							email,
							password,
						}),
					})
						.then(async (res) => {
							const statusCode = res.status; // Capture the status code
							const data = await res.json();
							return { statusCode, data }; // Parse JSON and return as object
						})
						.then(({ statusCode, data }) => {
							if (statusCode === 400 || statusCode === 500) {
								setError(data.error);
							} else if (statusCode === 200) {
								setSignupSuccess(true);
								setToken(data.data);
								localStorage.setItem("token", data.data);
								// Reset form fields
								setEmail("");
								setPassword("");
								setConfirmPassword("");
								setTimeout(() => {
									navigate("/");
								}, 2200);
							}
						})
						.catch((error) => {
							setError("Try again later, error signing up");
							console.error(error);
						});
				}
			});
	};

	return (
		<div className="flex justify-center items-center h-screen">
			<form
				onSubmit={handleSubmit}
				className="w-full max-w-md"
			>
				<h2 className="text-3xl font-bold mb-4">Sign Up</h2>
				{error && <p className="text-red-500 mb-4">{error}</p>}
				{signupSuccess && (
					<p className="text-green-600 mb-4">Sign up successful</p>
				)}
				<div className="mb-4">
					<label
						className="block text-gray-700 font-bold mb-2
      dark:text-white"
						htmlFor="email"
					>
						Email:
					</label>
					<input
						className="appearance-none border dark:bg-slate-600
        rounded w-full py-2 px-3 text-gray-700 leading-tigt
        focus:outline-none focus:shadow-outline 
        dark:text-white "
						type="text"
						name="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
				</div>
				<div className="mb-4">
					<label
						className="block text-gray-700 font-bold mb-2 
      dark:text-white"
						htmlFor="password"
					>
						Password:
					</label>
					<input
						className="appearance-none border rounded w-full py-2 px-3 
        text-gray-700 leading-tight focus:outline-none 
        focus:shadow-outline dark:bg-slate-600 dark:text-white"
						type="password"
						name="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
				</div>
				<div className="mb-4">
					<label
						className="block text-gray-700 font-bold mb-2 
      dark:text-white"
						htmlFor="confirm-password"
					>
						Confirm Password:
					</label>
					<input
						className="appearance-none border rounded w-full py-2 px-3 
        text-gray-700 leading-tight focus:outline-none focus:shadow-outline
        dark:bg-slate-600 dark:text-white"
						type="password"
						name="confirm-password"
						value={confirmPassword}
						onChange={(e) => setConfirmPassword(e.target.value)}
					/>
				</div>
				<button
					type="submit"
					className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
				>
					Sign Up
				</button>
				<p className="mt-4">
					Already have an account?{" "}
					<button
						type="submit"
						className="text-blue-500"
						onClick={() => navigate("/login")}
					>
						Log In
					</button>
				</p>
			</form>
		</div>
	);
};

export default SignUpPage;
