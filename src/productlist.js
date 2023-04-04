// ProductList.js
import React from 'react';
import { Link } from 'react-router-dom';
import productsData from './productsData';

function ProductList() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
      <h1 className="text-2xl font-bold mb-4">Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {productsData.map((product) => (
          <div key={product.id} className="bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden">
            <Link to={`/product/${product.id}`}>
              <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h2 className="text-lg font-bold mb-2">{product.name}</h2>
                <p className="text-gray-700 dark:text-gray-300 mb-2">{product.category}</p>
                <p className="text-gray-700 dark:text-gray-300 font-bold">{product.price}</p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductList;
