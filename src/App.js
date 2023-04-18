import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, 
  Routes, Route } from "react-router-dom";
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

  
  

  const onLogin = () => {
    setIsLoggedIn(true);
  };
  

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch("https://mystore-backend-1xri.onrender.com/products");
      const data = await response.json();
      setProducts(data);
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
          item._id === product._id ? { ...item, quantity: item.quantity + quantity } : item
        )
      );
    } else {
      setCartItems([...cartItems, { ...product, quantity }]);
    }
  };

  const handleQuantityUpdate = (_id, quantity) => {
    setCartItems(
      cartItems.map((item) => (item._id === _id ? { ...item, quantity } : item))
    );
  };

  const handleRemoveItem = (_id) => {
    setCartItems(cartItems.filter((item) => item._id !== _id));
  };

  const handleDarkModeToggle = () => {
    setDarkMode(!darkMode);
  };

  const cartTotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <Router>
      
      <div className={`min-h-screen flex flex-col ${darkMode ? 
        "dark" : ""}`}>
        <Header darkMode={darkMode} handleDarkModeToggle={handleDarkModeToggle}
         cartItems={cartItems} setDarkMode={setDarkMode}
         isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
        <div className="flex-grow dark:bg-slate-700 
        dark:text-white px-2 md:px-4">
          
        <Routes>
          <Route index 
            element={
            <ProductsList products={products} isLoggedIn={isLoggedIn}
             onAddToCart={handleAddToCart} />}
          />
          <Route path="/product/:_id"
            element={
            <SingleProduct products={products} handleAddToCart={handleAddToCart} />}
          />
          <Route path="/cart"
            element={
            <Cart
              cartItems={cartItems}
              handleQuantityUpdate={handleQuantityUpdate}
              handleRemoveItem={handleRemoveItem}
            />}
          />
          <Route path="/checkout"
            element={
            <Checkout cartItems={cartItems} cartTotal={cartTotal} />}
          />
          <Route path="/addproduct" 
            element={ <AddProduct isLoggedIn={isLoggedIn}
            toggleFetch={toggleFetch}
            setToggleFetch={setToggleFetch}  />}
          />
          <Route path="/editproduct/:_id" 
            element={ <EditProductForm products={products} 
            isLoggedIn={isLoggedIn} toggleFetch={toggleFetch}
            setToggleFetch={setToggleFetch} /> }
          />
          <Route path="/delete/:_id" 
            element={ <ConfirmDelete products={products}
            isLoggedIn={isLoggedIn} toggleFetch={toggleFetch}
            setToggleFetch={setToggleFetch}  /> }
          /> 
          <Route path="/login" 
            element={ <LoginPage onLogin={onLogin} />}
          />
          <Route path="/signup" 
            element={ <SignUpPage />}
          />
        </Routes>

        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
