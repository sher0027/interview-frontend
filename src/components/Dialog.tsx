import { Box, Text, Icon } from "@chakra-ui/react";
import { FaRobot, FaUser } from "react-icons/fa";
import { useState, useEffect, useRef } from "react";
import { fetchRecord } from "../api/record";

interface Message {
    sender: 'robot' | 'user';
    content: JSX.Element | string;
}

interface DialogProps {
    rid: string;
}

const Dialog = ({ rid }: DialogProps) => {
    const [messages, setMessages] = useState<Message[]>([
        { sender: 'robot', content: 'Hello! How can I help you today?' },
    ]);

    const hasLoadedRecords = useRef(false); 

    const speakText = (text: string) => {
        if ('speechSynthesis' in window) {
            const utterance = new SpeechSynthesisUtterance(text);
            window.speechSynthesis.speak(utterance);
        } else {
            console.warn("Speech synthesis not supported in this browser.");
        }
    };

    const addMessage = (sender: 'robot' | 'user', content: string | JSX.Element) => {
        setMessages((prevMessages) => [...prevMessages, { sender, content }]);

        if (sender === 'robot' && typeof content === 'string') {
            speakText(content);
        }
    };

    const loadMessagesFromRecords = async () => {
        try {
            const response = await fetchRecord(rid); 
            const records = response.data.records;

            records.forEach((record: { transcript: string | JSX.Element; reply: string | JSX.Element; }) => {
                ['transcript', 'reply'].forEach((key) => {
                    const content = record[key as 'transcript' | 'reply'];
                    const sender = key === 'transcript' ? 'user' : 'robot';
        
                    if (content) {
                        addMessage(sender, content);
                    }
                });
            });
        } catch (error) {
            console.error('Error loading records:', error);
        }
    };

    useEffect(() => {
        if (!hasLoadedRecords.current) {
            loadMessagesFromRecords();
            hasLoadedRecords.current = true;
        }
    }, [rid]);

    return (
        <Box
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
    );
};

export default Dialog;
