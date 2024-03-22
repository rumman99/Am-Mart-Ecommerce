import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { IoMdClose, IoMdRemove, IoMdAdd } from 'react-icons/io'
import { CartContext } from '../../context/CartContext';

const Cart = ({item}) => {
    const {id, title, image, price, quantity}= item;
    const {removeToCart, increaseQuantity, decreaseQuantity}= useContext(CartContext);

    return (
        <div className='flex gap-x-4 py-2 border-b border-gray-200 w-full font-light text-gray-700'>
            <div className='w-full min-h-[150px] flex items-center gap-x-4'>
                <Link to={`product/${id}`}>
                    <img className='max-w-[80px]' src={image} alt="" />
                </Link>
                <div className='w-full flex flex-col'>
                    <div className='flex justify-between mb-2'>
                        <Link className='text-sm uppercase font-medium max-w-[240px] text-primary hover:underline' to={`product/${id}`}>{title}
                        </Link>
                        <div onClick={()=>removeToCart(id)} className='text-xl cursor-pointer'>
                            <IoMdClose className='text-gray-500 hover:text-red-500 transition'/>
                        </div>
                    </div>

                    <div className='flex gap-x-2 h-[36px] text-sm'>
                        <div className='flex fled-1 max-w-[100px] items-center h-full border text-primary font-medium'>
                            <div onClick={()=>decreaseQuantity(id)} className='flex-1 flex justify-center items-center cursor-pointer h-full'>
                            <IoMdRemove />
                            </div>
                            <div className='h-full flex justify-center items-center px-4'>{quantity}
                            </div>
                            <div onClick={()=>increaseQuantity(id)} className='flex-1 h-full flex justify-center items-center cursor-pointer'>
                            <IoMdAdd />
                            </div>
                        </div>
                        <div className='flex-1 flex items-center justify-around'>
                            $ {price}
                        </div>
                        <div className='flex-1 flex justify-end items-center text-primary font-medium'>
                            $ {parseFloat(price * quantity).toFixed(2)}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;