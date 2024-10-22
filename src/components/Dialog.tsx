import { Box, Text, Icon } from "@chakra-ui/react";
import { FaRobot, FaUser } from "react-icons/fa";

interface Message {
    sender: 'robot' | 'user';
    content: JSX.Element | string;
}
  
interface DialogProps {
    messages: Message[];
}
  
  const Dialog = ({ messages }: DialogProps) => {
    return(
        <Box
            // bgColor="#fafafa"
            width="950px"
            height="700px"
            boxShadow="2px 0px 10px rgba(3, 3, 3, 0.1)"
            borderRadius="24px"
            p={6}
        >
            <Text fontSize="24px">Chat with AI</Text> 
            <Box
                height="620px"
                overflowY="auto"
                sx={{
                    "::-webkit-scrollbar": {
                        display: 'none',
                    },
                    scrollbarWidth: 'none',
                    msOverflowStyle: 'none',
                }}
            >
            {messages.map((message, index) => (
                <Box 
                    key={index}
                    maxW="100%"
                    p={4}
                    bgColor={message.sender === 'robot' ? "secondary" : "primary"} 
                    display="inline-flex"
                    marginY={4}
                    borderRadius="24px"
                    sx={{
                        float: message.sender === 'robot' ? 'left' : 'right',  
                        clear: 'both',
                    }}
                >
                    {message.sender === 'robot' && (
                        <Icon as={FaRobot} w={7} h={7} color="primary" mr={2} />
                    )}

                    <Text fontSize="20px" color={message.sender === 'user' ? "white" : "black"} textAlign="justify">
                        {message.content}
                    </Text>

                    {message.sender === 'user' && (
                        <Icon as={FaUser} w={7} h={7} color="secondary" ml={2} />
                    )}
                </Box>
            ))}
            </Box> 
            
        </Box>
    )
}

export default Dialog;