import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { CartContext } from '../../context/CartContext';
import { ProductContext } from '../../context/ProductContext';

const ProductDetails = () => {
    const {id}= useParams();
    const {addToCart}= useContext(CartContext);
    const {product}= useContext(ProductContext);

    const getProductById= product.find(product=> product.id=== parseInt(id));

    if(!getProductById){
        return (
            <section className='h-screen flex justify-center items-center'>
                Loading....
            </section>
        )
    }

    const {title, price, description, image}= getProductById;

    return (
        <section className='pt-32 mb-32 md:mb-0 sm:mb-0 pb-12 lg:py-32 h-screen flx items-center'>
            <div className='container mx-auto'>
                <div className='flex flex-col lg:flex-row'>
                    <div className='flex flex-1 justify-center items-center mb-8 lg:mb-0'>
                        <img className='max-w-[200px] lg:max-w-xs' src={image} alt="" />
                    </div>
                    <div className='flex-1 text-center lg:text-left'>
                        <h1 className='text-[26px] font-medium mb-2 max-w-[450px] mx-auto lg:mx-0'>{title}
                        </h1>
                        <div className='text-xl text-red-500 font-medium mb-6'>${price}
                        </div>
                        <p className='mb-8'>{description}
                        </p>
                        <button onClick={()=> addToCart(getProductById, getProductById.id)} className='bg-black py-4 px-8 text-white'>Add to Cart</button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ProductDetails;