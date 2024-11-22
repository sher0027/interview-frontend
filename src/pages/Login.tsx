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
import { login } from '../api/account';
import LoadingCircle from '../components/LoadingCircle';
import MessageAlert from '../components/MessageAlert';
import InfoModal from '../components/InfoModal';
import RegisterInfo from '../components/RegisterInfo';

const Login = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: "",
        password: ""
    });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleLogin = async () => {
        if (!formData.username || !formData.password) {
            setError("Please enter both username and password.");
            return;
        }

        setLoading(true); 
        setError("");     
        try {
            const response = await login(formData.username, formData.password);
            if (response.status === 200) {
                const { access, refresh } = response.data;
                localStorage.setItem('accessToken', access);
                localStorage.setItem('refreshToken', refresh);
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

    const inputs = [
        { label: "Username", name: "username", type: "text", placeholder: "username@domain.com" },
        { label: "Password", name: "password", type: "password", placeholder: "*****************" }
    ];

    const handleRegister = () => {
        setIsModalOpen(true);
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

                {inputs.map((input) => (
                    <FormControl key={input.name} mb={5}>
                        <FormLabel htmlFor={input.name}>{input.label}</FormLabel>
                        <Input 
                            id={input.name}
                            name={input.name}
                            type={input.type}
                            placeholder={input.placeholder}
                            value={formData[input.name as keyof typeof formData]}
                            onChange={handleInputChange}
                        />
                    </FormControl>
                ))}
            
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
                <Button variant="outline" mt={5} width="100%" onClick={handleRegister} >Get started</Button>
            </Box>
            <Image 
                src="/src/assets/bg.jpg" 
                boxSize="370px"
                position="absolute"
                top="420px"     
                right="100px"  
                objectFit="contain"
            />
            <InfoModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <RegisterInfo onClose={() => setIsModalOpen(false)}/>
            </InfoModal>
        </Flex>
    );
};

export default Login;
