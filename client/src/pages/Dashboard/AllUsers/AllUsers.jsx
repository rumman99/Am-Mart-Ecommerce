import { useEffect, useState } from "react";
import Sidebar from "../Sidebar/Sidebar";
import axios from "axios";
import { Button, Card, CardBody, CardFooter, CardHeader, Heading, Text } from "@chakra-ui/react";

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
        <div className="container-fluid row grid grid-cols-2">
            <div className="">
                <Sidebar/>
            </div>
            <div className="mt-32">
                {allUsers.map(user=> {
                    return (
                        <div className="grid lg:grid-cols-3 md:grid-cols-1 sm:grid-cols-1 mb-5 text-center" key={user._id}>
                            <Card align='center'>
                            <CardHeader>
                                <Heading size='sm'>Name: {user.name}</Heading>
                            </CardHeader>
                            <CardBody>
                                <Text>Mobile Number: 0{user.mobile}</Text>
                            </CardBody>
                            <CardFooter>
                                <Button colorScheme='blue'>Delete User ?</Button>
                            </CardFooter>
                            </Card>
                        </div>
                    )
                })}
            </div>
        </div>
    );
};

export default AllUsers;