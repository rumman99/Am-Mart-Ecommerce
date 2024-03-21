import axios from 'axios';
import { createContext, useEffect, useState } from 'react';

export const ProductContext= createContext();

const ProductProvider = ({children}) => {
    const [product, setProduct]= useState([]);

    useEffect(()=>{
        const fetching=(async()=>{
            const response= await axios.get('https://fakestoreapi.com/products');
            const data= await response.data;
            setProduct(data)
        })()
    },[])

    return (
        <ProductContext.Provider value={{product}}>
            {children}
        </ProductContext.Provider>
    );
};

export default ProductProvider;