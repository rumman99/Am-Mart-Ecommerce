import React, { createContext, useState } from 'react';

export const CartContext= createContext();

const CartProvider = ({children}) => {
    const [cart, setCart]= useState([]);

    const addToCart= (product, id)=>{
        const newItem= {...product, quantity: 1};

        // Finding item already in cart or not //
        const cartItem= cart.find(item=> item.id===id);

        // If already in change the quantity //
        if(cartItem){
            const updateCart= cart.map(item=> item.id === id ? {...item, quantity: item.quantity+1} : item);

            setCart(updateCart)
        }
        else{
            setCart([...cart, newItem]);
        }
    }
    console.log(cart)
    return (
        <CartContext.Provider value={{addToCart}}>
            {children}
        </CartContext.Provider>
    );
};

export default CartProvider;