import { useState } from "react";
import { useNavigate } from "react-router-dom";

function LoginPage({ onLogin }) {
  const [username, setUsername] = useState("");
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
          username,
          password,
        }),
      })
    .then(res => res.json())
    .then(res => {
    // Check username and password here
    if (res.res === 'Authentication successful') {

      
      // If username and password are correct, call the onLogin function to update the isLoggedIn state in the parent component
      onLogin();
      navigate("/")
    } 
    else if (res.res === "failed") {
      setError("Username does not exist")
    }
    else {
        setError(res.res);

    }
})
    .catch( error => {
      // If the username is not found, show an error message and provide a sign-up option
      setError("Invalid username or password. Please try again or sign up below.");
    });

  }
  

  const handleSignUp = () => {
    // Redirect to the sign-up page
    navigate("/signup");
  };

  return (
    <section className="flex justify-center p-4 mt-16">
  <div className="w-full max-w-md p-6 rounded-md bg-gray-100">
    <h1 className="font-bold text-lg text-black
    mb-4" >Log In</h1>
    {error && <p className="text-red-500">{error}</p>}
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="username" className="block font-medium text-gray-700">Username:</label>
        <input
          type="text"
          id="username"
          className="block w-full border-gray-300 dark:bg-slate-600
          rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="password" className="block font-medium text-gray-700">Password:</label>
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
        <button type="submit" className="inline-flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
          Login
        </button>
        <button type="button" onClick={handleSignUp} className="inline-flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
          New user? Sign up
        </button>
      </div>
    </form>
  </div>
</section>

  );
}
export default LoginPage;