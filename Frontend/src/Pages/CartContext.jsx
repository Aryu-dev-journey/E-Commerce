import React, { createContext, useContext, useState } from "react";

const CartContext = createContext();

// custom hook for easier use
export function useCart() {
  return useContext(CartContext);
}

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  // add or update quantity 
  function addToCart(item, qty = 1) {
    setCart((prev) => {
      // check if item already in cart
      const existing = prev.find((p) => p.id === item.id);
      if (existing) {
        return prev.map((p) =>
          p.id === item.id ? { ...p, qty: p.qty + qty } : p
        );
      }
      // new item
      return [...prev, { ...item, qty }];
    });
  }

  function updateQty(id, delta) {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, qty: Math.max(1, item.qty + delta) } : item
      )
    );
  }

  function removeItem(id) {
    setCart((prev) => prev.filter((i) => i.id !== id));
  }

  // optionally persist to localStorage here if you want

  const value = {
    cart,
    addToCart,
    updateQty,
    removeItem,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
