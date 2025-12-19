import React, { useEffect, useState } from "react";
import Spline from "@splinetool/react-spline";
import { useCart } from "./CartContext";
import api from "../api/axios";

export default function Home() {
  const [featured, setFeatured] = useState([]);
  const [email, setEmail] = useState("");
  const { addToCart } = useCart();

  // --------------------------------------------------
  // NEWSLETTER
  // --------------------------------------------------
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/api/newsLetter", { email });
      setEmail("");
    } catch (err) {
      console.error("Newsletter failed:", err);
    }
  };

  // --------------------------------------------------
  // FETCH FEATURED PRODUCTS
  // --------------------------------------------------
  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const res = await api.get("/api/featured");

        const list = res.data.products || res.data.data || res.data || [];

        // normalize MongoDB _id → id
        const normalized = list.map((item) => ({
          ...item,
          id: item._id || item.id,
        }));

        setFeatured(normalized);
      } catch (error) {
        console.error("Failed to fetch featured products:", error);
        setFeatured([]);
      }
    };

    fetchFeatured();
  }, []);

  // --------------------------------------------------
  // ADD TO CART
  // --------------------------------------------------
  const handleAdd = (product) => {
    const cartItem = {
      id: product.id,
      title: product.name,
      price: product.price,
      image: product.image,
      qty: 1,
    };

    addToCart(cartItem);
  };

  // --------------------------------------------------
  // UI
  // --------------------------------------------------
  return (
    <main className="flex flex-col items-center min-h-screen bg-black text-white px-6">
      {/* Spline */}
      <div className="w-full max-w-6xl mx-auto mb-10">
        <Spline scene="https://prod.spline.design/o9eNrUZbrQagGdEw/scene.splinecode" />
      </div>

      {/* HERO */}
      <section className="text-center -mt-5">
        <p className="text-sm tracking-widest text-gray-400 mb-4">
          MONOCHROME STORE
        </p>
        <h1 className="text-5xl font-extrabold mb-4">
          Discover Minimalist Essentials
        </h1>
        <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-8">
          Shop clean, timeless designs that fit every lifestyle — simplicity
          never goes out of style.
        </p>
      </section>

      {/* FEATURED */}
      <section
        id="shop"
        className="w-full py-24 border-t border-white/10 text-center"
      >
        <h2 className="text-3xl font-bold mb-10">Featured Products</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 max-w-6xl mx-auto">
          {featured.length === 0 && (
            <p className="col-span-full text-gray-400">
              No featured products found.
            </p>
          )}

          {featured.map((item) => (
            <div
              key={item.id}
              className="p-6 border border-white/10 rounded-lg bg-white/5 hover:bg-white/10 transition flex flex-col items-center"
            >
              <div className="w-full aspect-square bg-white/10 rounded mb-4 overflow-hidden">
                {item.image ? (
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-gray-400 text-sm">No Image</span>
                )}
              </div>

              <h3 className="text-lg font-semibold mb-1">{item.name}</h3>
              <p className="text-gray-400 mb-4">₹{item.price}</p>

              <button
                onClick={() => handleAdd(item)}
                className="bg-white text-black px-4 py-2 rounded-full text-sm font-semibold hover:bg-gray-200 transition"
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* NEWSLETTER */}
      <section className="w-full py-24 border-t border-white/10 text-center">
        <h2 className="text-3xl font-bold mb-6">Join Our Newsletter</h2>

        <form
          onSubmit={handleSubmit}
          className="max-w-md mx-auto flex gap-4"
        >
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="flex-1 px-4 py-3 rounded bg-white/10 text-white"
            required
          />
          <button className="bg-white text-black px-6 py-3 rounded-full font-semibold">
            Subscribe
          </button>
        </form>
      </section>

      <footer className="w-full py-8 border-t border-white/10 text-center text-gray-500 text-sm">
        © 2025 Monochrome Store. All rights reserved.
      </footer>
    </main>
  );
}
