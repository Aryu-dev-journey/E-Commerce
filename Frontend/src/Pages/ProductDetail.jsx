import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Heart, ShoppingCart } from "lucide-react";
import { useCart } from "./CartContext";
import { useWishlist } from "./WishlistContext";


export default function ProductDetailPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [qty, setQty] = useState(1);
  const { addToCart } = useCart();
  const { addToWishlist, wishlist } = useWishlist();

  // Check if product is already in wishlist
  const isInWishlist = wishlist.some(item => item.id === product?.id);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/products/${id}`)
      .then((res) => setProduct(res.data))
      .catch((err) => console.error("Failed to fetch product:", err));
  }, [id]);

  if (!product)
    return (
      <p className="text-center mt-20 text-gray-600 tracking-wide">
        Loading...
      </p>
    );

  const handleAdd = () => {
    const item = {
      id: product.id || id,
      title: product.name,
      price: product.price,
      image: product.image,
    };
    addToCart(item, qty);
  };

  const handleAddToWishlist = () => {
    addToWishlist(product);
  };

  return (
    <div className="min-h-screen bg-white text-black flex justify-center p-6">
      <div className="w-full max-w-5xl flex flex-col md:flex-row gap-10 items-start">

        {/* LEFT IMAGE */}
        <div className="w-full md:w-1/2 rounded-xl overflow-hidden border border-black/20 shadow-sm">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-[350px] md:h-[500px] object-cover transition-transform duration-300 hover:scale-105"
          />
        </div>

        {/* RIGHT DETAILS */}
        <div className="w-full md:w-1/2 flex flex-col space-y-6">

          {/* Product Title */}
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">
            {product.name}
          </h1>

          {/* Product Price */}
          <p className="text-2xl font-semibold">₹{product.price}</p>

          {/* Product Description */}
          <p className="text-gray-600 leading-relaxed">
            {product.description || "No description available."}
          </p>

          {/* QUANTITY SELECTOR */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setQty(Math.max(1, qty - 1))}
              className="px-4 py-2 border border-black rounded hover:bg-black hover:text-white transition"
            >
              -
            </button>

            <span className="text-xl font-medium">{qty}</span>

            <button
              onClick={() => setQty(qty + 1)}
              className="px-4 py-2 border border-black rounded hover:bg-black hover:text-white transition"
            >
              +
            </button>
          </div>

          {/* ACTION BUTTONS */}
          <div className="flex gap-4 mt-4">
            <button
              onClick={handleAdd}
              className="flex items-center gap-2 px-6 py-3 border border-black rounded-lg hover:bg-black hover:text-white transition"
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
              <Heart size={20} fill={isInWishlist ? "currentColor" : "none"} />
              {isInWishlist ? "In Wishlist" : "Wishlist"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}