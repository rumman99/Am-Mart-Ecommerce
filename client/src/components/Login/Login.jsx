import { Button, FormControl, FormLabel, Input, InputGroup, InputRightElement, VStack, useToast } from '@chakra-ui/react';
import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [showPass, setShowPass]= useState(false); //for hide/show pass
    const [userDetails, setUserDetails]= useState({});
    const [loading, setLoading]= useState(false); //for loading button
    const [validMobile, setValidMobile]= useState(false); //for mobile validity
    const toast = useToast()
    const navigate= useNavigate();

    const handleBlur= (e)=>{
        e.preventDefault();
        const oldDetails= {...userDetails}
        oldDetails[e.target.name]= e.target.value;

        // Validation for Mobile Number //
        if(e.target.name === 'mobile'){
            const mobileRegex= /^0\d{10}$/;
            if(!mobileRegex.test(e.target.value)){
                toast({
                    title: 'Login Failed',
                    description: "Mobile should start with 0 and 11 digit",
                    status: 'error',
                    duration: 3000,
                    isClosable: true,
                });
                setValidMobile(false);
            }
            else{
                setValidMobile(true);
            }
        }
        setUserDetails(oldDetails);
    }

// Submit Button //
    const handleSubmit= async()=>{
        setLoading(true);

        if(!userDetails.mobile || !userDetails.password){
            toast({
                title: 'Warning',
                description: "Please Fill all Fields",
                status: 'warning',
                duration: 3000,
                isClosable: true,
            });
            setLoading(false);
            return;
        }

        if(!validMobile){
            toast({
                title: 'Warning',
                description: "Mobile should start with 0 and 11 digit",
                status: 'warning',
                duration: 3000,
                isClosable: true,
            });
            setLoading(false);
            return;
        }
        
        try{
            const response= await axios.post('https://react-ecommerce-xdnc.onrender.com/auth/login', {mobile:userDetails.mobile, password:userDetails.password}, 
            {
                headers:
                {"Content-Type":"application/json"}
            });
            toast({
                title: "Login SuccessFull",
                description: 'Welcome on Chat Book',
                status: 'success',
                duration: 3000,
                isClosable: true,
            });
            sessionStorage.setItem('user', JSON.stringify(response.data));
            setLoading(false);
            navigate('/');
        }
        catch(err){
            toast({
                title: 'Login Failed',
                description: "Invalid Mobile or Password",
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
            setLoading(false);
        }
    }

    return (
        <VStack spacing={'15px'}>

            <FormControl isRequired>
                <FormLabel>Mobile Number</FormLabel>
                <Input name='mobile' defaultValue={userDetails.mobile} placeholder='Enter Mobile' type='number' onBlur={handleBlur} pattern='[0-9]*'/>
            </FormControl>

            <FormControl isRequired>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                    <Input name='password' defaultValue={userDetails.password} placeholder='Enter Your Password' type={showPass ? 'text' : 'password'} onBlur={handleBlur}/>
                    <InputRightElement width={'4.5rem'}>
                        <Button h={"1.75rem"} size={'sm'} onClick={()=>setShowPass(!showPass)}>
                            {showPass ? "Hide" : "Show"}
                        </Button>
                    </InputRightElement>
                </InputGroup>
            </FormControl>

            <Button onClick={handleSubmit} isLoading={loading} disabled={!validMobile} colorScheme='blue' width={'100%'} mt={2}>Login Now</Button>

            <Button onClick={()=>setUserDetails({mobile:'01111111111', password:'123456789'}, setValidMobile(true))} colorScheme='red' width={'100%'} mt={2}>Join as Guest</Button>
        </VStack>
    );
};

export default Login;