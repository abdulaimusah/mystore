import React from "react";
import CartItem from "./cartitem";
import { Link } from 'react-router-dom';

function CartPage({ cartItems, handleQuantityUpdate, handleRemoveItem }) {
  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );


  return (
    <div className="container mx-auto my-8">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>
      {cartItems.length === 0 ? (
        <p className="text-lg text-gray-500">Your cart is empty.</p>
      ) : (
        <>
          {cartItems.map((item) => (
            <CartItem
              key={item.id}
              item={item}
              handleQuantityUpdate={handleQuantityUpdate}
              handleRemoveItem={handleRemoveItem}
            />
          ))}
          {cartItems.length > 0 && (
          <div>
          <div className="flex justify-end items-center mt-8">
            <div className="text-xl font-bold mr-4">Total:</div>
            <div className="text-xl font-bold">${totalPrice.toFixed(2)}</div>
          </div>
          <div className="flex  justify-between mx-4 mt-8">
            <div  >
             <Link to="/">
              <button className="bg-green-700 text-white py-2 px-4 rounded hover:bg-green-600">
              Continue Shopping
              </button>
             </Link>
            </div>
            <div>
             <Link to="/checkout">
              <button className="bg-indigo-600 mb-2 text-white py-2 px-4 rounded hover:bg-blue-600">
              Checkout
              </button>
             </Link>
            </div>
          
          </div>
          </div>
          )}
        </>
      )}
    </div>
  );
}

export default CartPage;
