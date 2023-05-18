import { useState } from "react";
import { useNavigate } from "react-router-dom";

function LoginPage({ onLogin, setToken }) {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const navigate = useNavigate();

	

	const handleSubmit = (e) => {
		e.preventDefault();

		fetch("https://mystore-backend-1xri.onrender.com/login", {
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
				return ({ statusCode, data }); // Parse JSON and return as object
			})
			.then(({ statusCode, data }) => {
				console.log(statusCode);
				if (
					statusCode === 400 ||
					statusCode === 500 ||
					statusCode === 404 ||
					statusCode === 401
				) {
					setError(data.error);
				} else if (statusCode === 200) {
					setToken(data.data);
					localStorage.setItem("token", data.data);
					navigate("/");
				}
			})
			.catch((err) => {
				setError("There was an error logging in");
			});
	};

	const handleSignUp = () => {
		// Redirect to the sign-up page
		navigate("/signup");
	};

	return (
		<section className="flex justify-center p-4 mt-16">
			<div className="w-full max-w-md p-6 rounded-md bg-gray-100">
				<h1
					className="font-bold text-lg text-black
    mb-4"
				>
					Log In
				</h1>
				{error && <p className="text-red-500">{error}</p>}
				<form
					onSubmit={handleSubmit}
					className="space-y-4"
				>
					<div>
						<label
							htmlFor="email"
							className="block font-medium text-gray-700"
						>
							Email:
						</label>
						<input
							type="text"
							id="email"
							className="block w-full border-gray-300 dark:bg-slate-600
          rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
					</div>
					<div>
						<label
							htmlFor="password"
							className="block font-medium text-gray-700"
						>
							Password:
						</label>
						<input
							type="password"
							id="password"
							className="block w-full border-gray-300 dark:bg-slate-600
          rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
					</div>
					{/*error && <p className="text-red-500">{error}</p>*/}
					<div className="flex justify-between">
						<button
							type="submit"
							className="inline-flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
						>
							Login
						</button>
						<button
							type="button"
							onClick={handleSignUp}
							className="inline-flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
						>
							New user? Sign up
						</button>
					</div>
				</form>
			</div>
		</section>
	);
}
export default LoginPage;
