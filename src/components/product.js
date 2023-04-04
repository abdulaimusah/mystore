import React from "react";
import { Link } from 'react-router-dom';

const Product = ({ product }) => {
  return (
    <div className="max-w-sm rounded-md overflow-hidden 
    
    shadow-lg mx-2 my-4">
      <img
        className="w-full h-48 object-cover rounded-md "
        src={product.image}
        alt={product.name}
      />
      <div className="px-6 py-2">
        <div className="font-bold text-xl mb-2">{product.name}</div>
        {/*<p className="text-gray-700 text-base mb-2">{product.description.slice(0,12)}...</p>
        */}<p className="text-gray-700 font-semibold
         text-base mb-2">${product.price}</p>
      </div>
      <div className="px-6 py-2">
        <Link to={`product/${product.id.toString()}`}>
        <button className="bg-indigo-700 hover:bg-blue-700
         text-white font-bold py-2 px-6 rounded-md text-sm ">
          Buy
        </button>
        </Link>
      </div>
    </div>
  );
};

export default Product;
