import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Sidebar from '../Sidebar/Sidebar';

const AllProduct = () => {
    const [allProduct, setAllProduct]= useState([]);

    useEffect(()=>{
        const fetching=(async()=>{
            const response= await axios.get('https://fakestoreapi.com/products');
            const data= await response.data;
            // Filtering Cloth only
            const filterProduct= data.filter(item=> {
                return (item.category === "men's clothing" || item.category === "women's clothing")});
            setAllProduct(filterProduct)
        })()
    },[])

    return (
        <div className='flex justify-center items-center'>
            <div>
            <table className="mt-24 min-w-full divide-y divide-gray-200">
            <tbody className="bg-white divide-y divide-gray-200">
                {allProduct.map(product => (
                    <tr key={product.id}>
                        <td className="px-2">{product.title}</td>
                        <td className="px-2">0{product.price}</td>
                        <td className="px-2">
                            <img className="max-w-[50px] rounded-full" src={product.image} alt="" />
                        </td>
                        <td className="px-2 py-4">
                            <button className="text-indigo-600 hover:text-indigo-900">Edit</button>
                            <button className="text-red-600 hover:text-red-900 ml-2">Delete</button>
                        </td>
                    </tr>
                ))}
            </tbody>
            </table>
        </div>
    </div>
    );
};

export default AllProduct;