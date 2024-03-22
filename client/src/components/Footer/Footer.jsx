import React from 'react';

const Footer = () => {
    return (
        <footer className='bg-black py-12'>
            <div className='container mx-auto'>
                <p className='text-white text-center'>
                    Copyright &copy; Tasnim Alam Rumman {new Date().getFullYear()}. All Rights Reserved
                </p>
            </div>
            Footer
        </footer>
    );
};

export default Footer;