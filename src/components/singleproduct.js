// SingleProduct.js
import React from 'react';
import { useParams, Link } from 'react-router-dom';
//import productsData from '../productsData';

function SingleProduct({products, handleAddToCart}) {
  const { _id } = useParams();
  const product = products.find((p) => p._id === _id);
  
  const addThisToCart = () => {
    handleAddToCart(product, 1)
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
      {product && (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <img src={product.image} alt={product.name} className="w-full h-64 object-cover mb-4" />
        </div>
        <div>
          <h1 className="text-2xl font-bold mb-2">{product.name}</h1>
          <p className="text-gray-700 dark:text-gray-300 mb-2">{product.category}</p>
          <p className="text-gray-700 dark:text-gray-300 font-bold mb-4">{product.price}</p>
          <p className="text-gray-700 dark:text-gray-300 mb-4">{product.description}</p>
          <div>
          <Link to="/cart">
          <button
            onClick={addThisToCart}
            className="bg-indigo-600 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          >
            Add to Cart
          </button>
          </Link>
          </div>
        </div>
      </div>
      )}
    </div>
  );
}

export default SingleProduct;
