import { useEffect, useState } from "react";
import Sidebar from "../Sidebar/Sidebar";
import axios from "axios";
import { Button, Card, CardBody, CardFooter, CardHeader, Grid, GridItem, Heading, SimpleGrid, Text } from "@chakra-ui/react";

const AllUsers = () => {
    const [allUsers, setAllUsers]= useState([]);

    useEffect(()=>{
        const fetching=(async()=>{
            try{
                const {token} = JSON.parse(sessionStorage.getItem('user'));

                if(token){
                    const findedUsers= await axios.get('https://react-ecommerce-xdnc.onrender.com/auth/users', {headers:{'Authorization': `Bearer ${token}`}});
                    const data= await findedUsers.data;
                    setAllUsers(data);
                }
                else{
                    console.log('UnAuthorized Access');
                }
            }
            catch(err){
                console.log(err)
            }

        })();
        
    },[]);

    return (
        <div className="container row grid grid-cols-3 md:grid-cols-3">
            <div className="">
                <Sidebar/>
            </div>
            <table className="mt-24 min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
                <tr>
                    <th scope="col" className="px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                    <th scope="col" className="px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mobile Number</th>
                    <th scope="col" className="px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Photo</th>
                    <th scope="col" className="px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
                {allUsers.map(user => (
                    <tr key={user._id}>
                        <td className="px-2">{user.name}</td>
                        <td className="px-2">0{user.mobile}</td>
                        <td className="px-2">
                            <img className="max-w-[50px] rounded-full" src={user.photo} alt="" />
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
    );
};

export default AllUsers;