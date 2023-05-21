import React, { useState } from "react";
import Product from "./product";

const ProductList = ({ products, isLoggedIn, isError, isLoading }) => {
	const [searchTerm, setSearchTerm] = useState("");
	const [selectedCategory, setSelectedCategory] = useState("all");
	const [minPrice, setMinPrice] = useState("");
	const [maxPrice, setMaxPrice] = useState("");

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
		const searchMatch = product.name
			.toLowerCase()
			.includes(searchTerm.toLowerCase()); /*||
      product.category.toLowerCase().includes(searchTerm.toLowerCase()) */

		const categoryMatch =
			selectedCategory === "all" || product.category === selectedCategory;

		const priceMatch =
			(!minPrice || product.price >= minPrice) &&
			(!maxPrice || product.price <= maxPrice);

		return searchMatch && categoryMatch && priceMatch;
	});

	return (
		<div className="flex gap-6 mt-6 flex-wrap">
			<div
				className="flex flex-col px-4 md:h-3/5 py-4
      md:sticky md:top-24 md:z-10"
			>
				<div className="text-black">
					<input
						type="text"
						placeholder="Search products..."
						value={searchTerm}
						onChange={handleSearchChange}
						className="w-full px-3 py-2 border rounded-md shadow-sm mb-4 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
					/>
				</div>
				<p className="text-lg font-semibold dark:text-white pt-4 pb-2">
					Filter by price
				</p>
				{/*
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
        </div> */}
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
			<div
				className="flex md:w-2/3 px-4 flex-wrap 
      gap-6 justify-around items-center"
			>
				{!isLoading &&
					filteredProducts.map((product) => (
						<Product
							key={product._id}
							product={product}
							isLoggedIn={isLoggedIn}
						/>
					))}
				{isLoading && (
					<p>
						<div class="text-center">
							<div role="status">
								<svg
									aria-hidden="true"
									class="inline w-8 h-8 md:w-12 md:h-12 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
									viewBox="0 0 100 101"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
										fill="currentColor"
									/>
									<path
										d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
										fill="currentFill"
									/>
								</svg>
								<span class="sr-only">Loading...</span>
							</div>
						</div>
					</p>
				)}
				{isError && !isLoading && <p>...There was an error loading data</p>}
			</div>
		</div>
	);
};

export default ProductList;
