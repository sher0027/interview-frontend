import { Box, Button, FormControl, FormLabel, Input, Heading, Text, useToast } from '@chakra-ui/react';
import { useState } from 'react';
import { login, register } from '../api/account';
import { useNavigate } from 'react-router-dom';

const RegisterInfo = ({ }: { onClose: () => void }) => {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        confirmPassword: '',
    });
    const [loading, setLoading] = useState(false);
    const toast = useToast();
    const navigate = useNavigate();

    const inputs = [
        { label: "Username", name: "username", type: "text", placeholder: "Enter your username" },
        { label: "Password", name: "password", type: "password", placeholder: "Enter your password" },
        { label: "Confirm Password", name: "confirmPassword", type: "password", placeholder: "Confirm your password" },
    ];

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleRegister = async () => {
        const { username, password, confirmPassword } = formData;

        if (!username || !password || !confirmPassword) {
            toast({
                title: 'Error',
                description: 'All fields are required.',
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
            return;
        }

        if (password !== confirmPassword) {
            toast({
                title: 'Error',
                description: 'Passwords do not match.',
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
            return;
        }

        setLoading(true);
        try {
            const response = await register(username, password);
            if (response.status === 201) {
                toast({
                    title: 'Success',
                    description: 'Account created successfully.',
                    status: 'success',
                    duration: 3000,
                    isClosable: true,
                });

                const loginResponse = await login(username, password);
                if (loginResponse.status === 200) {
                    const { access, refresh } = loginResponse.data;
           
                    localStorage.setItem('accessToken', access);
                    localStorage.setItem('refreshToken', refresh);
                    navigate('/home');
                } else {
                    toast({
                        title: 'Login Error',
                        description: 'Failed to log in after registration.',
                        status: 'error',
                        duration: 3000,
                        isClosable: true,
                    });
                }
            } else {
                toast({
                    title: 'Error',
                    description: response.data.message || 'Failed to create account.',
                    status: 'error',
                    duration: 3000,
                    isClosable: true,
                });
            }
        } catch (err) {
            toast({
                title: 'Error',
                description: 'An error occurred. Please try again later.',
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box p={5} textAlign="center" width="100%" maxWidth="400px">
            <Heading fontSize="2xl" mb={4}>Register</Heading>
            <Text mb={6}>Create your account to get started.</Text>

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
                colorScheme="blue"
                width="100%"
                isLoading={loading}
                onClick={handleRegister}
            >
                Register
            </Button>
        </Box>
    );
};

export default RegisterInfo;
