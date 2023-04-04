import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/header";
import Footer from "./components/footer";
import ProductsList from "./components/nproductslist";
import SingleProduct from "./components/singleproduct";
import Cart from "./components/cart";
import Checkout from "./components/checkout";

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch("https://middle-9bkt.onrender.com/users/api.devtoolstech.in/ecommerce/products");
      const data = await response.json();
      setProducts(data);
    };

    fetchProducts();
  }, []);

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
    const existingCartItem = cartItems.find((item) => item.id === product.id);
    if (existingCartItem) {
      setCartItems(
        cartItems.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
        )
      );
    } else {
      setCartItems([...cartItems, { ...product, quantity }]);
    }
  };

  const handleQuantityUpdate = (id, quantity) => {
    setCartItems(
      cartItems.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };

  const handleRemoveItem = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  const handleDarkModeToggle = () => {
    setDarkMode(!darkMode);
  };

  const cartTotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <Router>
      <div className={`min-h-screen h-full flex flex-col ${darkMode ? "bg-slate-700 text-white" : "bg-white text-gray-900"}`}>
        <Header darkMode={darkMode} handleDarkModeToggle={handleDarkModeToggle} cartItems={cartItems} />
        <Routes>
          <Route index 
            element={
            <ProductsList products={products} onAddToCart={handleAddToCart} />}
          />
          <Route path="/product/:id"
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
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
