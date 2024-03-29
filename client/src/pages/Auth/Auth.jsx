import {Box, Container, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import img from '../../img/default.png'
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import Register from '../../components/Register/Register';
import Login from '../../components/Login/Login';

const Auth = () => {
    // Checking user Login or Not //
    const navigate= useNavigate();

    useEffect(()=>{
        const userDetails= JSON.parse(sessionStorage.getItem("user"));

        if(userDetails){
            navigate('/')
        }
    },[navigate])

    return (
        <Container className='py-[122px]' maxW="xl" centerContent>
            <Box d='flex'
            justifyContent="center" p={3} bg={"blue.100"} w="100%" m='40px 0 10px 0' borderRadius='lg' borderWidth='1px'>
                <img style={{height:'80px', margin: 'auto'}} src={img} />
            </Box>

            <Box bg={"white"} w={'100%'} p={4} borderRadius='lg' borderWidth={'1px'} textAlign={'Center'} fontFamily={'Work Sans'} color={'black'}>
                <Tabs variant='soft-rounded' colorScheme='blue'>
                    <TabList mb={'1em'}>
                        <Tab width={'50%'}>Login</Tab>
                        <Tab width={'50%'}>Register</Tab>
                    </TabList>
                    <TabPanels>
                        <TabPanel>
                        <Login/>
                        </TabPanel>
                        <TabPanel>
                        <Register/>
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            </Box>
        </Container>
    );
};

export default Auth;