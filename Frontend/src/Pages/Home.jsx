import React, { useEffect, useState } from "react";
import axios from "axios";
import Spline from "@splinetool/react-spline";

export default function Home() {
  const [featured, setFeatured] = useState([]);
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:3000/api/newsLetter", { email });
    setEmail("");
  };

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/featured")
      .then((res) => setFeatured(res.data));
  }, []);

  return (
    <main className="flex flex-col items-center justify-start min-h-screen bg-black text-white px-6">
      {/* Spline bot added */}
      <div className="w-full max-w-6xl mx-auto mb-10">
        <Spline scene="https://prod.spline.design/o9eNrUZbrQagGdEw/scene.splinecode" />
      </div>

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center -mt-5">
        <p className="text-sm tracking-widest text-gray-400 mb-4">
          MONOCHROME STORE
        </p>
        <h1 className="text-5xl font-extrabold mb-4">
          Discover Minimalist Essentials
        </h1>
        <p className="text-lg text-gray-300 max-w-2xl mb-8">
          Shop clean, timeless designs that fit every lifestyle — simplicity
          never goes out of style.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <a
            href="#shop"
            className="bg-white text-black px-6 py-3 rounded-full font-semibold hover:bg-gray-200 transition">
            Shop Now
          </a>
          <a
            href="#about"
            className="border border-white text-white px-6 py-3 rounded-full font-semibold hover:bg-white hover:text-black transition">
            Learn More
          </a>
        </div>
      </section>

      <section
        id="shop"
        className="w-full py-24 border-t border-white/10 text-center">
        <h2 className="text-3xl font-bold mb-10">Featured Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 max-w-6xl mx-auto">
          {featured.map((item, i) => (
            <div
              key={i}
              className="p-6 border border-white/10 rounded-lg bg-white/5 hover:bg-white/10 transition flex flex-col items-center">
              <div className="w-full aspect-square bg-white/10 rounded mb-4 flex items-center justify-center overflow-hidden">
                {item.image ? (
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover rounded"
                  />
                ) : (
                  <span className="text-gray-400 text-sm">No Image</span>
                )}
              </div>
              <h3 className="text-lg font-semibold mb-1">{item.name}</h3>
              <p className="text-gray-400 mb-4">₹{item.price}</p>
              <button className="bg-white text-black px-4 py-2 rounded-full text-sm font-semibold hover:bg-gray-200 transition">
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </section>

      <section className="w-full py-24 border-t border-white/10 text-center">
        <h2 className="text-3xl font-bold mb-6">Join Our Newsletter</h2>

        <form
          onSubmit={handleSubmit}
          className="max-w-md mx-auto flex flex-col sm:flex-row gap-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="flex-1 px-4 py-3 rounded bg-white/10 text-white placeholder-gray-500 focus:outline-none"
            required
          />
          <button className="bg-white text-black px-6 py-3 rounded-full font-semibold hover:bg-gray-200 transition">
            Subscribe
          </button>
        </form>
      </section>

      <footer className="w-full py-8 border-t border-white/10 text-center text-gray-500 text-sm">
        <div className="flex justify-center gap-6 mb-3">
          <a href="#" className="hover:text-white transition">
            Instagram
          </a>
          <a href="#" className="hover:text-white transition">
            Twitter
          </a>
          <a href="#" className="hover:text-white transition">
            Facebook
          </a>
        </div>
        © 2025 Monochrome Store. All rights reserved.
      </footer>
    </main>
  );
}
