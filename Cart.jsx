import React, { useContext } from "react";
import { CartContext } from "./CartContext";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const {
    cartItems,
    addToCart,
    decreaseQuantity,
    removeFromCart,
    clearCart,
  } = useContext(CartContext);

  const navigate = useNavigate();

  const totalItems = cartItems.reduce((count, item) => count + item.quantity, 0);
  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const discount = subtotal >= 3000 ? 200 : 0;
  const finalTotal = subtotal - discount;

  const handlePlaceOrder = () => {
    alert("Order Placed Successfully!");
    clearCart();
    navigate("/");  // Redirect to home page after placing order
  };

  return (
    <div className="p-4 md:p-10 min-h-screen bg-gradient-to-br from-gray-100 via-white to-gray-200">
      <h2 className="text-2xl md:text-4xl font-extrabold mb-6 text-center text-gray-900 tracking-wide">
        🛒 Your Cart
      </h2>

      {cartItems.length === 0 ? (
        <p className="text-center text-gray-600 text-lg italic">
          Your cart is empty.
        </p>
      ) : (
        <div className="max-w-5xl mx-auto space-y-8">
          {/* Cart Items */}
          <ul className="space-y-6">
            {cartItems.map((item) => (
              <li
                key={`${item.id}-${item.size || "default"}`}
                className="flex flex-col md:flex-row items-center gap-6 border-b pb-6 transition-shadow hover:shadow-lg rounded-lg bg-white p-4"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-28 h-28 object-cover rounded-md border shadow-sm"
                />
                <div className="flex-1 text-center md:text-left">
                  <h3 className="font-semibold text-xl text-gray-900">{item.name}</h3>
                  {item.size && (
                    <p className="text-sm text-gray-600 mt-1">Size: {item.size}</p>
                  )}
                  <p className="text-gray-700 mt-2 font-semibold">
                    Price: ₹ {item.price.toLocaleString()}
                  </p>

                  {/* Quantity Controls */}
                  <div className="flex justify-center md:justify-start items-center gap-3 mt-3">
                    <button
                      onClick={() => decreaseQuantity(item)}
                      className="bg-gray-300 text-gray-800 px-3 py-1 rounded-md hover:bg-gray-400 transition"
                      aria-label="Decrease quantity"
                    >
                      −
                    </button>
                    <span className="text-md font-semibold px-3">{item.quantity}</span>
                    <button
                      onClick={() => addToCart(item)}
                      className="bg-indigo-600 text-white px-3 py-1 rounded-md hover:bg-indigo-700 transition"
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Subtotal & Remove */}
                <div className="text-center md:text-right mt-4 md:mt-0">
                  <p className="text-lg font-semibold text-gray-800">
                    ₹ {(item.price * item.quantity).toLocaleString()}
                  </p>
                  <button
                    className="text-red-600 text-sm underline mt-2 hover:text-red-800 transition"
                    onClick={() => removeFromCart(item.id)}
                    aria-label="Remove item"
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>

          {/* Payment Slip / Order Summary */}
          <div className="p-8 bg-white shadow-xl rounded-lg border border-gray-300">
            <h3 className="text-2xl font-extrabold mb-6 text-gray-900">🧾 Payment Slip</h3>
            <div className="space-y-3 text-gray-800 font-medium text-lg">
              <p>
                Total Items: <span className="font-bold">{totalItems}</span>
              </p>
              <p>
                Subtotal: <span className="font-bold">₹ {subtotal.toLocaleString()}</span>
              </p>
              <p className="text-green-700">
                Discount: <span className="font-bold">₹ {discount.toLocaleString()}</span>
              </p>
              <hr className="my-5 border-gray-300" />
              <p className="text-2xl font-extrabold">
                Grand Total: ₹ {finalTotal.toLocaleString()}
              </p>

              <p className="text-sm text-gray-500 mt-3 italic">
                * ₹200 discount applied for orders above ₹3000.
              </p>

              {/* Payment Method */}
              <div className="mt-6">
                <label className="block font-semibold mb-2 text-gray-900">
                  Payment Method:
                </label>
                <select className="border border-gray-300 rounded px-4 py-3 w-full text-gray-900 text-lg focus:outline-none focus:ring-2 focus:ring-indigo-500">
                  <option value="cod">Cash on Delivery</option>
                  <option value="upi">UPI / Wallet</option>
                  <option value="card">Credit / Debit Card</option>
                </select>
              </div>

              <button
                onClick={handlePlaceOrder}
                className="mt-8 w-full bg-green-600 hover:bg-green-700 text-white py-4 rounded-lg font-extrabold text-xl tracking-wide shadow-md transition-transform transform hover:scale-105 active:scale-95"
              >
                Place Order
              </button>

              <button
                onClick={clearCart}
                className="mt-4 w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded font-semibold shadow-sm transition hover:shadow-md"
              >
                Clear Cart
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
