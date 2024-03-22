import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import ProductProvider from './context/ProductContext.jsx'
import SidebarProvider from './context/SidebarContext.jsx'
import CartProvider from './context/CartContext.jsx'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import UserProvider from './context/UserContext.jsx'

const colors = {
  brand: {
    900: '#1a365d',
    800: '#153e75',
    700: '#2a69ac',
  },
}

const theme = extendTheme({ colors })

ReactDOM.createRoot(document.getElementById('root')).render(

  <React.StrictMode>
    <BrowserRouter>
    <ChakraProvider theme={theme}>
    <UserProvider>
    <ProductProvider>
    <SidebarProvider>
    <CartProvider>
    <App />
    </CartProvider>
    </SidebarProvider>
    </ProductProvider>
    </UserProvider>
    </ChakraProvider>
    </BrowserRouter>
  </React.StrictMode>,
  
)
