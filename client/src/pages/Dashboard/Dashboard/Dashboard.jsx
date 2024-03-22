import { Link } from 'react-router-dom';
import Sidebar from '../Sidebar/Sidebar'
import { Button } from '@chakra-ui/react';

const Dashboard = () => {


    return (
        <div>
            <div className='container-fluid row grid grid-cols-2 -mb-5'>
                <div className=''>
                    <Sidebar/>
                </div>
                <div className='pt-32'>
                        <Link to={'/allUsers'}><Button colorScheme='whatsapp'>See All Users Details</Button></Link>
                        
                </div>
                <div className='col-md-5 pt-5'>
                        {/* ADD something */}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;