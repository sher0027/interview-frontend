import Navbar from "../components/Navbar";
import Background from "../components/Background";
import { Box, Flex } from "@chakra-ui/react";
import Dialog from "../components/Dialog";
import AudioCard from "../components/AudioCard";
import { useState } from "react";
import { sendChatMessage } from "../api/api";
import InstructionCard from "../components/InstructionCard";

interface Message {
    sender: 'robot' | 'user';
    content: JSX.Element | string;
}
  

const Interview = () => {
    const [messages, setMessages] = useState<Message[]>([
        { sender: 'robot', content: 'Hello! How can I help you today?' },
    ]);
    
    const addMessage = (sender: 'robot' | 'user', content: string | JSX.Element) => {
        setMessages((prevMessages) => [...prevMessages, { sender, content }]);
    };
    
    const getRobotResponse = async (userMessage: string) => {
        try {
            const response = await sendChatMessage(userMessage); 
            addMessage('robot', response.data.message); 
        } catch (error) {
            console.error('Error fetching robot response:', error);
        }
    };

    return (
        <>
            <Navbar />
            <Background>
                <Box
                    width="100%"
                    display="flex"
                    alignItems="center"
                    justifyContent="space-between"
                    p="24px 0"
                >
                    <Dialog messages={messages} />


                    <Flex flexDirection="column" alignItems="center" gap={14}>
                        <InstructionCard />
                    
                        <AudioCard 
                            onAudioSubmit={(audioUrl: string) => {
                                addMessage('user', <audio controls src={audioUrl}></audio>);
                                getRobotResponse('Audio message');
                            }}
                        />
                    </Flex>
                    
                </Box>
            </Background>
        </>
    )
}
export default Interview;