import React, { useState } from 'react';
import Cards from 'react-credit-cards';
import 'react-credit-cards/es/styles-compiled.css';

const CheckoutPage = ({ cartItems }) => {
  const [cardNumber, setCardNumber] = useState('');
  const [cardHolder, setCardHolder] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const [focus, setFocus] = useState('');

  // Function to add space after every four digits in card input
  const handleCardNumberChange = (e) => {
    let value = e.target.value;
    value = value.replace(/\s/g, '').replace(/(\d{4})/g, '$1 ').trim();
    setCardNumber(value);
  };

  // Function to handle card holder name
  const handleCardHolderChange = (e) => {
    let value = e.target.value;
    setCardHolder(value);
  }

  // Function to add slash in expiry date input
  const handleExpiryChange = (e) => {
    let input = e.target.value;
    if (input.length > 2) {
      input = input.replace(/[^0-9]/g, ""); // remove all non-numeric characters
      input = input.slice(0, 2) + "/" + input.slice(2); // add slash after 2nd character
    }
    setExpiry(input);
  };

  const handleExpiryDateKeyDown = (event) => {
    // delete slash character if user deletes third digit
    if (event.key === "Backspace" && expiry.length === 3) {
      setExpiry(expiry.slice(0, 2));
    }
  };

  // Function to display credit card type
  const getCardType = (number) => {
    const firstDigit = parseInt(number.substring(0, 1));
    switch (firstDigit) {
      case 3:
        return 'amex';
      case 4:
        return 'visa';
      case 5:
        return 'mastercard';
      default:
        return 'unknown';
    }
  };

  // Calculate total amount and total cartItems
  const totalAmount = cartItems.reduce((acc, product) => acc + product.price, 0);
  const totalcartItems = cartItems.length;

  return (
    <div className="w-full md:w-1/2 mx-auto px-4 py-8">
  <h1 className="text-2xl font-bold mb-8">Checkout</h1>
  <Cards
    cvc={cvv}
    expiry={expiry}
    focused={focus}
    name={cardHolder}
    number={cardNumber}
    preview
  />

  <div className="mb-4 md:mb-2 ">
    <label
      htmlFor="cardHolder"
      className="block text-gray-700 font-bold mb-2"
    >
      Card Holder Name
    </label>
    <input
      type="text"
      name="cardHolder"
      id="cardHolder"
      value={cardHolder}
      onChange={handleCardHolderChange}
      onFocus={(e) => setFocus(e.target.name)}
      onBlur={() => setFocus('')}
      placeholder="Card Holder Name"
      className="w-full px-3 py-2 rounded border-2 focus:border-green-400 transition-all duration-300 hover:border-green-400"
    />
  </div>

  <div className="mb-4 md:mb-2">
    <label
      htmlFor="cardNumber"
      className="block text-gray-700 font-bold mb-2"
    >
      Card Number
    </label>
    <input
      type="tel"
      name="cardNumber"
      id="cardNumber"
      value={cardNumber}
      onChange={handleCardNumberChange}
      onFocus={(e) => setFocus(e.target.name)}
      onBlur={() => setFocus('')}
      className="w-full px-3 py-2 rounded border-2 focus:border-green-400 transition-all duration-300 hover:border-green-400"
    />
  </div>

  <div className="mb-4 md:mb-2">
    <label htmlFor="expiry" className="block text-gray-700 font-bold mb-2">
      Expiry
    </label>
    <input
      type="tel"
      name="expiry"
      id="expiry"
      maxLength="5"
      placeholder="MM/YY"
      value={expiry}
      onChange={handleExpiryChange}
      onFocus={(e) => setFocus(e.target.name)}
      onBlur={() => setFocus('')}
      onKeyDown={handleExpiryDateKeyDown}
      className="w-full px-3 py-2 rounded border-2 focus:border-green-400 transition-all duration-300 hover:border-green-400"
    />
  </div>

  <div className="mb-4 md:mb-2">
    <label htmlFor="cvv" className="block text-gray-700 font-bold mb-2">
      CVV
    </label>
    <input
      type="tel"
      name="cvv"
      id="cvv"
      value={cvv}
      onChange={(e) => setCvv(e.target.value)}
      onFocus={(e) => setFocus(e.target.name)}
      onBlur={() => setFocus('')}
      className="w-full px-3 py-2 rounded border-2 focus:border-green-400 transition-all duration-300 hover:border-green-400"
    />
  </div>

  <p className="mb-2">Card type: {getCardType(cardNumber)}</p>
  <p className="mb-2">Total amount: ${totalAmount.toFixed(2)}</p>
  <p className="mb-2">Total cartItems: {totalcartItems}</p>

  <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">
    Checkout
  </button>
  </div>
  );
};

export default CheckoutPage;
