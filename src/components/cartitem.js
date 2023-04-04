import React from "react";

function CartItem({ item, handleQuantityUpdate, handleRemoveItem }) {
  const handleQuantityChange = (e) => {
    handleQuantityUpdate(item.id, e.target.value);
  };

  const handleRemoveClick = () => {
    handleRemoveItem(item.id);
  };

  return (
    <div className="flex items-center border-b-2 pb-4 mb-4">
      <img src={item.image} alt={item.name} className="w-16 h-16 mr-4" />
      <div>
        <h2 className="text-lg font-bold">{item.name}</h2>
        <p className="text-gray-600">${item.price.toFixed(2)}</p>
        <div className="flex items-center mt-2">
          <label htmlFor={`quantity-${item.id}`} className="mr-2">
            Quantity:
          </label>
          <select
            id={`quantity-${item.id}`}
            value={item.quantity}
            onChange={handleQuantityChange}
            className="w-16 rounded border-gray-400 border p-1"
          >
            {[...Array(10)].map((_, i) => (
              <option key={i} value={i + 1}>
                {i + 1}
              </option>
            ))}
          </select>
          <button
            onClick={handleRemoveClick}
            className="bg-red-500 text-white py-1 px-2 ml-4 rounded hover:bg-red-600"
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
}

export default CartItem;
