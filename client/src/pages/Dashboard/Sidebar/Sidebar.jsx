import { Link } from 'react-router-dom';
import './sidebar.css'
import { RxDashboard } from "react-icons/rx";
import { MdOutlineEventNote } from "react-icons/md";
import { BsPeopleFill } from "react-icons/bs";
import { FaNotesMedical } from "react-icons/fa";
import { MdOutlineSettingsInputComponent } from "react-icons/md";
import { FaUserDoctor } from "react-icons/fa6";


const Sidebar = () => {
    return (
        <div className='sidebar pt-28 md:mb-0 h-screen items-center'>
                <div className='d-flex' >
                <div className='iconStyle'><RxDashboard /></div>
                <div className='hoverStyle'><Link to="/dashboard"><h6>Dashboard</h6></Link></div>
                </div>
                <div className='d-flex'>
                <div className='iconStyle'><BsPeopleFill /></div>
                <div><Link to="/allUsers"><h6>All Users</h6></Link></div>
                </div>
                <div className='d-flex'>
                <div className='iconStyle'><MdOutlineEventNote /></div>
                <div><Link to=""><h6>All Orders</h6></Link></div>
                </div>
                <div className='d-flex'>
                <div className='iconStyle'><FaNotesMedical /></div>
                <div><Link to=""><h6>All Admin</h6></Link></div>
                </div>
                <div className='d-flex'>
                <div className='iconStyle'><MdOutlineSettingsInputComponent /></div>
                <div><Link to=""><h6>Settings</h6></Link></div>
                </div>
                <div className='d-flex'>
                <div className='iconStyle'><FaUserDoctor /></div>
                <div><Link to=""><h6>Add Admin</h6></Link></div>
                </div>
        </div>
    );
};

export default Sidebar;