import React from "react";
import { Trash2, ShoppingCart } from "lucide-react";
import { useWishlist } from "./WishlistContext";

export default function Wishlist() {
  const { wishlist, removeFromWishlist } = useWishlist();

  const moveToCart = (item) => {
    console.log("Move to cart:", item);
    removeFromWishlist(item.id);
  };

  // EMPTY STATE
  if (wishlist.length === 0) {
    return (
      <div className="min-h-screen bg-black text-white p-6 flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold mb-4 tracking-tight">Your Wishlist</h1>
        <p className="text-gray-400">Your wishlist is empty</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-6 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-8 tracking-tight">Your Wishlist</h1>

      {/* GRID */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[240px] w-full max-w-5xl">
        {wishlist.map((item, i) => (
          <div
            key={item.id}
            className={`border border-white/10 rounded-2xl overflow-hidden shadow-sm bg-white/5 hover:bg-white/10 transition flex flex-col ${
              i % 4 === 0 ? "row-span-2" : "row-span-1"
            }`}
          >
            {/* IMAGE */}
            <div className="w-full h-full">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* CONTENT */}
            <div className="p-4 flex flex-col gap-2 bg-white/5">
              <h2 className="text-lg font-semibold">{item.name}</h2>
              <p className="text-gray-300 text-sm">₹{item.price}</p>

              {/* Show quantity if > 1 */}
              {item.qty > 1 && (
                <p className="text-xs text-gray-400">Quantity: {item.qty}</p>
              )}

              {/* ACTION BUTTONS */}
              <div className="flex justify-between mt-2">
                <button
                  onClick={() => moveToCart(item)}
                  className="px-3 py-2 border border-white/20 rounded-lg hover:bg-white hover:text-black transition text-xs flex items-center gap-1"
                >
                  <ShoppingCart className="w-4 h-4" /> Move to Cart
                </button>

                <button
                  onClick={() => removeFromWishlist(item.id)}
                  className="p-2 border border-white/20 rounded-lg hover:bg-white hover:text-black transition"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
