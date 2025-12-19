import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

import { CartProvider } from "./Pages/CartContext.jsx";
import { WishlistProvider } from "./Pages/WishlistContext.jsx";
import { AuthProvider } from "../../Backend/context/AuthContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <WishlistProvider>
        <CartProvider>
          <App />
        </CartProvider>
      </WishlistProvider>
    </AuthProvider>
  </StrictMode>
);
