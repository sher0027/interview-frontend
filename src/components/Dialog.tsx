import { Box, Text, Icon, useDisclosure } from "@chakra-ui/react";
import { FaRobot, FaUser } from "react-icons/fa";
import { useState, useEffect, useRef, useImperativeHandle, forwardRef } from "react";
import { fetchRecord, updateRecordStatus } from "../api/record";
import InfoModal from "./InfoModal";
import LoadingCircle from "./LoadingCircle";
import ConfirmationInfo from "./ConfirmationInfo";
import { evaluate } from "../api/evaluation";
import { useNavigate } from "react-router-dom";

interface Message {
    sender: "robot" | "user";
    content: JSX.Element | string;
}

interface DialogProps {
    rid: string;
}

export interface DialogHandle {
    refreshMessages: () => void;
}

const Dialog = forwardRef<DialogHandle, DialogProps>(({ rid }, ref) => {
    const [messages, setMessages] = useState<Message[]>([
        { sender: "robot", content: "Hello! How can I help you today?" },
    ]);
    const [loading, setLoading] = useState(false); 
    const hasLoadedRecords = useRef(false);
    const { isOpen, onOpen, onClose } = useDisclosure();

    const speakText = (text: string) => {
        if ("speechSynthesis" in window) {
            const utterance = new SpeechSynthesisUtterance(text);
            window.speechSynthesis.speak(utterance);
        } else {
            console.warn("Speech synthesis not supported in this browser.");
        }
    };

    const addMessage = (sender: "robot" | "user", content: string | JSX.Element) => {
        setMessages((prevMessages) => [...prevMessages, { sender, content }]);
    };

    const loadMessagesFromRecords = async () => {
        try {
            setLoading(true);
            const response = await fetchRecord(rid);
            const records = response.data.records;
            let lastRobotMessage: string | null = null;

            records.forEach((record: { transcript: string | JSX.Element; reply: string | JSX.Element }) => {
                ["transcript", "reply"].forEach((key) => {
                    const content = record[key as "transcript" | "reply"];
                    const sender = key === "transcript" ? "user" : "robot";

                    if (content) {
                        addMessage(sender, content);
                        if (sender === "robot" && typeof content === "string") {
                            lastRobotMessage = content;
                        }
                    }
                });
            });

            if (lastRobotMessage) {
                speakText(lastRobotMessage);
            }
        } catch (error) {
            console.error("Error loading records:", error);
        } finally {
            setLoading(false);
        }
    };

    useImperativeHandle(ref, () => ({
        refreshMessages: loadMessagesFromRecords,
    }));

    useEffect(() => {
        if (!hasLoadedRecords.current) {
            loadMessagesFromRecords();
            hasLoadedRecords.current = true;
        }
    }, [rid]);

    const handleEndInterview = async () => {
        const navigate = useNavigate();
        try {
            setLoading(true);
            const response = await updateRecordStatus(rid, "completed");
            if (response.status === 200) {
                alert("Interview has been successfully ended.");
                // Trigger evaluation after ending the interview
                const evaluationResponse = await evaluate(rid);
                if (evaluationResponse.status === 200) {
                    alert("Evaluation has been successfully triggered.");
                    navigate(`/evaluation`);
                } else {
                    alert("Failed to trigger evaluation.");
                }
            } else {
                alert("Failed to end the interview.");
            }
        } catch (error) {
            console.error("Error ending interview:", error);
            alert("An error occurred while ending the interview.");
        } finally {
            setLoading(false);
            onClose();
        }
    };

    return (
        <Box
            width="950px"
            height="700px"
            boxShadow="2px 0px 10px rgba(3, 3, 3, 0.1)"
            borderRadius="24px"
            p={6}
        >
            {loading && <LoadingCircle />} 
            <Text fontSize="24px">Chat with AI</Text>
            <Box
                height="584px"
                overflowY="auto"
                sx={{
                    "::-webkit-scrollbar": {
                        display: "none",
                    },
                    scrollbarWidth: "none",
                    msOverflowStyle: "none",
                }}
            >
                {messages.map((message, index) => (
                    <Box
                        key={index}
                        maxW="100%"
                        p={4}
                        bgColor={message.sender === "robot" ? "secondary" : "primary"}
                        display="inline-flex"
                        marginY={4}
                        borderRadius="24px"
                        sx={{
                            float: message.sender === "robot" ? "left" : "right",
                            clear: "both",
                        }}
                    >
                        {message.sender === "robot" && (
                            <Icon as={FaRobot} w={7} h={7} color="primary" mr={2} />
                        )}

                        <Text fontSize="20px" color={message.sender === "user" ? "white" : "black"} textAlign="justify">
                            {message.content}
                        </Text>

                        {message.sender === "user" && (
                            <Icon as={FaUser} w={7} h={7} color="secondary" ml={2} />
                        )}
                    </Box>
                ))}
            </Box>
            <Text
                fontSize="24px"
                textAlign="center"
                color="secondary"
                textDecoration="underline"
                cursor="pointer"
                _hover={{
                    color: "primary",
                }}
                onClick={onOpen}
            >
                End Interview
            </Text>

            <InfoModal isOpen={isOpen} onClose={onClose}>
                <ConfirmationInfo
                    actionText="end the interview"
                    onConfirm={handleEndInterview}
                    onCancel={onClose}
                    isLoading={loading}
                />
            </InfoModal>
        </Box>
    );
});

export default Dialog;
