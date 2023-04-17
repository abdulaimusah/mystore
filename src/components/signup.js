import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignUpPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
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
      body: JSON.stringify({ username }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then( res => res.json() )
      .then((res) => {
        if (res.res === "user found") {
          setError("Username already exists");
        }
        else {

            // Send signup data to API
    fetch("https://mystore-backend-1xri.onrender.com/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          //console.log(data);
          // Optionally reset form fields
          setUsername("");
          setPassword("");
          setConfirmPassword("");
          // Navigate to login page on successful signup
          navigate("/login");
        })
        .catch((error) => {
            setError("Try again later, error signing up");
            console.error(error);
        });
    }})
   }      
      

  return (
    <div className="flex justify-center items-center h-screen">
  <form onSubmit={handleSubmit} className="w-full max-w-md">
    <h2 className="text-3xl font-bold mb-4">Sign Up</h2>
    {error && <p className="text-red-500 mb-4">{error}</p>}
    <div className="mb-4">
      <label className="block text-gray-700 font-bold mb-2" htmlFor="username">
        Username:
      </label>
      <input
        className="appearance-none border dark:bg-slate-600
        rounded w-full py-2 px-3 text-gray-700 leading-tight 
        focus:outline-none focus:shadow-outline"
        type="text"
        name="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
    </div>
    <div className="mb-4">
      <label className="block text-gray-700 font-bold mb-2" htmlFor="password">
        Password:
      </label>
      <input
        className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        type="password"
        name="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
    </div>
    <div className="mb-4">
      <label className="block text-gray-700 font-bold mb-2" htmlFor="confirm-password">
        Confirm Password:
      </label>
      <input
        className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
      Already have an account? <button type="submit"
      className="text-blue-500" onClick={() => navigate('/login')}>Log In</button>
    </p>
  </form>
  </div>

  );
}

export default SignUpPage;