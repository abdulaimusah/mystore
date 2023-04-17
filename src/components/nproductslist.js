import React, { useState } from 'react';
import Product from './product';

const ProductList = ({ products, isLoggedIn }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handleMinPriceChange = (event) => {
    setMinPrice(event.target.value);
  };

  const handleMaxPriceChange = (event) => {
    setMaxPrice(event.target.value);
  };

  const filteredProducts = products.filter((product) => {
    const searchMatch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) /*||
      product.category.toLowerCase().includes(searchTerm.toLowerCase()) */;

    const categoryMatch =
      selectedCategory === 'all' || product.category === selectedCategory;

    const priceMatch =
      (!minPrice || product.price >= minPrice) &&
      (!maxPrice || product.price <= maxPrice);

    return searchMatch && categoryMatch && priceMatch;
  });

  return (
    <div className="flex gap-6 mt-6 flex-wrap">
      <div className="flex flex-col px-4 md:h-3/5 py-4
      md:sticky md:top-20 md:z-10" >
      <div className="text-black">
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="w-full px-3 py-2 border rounded-md shadow-sm mb-4 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>
      <div className="">
        <select
          value={selectedCategory}
          onChange={handleCategoryChange}
          className="w-full px-3 py-2 border rounded-md shadow-sm 
          dark:text-black
          mb-4 placeholder-gray-500 focus:outline-none focus:ring-2 
          focus:ring-blue-500 focus:border-transparent"
        >
          <option value="all">All categories</option>
          <option value="electronics">Electronics</option>
          <option value="clothing">Clothing</option>
          <option value="beauty">Beauty</option>
        </select>
      </div>
      <div className="">
        <input
          type="number"
          placeholder="Min price"
          value={minPrice}
          onChange={handleMinPriceChange}
          className="w-full px-3 py-2 border rounded-md shadow-sm mb-4 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>
      <div className="">
        <input
          type="number"
          placeholder="Max price"
          value={maxPrice}
          onChange={handleMaxPriceChange}
          className="w-full px-3 py-2 border rounded-md shadow-sm mb-4 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>
      </div>
      <div className="flex md:w-2/3 px-4 flex-wrap 
      gap-6 justify-around items-center" >
      {filteredProducts.map((product) => (
        <Product key={product._id} product={product}
        isLoggedIn={isLoggedIn} />
      ))}
      </div>
    </div>
  );
};

export default ProductList;
