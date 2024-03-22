import { Button, FormControl, FormLabel, Input, InputGroup, InputRightElement, Text, VStack, useToast } from '@chakra-ui/react';
import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [showPass, setShowPass]= useState(false);
    const [userDetails, setUserDetails]= useState({});
    const [file, setFile]= useState('https://cdn.pixabay.com/photo/2016/11/08/15/21/user-1808597_960_720.png')
    const [passError, setPassError]= useState('')
    const [loading, setLoading]= useState(false);
    const toast = useToast()
    const navigate= useNavigate();


    const handleBlur= (e)=>{
        e.preventDefault();
        const oldDetails= {...userDetails}
        oldDetails[e.target.name]= e.target.value;
        setUserDetails(oldDetails);

        if(e.target.name === 'confirmPassword'){
            if(e.target.value !== userDetails.password){
                setPassError('Password Not Matched')
            }
            else{
                setPassError('');
            }
        }

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
            }
        }
    }

    const handleFile= async(e)=>{
        const pic= e.target.files[0];
        setLoading(true);

        if(pic === undefined){
                toast({
                    title: 'Image Failed',
                    description: "Please Select an Image!!!",
                    status: 'error',
                    duration: 3000,
                    isClosable: true,
                })
                setLoading(false);
                return;
        }

        if(pic.type=== "image/jpeg" || pic.type=== "image/png"){
            const formData= new FormData();
            formData.append('file', pic);
            formData.append('upload_preset', 'chatbook');
            formData.append('cloud_name', 'rumman99');

            try{
                const response= await axios.post('https://api.cloudinary.com/v1_1/rumman99/image/upload', formData);
                setFile(response.data.url);
                setLoading(false);
            }
            catch(error){
                setLoading(false);
                console.log(error);
            }
        }
        else{
            toast({
                title: 'Unsupported file format',
                description: "Please upload a JPEG or PNG image.",
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
            e.target.value='';
            setLoading(false);
        }
    }

    const handleSubmit= async()=>{
        setLoading(true);

        if(!userDetails.mobile || !userDetails.name || !userDetails.password || !userDetails.confirmPassword){
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

        if (!(/^0\d{10}$/.test(userDetails.mobile))) {
            toast({
                title: 'Mobile Number Error',
                description: "Mobile should start with 0 and be 11 digits",
                status: 'warning',
                duration: 3000,
                isClosable: true,
            });
            setLoading(false);
            return;
        }


        if(userDetails.password !== userDetails.confirmPassword){
            toast({
                title: 'Password Error',
                description: "Password Not Matched",
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
            setLoading(false);
            return;
        }
        
        try{
            const response= await axios.post('https://react-ecommerce-xdnc.onrender.com/auth/register', {name:userDetails.name, mobile:userDetails.mobile, password:userDetails.password, photo:file}, 
            {
                headers:
                {"Content-Type":"application/json"}
            });
            toast({
                title: "Registration SuccessFull",
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
            if(err.response && err.response.status === 409){
                toast({
                    title: 'Registration Failed',
                    description: "User Already Exist!!!",
                    status: 'error',
                    duration: 3000,
                    isClosable: true,
                });
                setLoading(false);
            }
            else{
                toast({
                    title: 'Registration Failed',
                    description: "Invalid Mobile Number!!!",
                    status: 'error',
                    duration: 3000,
                    isClosable: true,
                });
                setLoading(false);
            }
        }
    }

    return (
        <VStack spacing={'15px'}>

            <FormControl isRequired>
                <FormLabel>Name</FormLabel>
                <Input name='name' placeholder='Enter Your Name' type='text' onBlur={handleBlur}/>
            </FormControl>

            <FormControl isRequired>
                <FormLabel>Mobile Number</FormLabel>
                <Input name='mobile' placeholder='Enter Your Name' type='number' onBlur={handleBlur}/>
            </FormControl>

            <FormControl isRequired>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                    <Input name='password' placeholder='Enter Your Password' type={showPass ? 'text' : 'password'} onBlur={handleBlur}/>
                    <InputRightElement width={'4.5rem'}>
                        <Button h={"1.75rem"} size={'sm'} onClick={()=>setShowPass(!showPass)}>
                            {showPass ? "Hide" : "Show"}
                        </Button>
                    </InputRightElement>
                </InputGroup>
            </FormControl>

            <FormControl isRequired>
                <FormLabel>Confirm Password</FormLabel>
                <Input name='confirmPassword' placeholder='Enter Your Password' type='password' onBlur={handleBlur}/>
                {passError && <Text color={'red'}>{`${passError}!!!`}</Text>}
            </FormControl>

            <FormControl>
                <FormLabel htmlFor="photo">Upload Photo</FormLabel>
                <Input onChange={handleFile} type='file' p={1.5} accept='image/*'/>
            </FormControl>

            <Button onClick={handleSubmit} isLoading={loading} colorScheme='blue' width={'100%'} mt={2}>Register Now</Button>
        </VStack>
    );
};

export default Register;