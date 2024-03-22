import React, { useContext, useState } from 'react';
import { SidebarContext } from '../../context/SidebarContext';
import { BsBag } from 'react-icons/bs'
import { CartContext } from '../../context/CartContext';
import { Link } from 'react-router-dom';
import img from '../../img/default.png'
import { Avatar, Menu, MenuButton, MenuDivider, MenuItem, MenuList} from '@chakra-ui/react';
import { UserContextState } from '../../context/UserContext';
import ProfileModal from '../ProfileModal/ProfileModal';



const Header = () => {
    const [isActive, setIsActive]= useState(true)
    const {isOpen, setIsOpen}= useContext(SidebarContext);
    const {itemQuantity}= useContext(CartContext);
    const {user, logoutUser}= UserContextState();

    // Scroll Event //
    window.addEventListener('scroll', ()=>{
        window.scrollY > 60 ? setIsActive(true) : setIsActive(false);
    })

    return (
        <header className={`${isActive ? 'bg-white py-4 shadow-md' : 'bg-none py-6'} fixed w-full z-10 transition-all`}>
            <div className='container mx-auto flex items-center justify-between px-4 md:px-0 lg:px-0 xl:px-0 h-full'>
                <Link to={'/'}>
                    <div>
                        <img className='w-[100px]' src={img} alt="" />
                    </div>
                </Link>

                <div className='cursor-pointer flex relative'>
                    <div className='mx-6 -mt-2'> 
                    {user ? <Menu>
                    <MenuButton>
                    <Avatar 
                    size='sm' 
                    cursor={'pointer'} 
                    name={user.name} 
                    src={user.photo}/>
                    </MenuButton>
                    <MenuList>
                        <ProfileModal user={user}>
                            <MenuItem>My Profile</MenuItem>
                        </ProfileModal>
                        <MenuDivider/>
                        <MenuItem onClick={logoutUser}>Logout</MenuItem>
                    </MenuList>
                    </Menu> : <Link to={'/auth'}>LOGIN</Link>}
                    </div>
                    
                    <div onClick={()=> setIsOpen(!isOpen)}>
                        <BsBag className='text-2xl'/>
                        <div className='bg-red-500 absolute -right-2 -bottom-2 text-[12px] w-[18px] h-[18px] text-white rounded-full flex justify-center items-center'>{itemQuantity}
                        </div>
                    </div>  
                </div>
            </div>   
        </header>
    );
};

export default Header;