import React, { useState } from "react";
import { Navigate, useNavigate, } from "react-router-dom";


const CreateProductForm = ({isLoggedIn, 
toggleFetch, setToggleFetch}) => {

  const navigate = useNavigate();
  const [product, setProduct] = useState({
    name: "",
    price: "",
    description: "",
    image: "http://placeimg.com/640/480/cats",
    rating: "",
  });

  const [loading, setLoading] = useState(false);
  const [updated, setUpdated] = useState(false);
  const [isError, setIsError] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name] : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
   
    window.scrollTo({
      top: 0,
      left: 0, 
      behavior: "smooth"
    });
    
    setLoading(true);
    setProduct((prevProduct) => ({
      ...prevProduct,
      price: parseFloat(prevProduct.price),
    }));
    // Send product data to API
    fetch("https://mystore-backend-1xri.onrender.com/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify(product),
    })
    .then((response) => response.json())
    .then((data) => {
      if (data.res === "added") {
        setUpdated(true);
      
      // Optionally reset form fields
      setProduct({
        name: "",
        price: "",
        description: "",
        image: "",
        rating: "",
      });

      setTimeout(() => {
        setToggleFetch(!toggleFetch);
        navigate("/");
      },5000);
      }
      else if (data.res === "failed") {
        setIsError(true)
      }
      
    })
    .catch((error) => {
      setIsError(true);
    })
    .finally(() => {
      setTimeout( () => {
      setLoading(false);
      setIsError(false);
      setUpdated(false);
      }, 3000);
    });
  };


  

  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  return (
    <div >
    <h1 className="font-bold text-lg mt-8 mb-8 text-center">
      Add Product
    </h1>

    {isError && (<p className="text-red-700 
    font-semibold text-center
    text-medium">Failed to add product, try again</p>)}
    
    {updated && (<p className="text-green-700
     font-semibold text-center
    text-medium">product added successfully</p>)}

    { (loading && !updated) && (<p className="text-green-700
     font-semibold text-center
    text-medium">processing...</p>)}
<form onSubmit={handleSubmit} className="max-w-md mx-auto mb-12">
  <div className="mb-4">
    <label htmlFor="name" className="block mb-2 font-bold">Name:</label>
    <input
      required="true"
      type="text"
      name="name"
      id="name"
      value={product.name}
      onChange={handleChange}
      className="w-full p-2 border-2 dark:bg-slate-600
       border-blue-500 rounded-md focus:outline-none hover:border-green-500"
    />
  </div>
  <div className="mb-4">
    <label htmlFor="price" className="block mb-2 font-bold">Price:</label>
    <input
      required="true"
      type="text"
      name="price"
      id="price"
      value={product.price}
      onChange={handleChange}
      className="w-full p-2 border-2 dark:bg-slate-600
      border-blue-500 rounded-md focus:outline-none hover:border-green-500"
    />
  </div>
  <div className="mb-4">
    <label htmlFor="description" className="block mb-2 font-bold">Description:</label>
    <textarea
      required="true"
      name="description"
      id="description"
      value={product.description}
      onChange={handleChange}
      className="w-full p-2 border-2 dark:bg-slate-600
      border-blue-500 rounded-md focus:outline-none hover:border-green-500"
    />
  </div>
  <div className="mb-4">
    <label htmlFor="image" className="block mb-2 font-bold">
      Image URL: <span className="font-light" >read-only</span></label>
    <input
      defaultValue={"http://placeimg.com/640/480/cats"}
      readOnly="true"
      type="text"
      name="image"
      id="image"
      value={product.image}
      onChange={handleChange}
      className="w-full p-2 border-2 dark:bg-slate-600
      border-blue-500 rounded-md focus:outline-none hover:border-green-500"
    />
  </div>
  <div className="mb-4">
    <label htmlFor="rating" className="block mb-2 font-bold">Rating:</label>
    <input
      required="true"
      type="number"
      name="rating"
      id="rating"
      value={product.rating}
      onChange={handleChange}
      className="w-full p-2 border-2 dark:bg-slate-600
       border-blue-500 rounded-md focus:outline-none hover:border-green-500"
    />
  </div>
  <div className="text-center">
    <button
      type="submit"
      className="py-2 px-4 bg-blue-500 text-white font-bold rounded-md hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue active:bg-blue-800"
    >
      Create Product
    </button>
  </div>
</form>
</div>
  );
};

export default CreateProductForm;
