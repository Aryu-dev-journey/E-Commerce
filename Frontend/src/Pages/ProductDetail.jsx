import React, { useEffect, useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Heart, ShoppingCart } from "lucide-react";
import { useCart } from "./CartContext";
import { useWishlist } from "./WishlistContext";

export default function ProductDetailPage() {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [qty, setQty] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const { addToCart } = useCart();
  const { addToWishlist, wishlist } = useWishlist();

  // ✅ API URL FROM ENV (IMPORTANT)
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  // --------------------------------------------------
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          `${API_BASE_URL}/api/products/${id}`
        );
        setProduct(res.data);
      } catch (err) {
        console.error(err);
        setError("Failed to load product.");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id, API_BASE_URL]);

  // --------------------------------------------------
  // ✅ SAFE wishlist check (supports MongoDB _id)
  const isInWishlist = useMemo(() => {
    if (!product) return false;
    return wishlist.some(
      (item) => item._id === product._id || item.id === product.id
    );
  }, [wishlist, product]);

  // --------------------------------------------------
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600">
        Loading product...
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        {error}
      </div>
    );
  }

  if (!product) return null;

  // --------------------------------------------------
  const handleAddToCart = () => {
    const item = {
      id: product._id || product.id,
      title: product.name,
      price: product.price,
      image: product.image,
    };

    addToCart(item, qty);
  };

  const handleAddToWishlist = () => {
    addToWishlist(product);
  };

  // --------------------------------------------------
  return (
    <div className="min-h-screen bg-white text-black flex justify-center p-6">
      <div className="w-full max-w-5xl flex flex-col md:flex-row gap-10">

        {/* IMAGE */}
        <div className="w-full md:w-1/2 rounded-xl overflow-hidden border border-black/20 shadow-sm">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-[350px] md:h-[500px] object-cover transition-transform duration-300 hover:scale-105"
          />
        </div>

        {/* DETAILS */}
        <div className="w-full md:w-1/2 flex flex-col space-y-6">
          <h1 className="text-3xl md:text-4xl font-semibold">
            {product.name}
          </h1>

          <p className="text-2xl font-semibold">₹{product.price}</p>

          <p className="text-gray-600 leading-relaxed">
            {product.description || "No description available."}
          </p>

          {/* QUANTITY */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setQty(Math.max(1, qty - 1))}
              className="px-4 py-2 border border-black rounded hover:bg-black hover:text-white"
            >
              −
            </button>

            <span className="text-xl font-medium">{qty}</span>

            <button
              onClick={() => setQty(qty + 1)}
              className="px-4 py-2 border border-black rounded hover:bg-black hover:text-white"
            >
              +
            </button>
          </div>

          {/* ACTIONS */}
          <div className="flex gap-4 mt-4">
            <button
              onClick={handleAddToCart}
              className="flex items-center gap-2 px-6 py-3 border border-black rounded-lg hover:bg-black hover:text-white"
            >
              <ShoppingCart size={20} />
              Add to Cart
            </button>

            <button
              onClick={handleAddToWishlist}
              className={`flex items-center gap-2 px-6 py-3 border rounded-lg transition ${
                isInWishlist
                  ? "bg-red-500 text-white border-red-500"
                  : "border-black hover:bg-black hover:text-white"
              }`}
            >
              <Heart
                size={20}
                fill={isInWishlist ? "currentColor" : "none"}
              />
              {isInWishlist ? "In Wishlist" : "Wishlist"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
