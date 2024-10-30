import {
    Box,
    Button,
    Flex,
    Heading,
    Input,
    FormControl,
    FormLabel,
    Text,
    Divider,
    AbsoluteCenter,
    Image
} from '@chakra-ui/react';
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from '../api/api';
import LoadingCircle from '../components/LoadingCircle';
import MessageAlert from '../components/MessageAlert';

const Login = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleLogin = async () => {
        if (!username || !password) {
            setError("Please enter both username and password.");
            return;
        }

        setLoading(true); 
        setError("");     
        try {
            const response = await login(username, password);
            if (response.status === 200) {
                const token = response.data.token;
                localStorage.setItem('authToken', token); 
                navigate("/home"); 
            } else {
                setError("Login failed. Please check your credentials.");
            }
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message || "An error occurred. Please try again.");
            } else {
                setError("An unknown error occurred. Please try again.");
            }
        } finally {
            setLoading(false);
        }
    };

    return(    
        <Flex
            width="100vw"
            height="100vh"
            alignItems="center"
            justifyContent="center"
        >
            {loading && <LoadingCircle />} 
            
            <Box
                position="absolute"
                top="-176px"     
                left="-219px"  
                width="834px"        
                height="824px"   
                borderRadius="50%"   
                bg="secondary"      
            />
            <Box
                bg="white"
                width="600px"
                p="62px 88px"
                height="620px"
                textAlign="center"
                borderRadius="24px"
                zIndex={1}
                boxShadow="2px 0px 10px rgba(0, 0, 0, 0.5)"
            >
                <Heading fontSize="64px" mb="68px">AIIntervi</Heading>

                {error && <MessageAlert status={'error'} message={error} />}

                <FormControl mb={5}>
                    <FormLabel htmlFor="username">Username</FormLabel>
                    <Input 
                        id="username" 
                        placeholder="username@domain.com"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </FormControl>
                <FormControl mb={5}>
                    <FormLabel htmlFor="password">Password</FormLabel>
                    <Input 
                        id="password" 
                        type="password"
                        placeholder="*****************"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </FormControl>
            
                <Button 
                    mb={5} 
                    width="100%" 
                    onClick={handleLogin} 
                    isDisabled={loading}
                >
                    Sign In
                </Button>
            
                <Box position='relative'>
                    <Divider color="#d3d3d3" />
                    <AbsoluteCenter bg='white' px='4'>
                        <Text fontSize="sm" color="#4f4f4f">or</Text>
                    </AbsoluteCenter>
                </Box>
                <Button variant="outline" mt={5} width="100%">Get started</Button>
            </Box>
            <Image 
                src="/src/assets/bg.jpg" 
                boxSize="370px"
                position="absolute"
                top="420px"     
                right="100px"  
                objectFit="contain"
            />
        </Flex>
    );
};

export default Login;
