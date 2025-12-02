import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { CartProvider } from './Pages/CartContext.jsx'
import { WishlistProvider } from './Pages/WishlistContext.jsx'

createRoot(document.getElementById('root')).render(
 
    <WishlistProvider> <CartProvider>
      <StrictMode>
        <App />
      </StrictMode>
    </CartProvider></WishlistProvider>
  
)
