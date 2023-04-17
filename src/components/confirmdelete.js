// SingleProduct.js
import React, {useState} from 'react';
import { useParams,  useNavigate } from 'react-router-dom';
//import productsData from '../productsData';

function SingleProduct({products, isLoggedIn,
toggleFetch, setToggleFetch }) {
  const { _id } = useParams();
  const product = products.find((p) => p._id.toString() === _id);
  const navigate = useNavigate();

  //const [loading, setLoading] = useState(false);
  const [updated, setUpdated] = useState(false);
  const [isError, setIsError] = useState(false);
  
  const handleDelete = () => {
    fetch(`https://mystore-backend-1xri.onrender.com/delete/${product._id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
      })
      .then(res => res.json())
      .then(res => {
        if (res.res === "deleted") {
          setUpdated(true);
          setToggleFetch(!toggleFetch);
        }
        else if (res.res === "failed") {
          setIsError(true);
        }
      })
      .catch(error => setIsError(true))
      .finally(() => {
        setTimeout(() => {
          setUpdated(false);
          setIsError(false);
          navigate("/");
        }, 3000)
      })
  }

  if (!isLoggedIn) {
    return navigate("/login");
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
      {product && (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <img src={product.image} alt={product.name} className="w-full h-64 object-cover mb-4" />
        </div>
        <div>
        {isError && (<p className="text-red-700 
      font-semibold text-center
      text-medium">Failed to delete, try again</p>)}
      
      {updated && (<p className="text-green-700
       font-semibold text-center
      text-medium">product deleted successfully</p>)}
          <h1 className="text-2xl font-bold mb-2">{product.name}</h1>
          <p className="text-gray-700 dark:text-gray-300 mb-2">{product.category}</p>
          <p className="text-gray-700 dark:text-gray-300 font-bold mb-4">{product.price}</p>
          <p className="text-gray-700 dark:text-gray-300 mb-4">{product.description}</p>
          <div>
          
          <button
            onClick={handleDelete}
            className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          >
            Confirm Delete
          </button>
          
          </div>
        </div>
      </div>
      )}
    </div>
  );
}

export default SingleProduct;
