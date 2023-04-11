import React from "react";
import { Link } from 'react-router-dom';

const Product = ({ product }) => {
  return (
    <div className="max-w-sm rounded-md 
    dark:bg-slate-800
    shadow-lg shadow-slate-600 my-4">
      <img
        className=" h-48 w-auto rounded-md "
        src={product.image}
        alt={product.name}
      />
      <div className="pl-2 py-2 inline-block">
        <div className="font-semibold text-lg mb-2 inline">{product.name}</div>
        {/*<p className="text-gray-700 text-base mb-2">{product.description.slice(0,12)}...</p>
        */}<p className="text-gray-700 font-semibold
         text-base mb-2">${product.price}</p>
      </div>
      <div className="px-2 py-2">
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
