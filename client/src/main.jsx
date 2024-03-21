import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import ProductProvider from './context/ProductContext.jsx'
import SidebarProvider from './context/SidebarContext.jsx'
import CartProvider from './context/CartContext.jsx'


ReactDOM.createRoot(document.getElementById('root')).render(

  <React.StrictMode>
    <BrowserRouter>
    <ProductProvider>
    <SidebarProvider>
    <CartProvider>
    <App />
    </CartProvider>
    </SidebarProvider>
    </ProductProvider>
    </BrowserRouter>
  </React.StrictMode>,
  
)