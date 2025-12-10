import React, { useState } from "react";
import {
  Trash2,
  Plus,
  Minus,
  CreditCard,
  Smartphone,
  Home,
} from "lucide-react";
import { useCart } from "./CartContext";

export default function CartPage() {
  const { cart, updateQty, removeItem } = useCart();
  const [showPayment, setShowPayment] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("card");

  const subtotal = cart.reduce((t, i) => t + i.price * i.qty, 0);
  const shipping = subtotal ? 99 : 0;
  const total = subtotal + shipping;

  return (
    <div className="min-h-screen bg-black text-white p-6 flex justify-center relative">
      <div className="w-full max-w-4xl space-y-8">
        <h1 className="text-3xl font-semibold">Your Cart</h1>

        {/* Cart Items */}
        <div className="space-y-4">
          {cart.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between p-4 border border-white/10 rounded-xl bg-white/5 hover:bg-white/10 transition">
              <div className="flex items-center gap-4">
                <img
                  src={item.image}
                  className="w-20 h-20 rounded-lg object-cover border border-white/10"
                />
                <div>
                  <h2 className="font-medium text-lg">{item.title}</h2>
                  <p className="text-gray-400 text-sm">
                    ₹ {item.price.toLocaleString()}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                {/* Qty */}
                <div className="flex items-center gap-2 border border-white/20 rounded-lg px-3 py-1 text-white">
                  <button onClick={() => updateQty(item.id, -1)}>
                    <Minus size={16} />
                  </button>
                  <span>{item.qty}</span>
                  <button onClick={() => updateQty(item.id, 1)}>
                    <Plus size={16} />
                  </button>
                </div>

                {/* Delete */}
                <button
                  onClick={() => removeItem(item.id)}
                  className="opacity-60 hover:opacity-100">
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}

          {cart.length === 0 && (
            <p className="text-center text-gray-400">Your cart is empty.</p>
          )}
        </div>

        {/* Summary */}
        <div className="p-6 border border-white/10 rounded-xl space-y-3 bg-white/5">
          <h2 className="text-xl font-semibold mb-2">Order Summary</h2>

          <div className="flex justify-between text-gray-300">
            <span>Subtotal</span>
            <span>₹ {subtotal.toLocaleString()}</span>
          </div>

          <div className="flex justify-between text-gray-300">
            <span>Shipping</span>
            <span>₹ {shipping}</span>
          </div>

          <div className="border-t border-white/10 pt-3 flex justify-between font-medium text-lg">
            <span>Total</span>
            <span>₹ {total.toLocaleString()}</span>
          </div>

          {/* Checkout Button */}
          <button
            onClick={() => setShowPayment(true)}
            className="w-full mt-3 py-3 bg-white text-black rounded-lg text-center font-medium hover:bg-gray-200 transition">
            Checkout
          </button>
        </div>
      </div>
      {/* ----------------------------------------------------------------------------------------------------------------------------------- */}
      {/* Slide-in Payment Panel */}
      <div
        className={`fixed top-0 right-0 h-full w-full md:w-1/2 bg-black border-l border-white/10 shadow-2xl transform transition-transform duration-300 ${
          showPayment ? "translate-x-0" : "translate-x-full"
        } flex flex-col p-6 z-50 text-white`}>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">Payment</h2>
          <button
            onClick={() => setShowPayment(false)}
            className="text-white font-bold text-xl">
            ×
          </button>
        </div>

        <div className="flex-1 overflow-y-auto space-y-6">
          {/* Order Summary */}
          <div className="border border-white/10 rounded-xl p-4 bg-white/5">
            <h3 className="font-semibold mb-2">Order Summary</h3>

            <div className="flex justify-between text-gray-300">
              <span>Subtotal</span>
              <span>₹ {subtotal.toLocaleString()}</span>
            </div>

            <div className="flex justify-between text-gray-300">
              <span>Shipping</span>
              <span>₹ {shipping}</span>
            </div>

            <hr className="my-2 border-white/10" />

            <div className="flex justify-between font-semibold text-lg">
              <span>Total</span>
              <span>₹ {total.toLocaleString()}</span>
            </div>
          </div>

          {/* Payment Methods */}
          <div className="border border-white/10 rounded-xl p-4 space-y-4 bg-white/5">
            <h3 className="font-semibold mb-3 text-center">
              Choose Payment Method
            </h3>

            {/* Method Buttons */}
            <div className="flex justify-center gap-2">
              <button
                onClick={() => setPaymentMethod("card")}
                className={`px-3 py-1 flex items-center gap-1 border rounded-lg transition ${
                  paymentMethod === "card"
                    ? "bg-white text-black"
                    : "border-white/20 bg-white/5"
                }`}>
                <CreditCard size={16} /> Card
              </button>

              <button
                onClick={() => setPaymentMethod("upi")}
                className={`px-3 py-1 flex items-center gap-1 border rounded-lg transition ${
                  paymentMethod === "upi"
                    ? "bg-white text-black"
                    : "border-white/20 bg-white/5"
                }`}>
                <Smartphone size={16} /> UPI
              </button>

              <button
                onClick={() => setPaymentMethod("cod")}
                className={`px-3 py-1 flex items-center gap-1 border rounded-lg transition ${
                  paymentMethod === "cod"
                    ? "bg-white text-black"
                    : "border-white/20 bg-white/5"
                }`}>
                <Home size={16} /> COD
              </button>
            </div>

            {/* CARD FORM */}
            {paymentMethod === "card" && (
              <div className="space-y-3 p-3 border border-white/10 rounded-lg bg-white/5">
                <input
                  type="text"
                  placeholder="Cardholder Name"
                  className="w-full p-2 bg-black/20 border border-white/10 rounded-lg text-white placeholder-gray-500"
                />
                <input
                  type="text"
                  placeholder="Card Number"
                  className="w-full p-2 bg-black/20 border border-white/10 rounded-lg text-white placeholder-gray-500"
                />
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    placeholder="MM/YY"
                    className="p-2 bg-black/20 border border-white/10 rounded-lg text-white placeholder-gray-500"
                  />
                  <input
                    type="text"
                    placeholder="CVV"
                    className="p-2 bg-black/20 border border-white/10 rounded-lg text-white placeholder-gray-500"
                  />
                </div>
              </div>
            )}

            {/* UPI FORM */}
            {paymentMethod === "upi" && (
              <div className="space-y-3 p-3 border border-white/10 rounded-lg bg-white/5">
                <input
                  type="text"
                  placeholder="Enter UPI ID (example@bank)"
                  className="w-full p-2 bg-black/20 border border-white/10 rounded-lg text-white placeholder-gray-500"
                />
              </div>
            )}

            {/* COD */}
            {paymentMethod === "cod" && (
              <div className="p-3 text-center text-sm border border-white/10 rounded-lg bg-white/5 text-gray-300">
                Cash on Delivery is available for your location.
              </div>
            )}

            <button className="w-full py-3 bg-white text-black rounded-lg font-semibold hover:bg-gray-200 transition">
              Pay ₹ {total.toLocaleString()}
            </button>
          </div>
        </div>
      </div>

      {/* Overlay */}
      {showPayment && (
        <div
          onClick={() => setShowPayment(false)}
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
        />
      )}
    </div>
  );
}
