import { useState, useRef } from "react";
import { Box, Button, IconButton, Flex } from "@chakra-ui/react";
import { FaMicrophone, FaRedo, FaPaperPlane } from "react-icons/fa";
import { sendChatMessage, uploadAudio } from "../api/chat";
import LoadingCircle from "./LoadingCircle";

interface AudioRecorderProps {
    rid: string;
    onUploadComplete: () => void; 
}

const AudioRecorder = ({ rid, onUploadComplete }: AudioRecorderProps) => {
    const [isRecording, setIsRecording] = useState(false);
    const [audioUrl, setAudioUrl] = useState<string | null>(null);
    const [loading, setLoading] = useState(false); 
    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    const startRecording = async () => {
        setIsRecording(true);
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const mediaRecorder = new MediaRecorder(stream, { mimeType: "audio/webm" });
        mediaRecorderRef.current = mediaRecorder;

        const audioChunks: Blob[] = [];

        mediaRecorder.addEventListener("dataavailable", (event) => {
            audioChunks.push(event.data);
        });

        mediaRecorder.addEventListener("stop", () => {
            const audioBlob = new Blob(audioChunks, { type: "audio/webm" });
            const audioUrl = URL.createObjectURL(audioBlob);
            setAudioUrl(audioUrl);
        });

        mediaRecorder.start();
    };

    const stopRecording = () => {
        setIsRecording(false);
        if (mediaRecorderRef.current) mediaRecorderRef.current.stop();
    };

    const restartRecording = () => {
        setAudioUrl(null);
    };

    const sendAudio = async () => {
        if (audioUrl) {
            setLoading(true); 
            try {
                const response = await fetch(audioUrl);
                const blob = await response.blob();
                const audioFile = new File([blob], "audio.webm", { type: "audio/webm" });
                
                await Promise.all([
                    uploadAudio(audioFile, rid), 
                    sendChatMessage(rid)
                ]);
            
                onUploadComplete();

                URL.revokeObjectURL(audioUrl);
                setAudioUrl(null);  
            } catch (error) {
                console.error("Error uploading audio:", error);
            } finally {
                setLoading(false); 
            }
        }
    };

    return (
        <>
            {loading && <LoadingCircle />}
            <Flex justify="center">
                {isRecording ? (
                <Button colorScheme="red" onClick={stopRecording} leftIcon={<FaMicrophone />}>
                    Stop Recording
                </Button>
                ) : (
                <Button colorScheme="green" onClick={startRecording} leftIcon={<FaMicrophone />}>
                    Start Recording
                </Button>
                )}

                {audioUrl && !isRecording && (
                <Flex ml={4} gap={4}>
                    <IconButton
                        aria-label={"Send Audio"}
                        icon={<FaPaperPlane />}
                        onClick={sendAudio}
                        colorScheme={"teal"}
                    />
                    <IconButton
                        aria-label="Redo"
                        icon={<FaRedo />}
                        onClick={restartRecording}
                        colorScheme="teal"
                    />
                </Flex>
                )}
            </Flex>

            {audioUrl && (
                <Box mt={6}>
                    <audio ref={audioRef} src={audioUrl} controls />
                </Box>
            )}
        </>
    );
};

export default AudioRecorder;
