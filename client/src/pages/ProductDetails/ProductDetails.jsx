import React from 'react';
import { useParams } from 'react-router-dom';

const ProductDetails = () => {
    const {id}= useParams();
    return (
        <div>
            <h6>product details {id}</h6>
        </div>
    );
};

export default ProductDetails;