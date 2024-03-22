import React, { createContext, useEffect, useState } from 'react';

export const CartContext= createContext();

const CartProvider = ({children}) => {
    const [cart, setCart]= useState([]);
    const [itemQuantity, setItemQuantity]= useState(0); //item quantity state for cart icon
    const [total, setTotal]= useState(0); //total price state

// Total Cart Price //
    useEffect(()=>{
        const totalPrice= cart.reduce((accumulator, currentValue)=> accumulator + currentValue.price * currentValue.quantity, 0);
        setTotal(totalPrice);
    }, [cart])

// Update Item(cart icon) Quantity //
    useEffect(()=>{
        if(cart){
            const newQuantity= cart.reduce((accumulator, currentValue)=> accumulator + currentValue.quantity, 0);
            setItemQuantity(newQuantity);
        }
    }, [cart])

// Adding Items on Cart //
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

// Remove Items from Cart //
    const removeToCart=(id)=>{
        const deletedCart= cart.filter(item=> item.id !== id);
        setCart(deletedCart);
    }

// Clear full Cart //
    const clearCart=()=>{
        setCart([]);
    }

// Increase Product Quantity //
    const increaseQuantity= id=>{
        const quantityHaveToIncrease= cart.find(item=> item.id===id);
        addToCart(quantityHaveToIncrease, id)
    }

// Decrease Product Quantity //
    const decreaseQuantity= id=>{
        const quantityHaveToDecrease= cart.find(item=> item.id===id);

        if(quantityHaveToDecrease){
            const afterDecrease= cart.map(item=> item.id === id ? {...item, quantity:item.quantity-1} : item);

            setCart(afterDecrease);
        }
        if(quantityHaveToDecrease.quantity<2){
            removeToCart(id);
        }
    }

    return (
        <CartContext.Provider value={
            {cart, 
            addToCart, 
            removeToCart, 
            clearCart, 
            increaseQuantity, 
            decreaseQuantity, 
            itemQuantity, 
            total}
            }>
            {children}
        </CartContext.Provider>
    );
};

export default CartProvider;