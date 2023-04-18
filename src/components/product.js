import React from "react";
import { Link, useNavigate } from 'react-router-dom';

const Product = ({ product, isLoggedIn }) => {

  const navigate = useNavigate()

  const handleEditButton = () => {
    navigate(`/editproduct/${product._id}`);
  }

  const handleDeleteButton = () => {
    navigate(`/delete/${product._id}`);
  }
  
  return (
    <div className="max-w-sm rounded-md 
    dark:bg-slate-800
    shadow-lg shadow-slate-600 my-4">
      <img
        className=" h-48 w-52 rounded-md object-cover"
        src={product.image}
        alt={product.name}
      />
      <div className="pl-2 py-2 inline-block">
        <div className="font-semibold text-lg mb-2
         inline max-w-48">{product.name}</div>
        {/*<p className="text-gray-700 text-base mb-2">{product.description.slice(0,12)}...</p>
        */}<p className="text-gray-700 font-semibold
         text-base mb-2 dark:text-white">${product.price}</p>
      </div>
      <div className="px-2 py-2">
        {isLoggedIn ? (
          <div className="flex justify-around" >
            <button className="inline-block px-2
            py-1 text-indigo-700" 
            onClick={handleEditButton} >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
              </svg>
            </button>
            <button className="inline-block px-2 
            py-1 text-red-800"
            onClick={handleDeleteButton} >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
              <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z"/>
              <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z"/>
              </svg>
              </button> 
          </div> ) : (
            
          
        <Link to={`product/${product._id}`}>
        <button className="bg-indigo-700 hover:bg-blue-700
         text-white font-bold py-2 px-6 rounded-md text-sm ">
          Buy
        </button>
        </Link>
        )
        }
      </div>
    </div>
  );
};

export default Product;
