import React from 'react';

const Footer = () => {
    return (
        <footer className='bg-black py-12'>
            <div className='container mx-auto'>
                <p className='text-white text-center'>
                    Copyright &copy; <span className='text-blue-500'>Am-Mart</span> {new Date().getFullYear()}. All Rights Reserved
                </p>
            </div>
        </footer>
    );
};

export default Footer;