import { useState, useRef } from "react";
import { Box, Button, IconButton, Flex } from "@chakra-ui/react";
import { FaMicrophone, FaRedo, FaPaperPlane } from "react-icons/fa";
import { sendChatMessage, uploadAudio } from "../api/chat";

const AudioRecorder = () => {
    const rid = "1"
    const [isRecording, setIsRecording] = useState(false);
    const [audioUrl, setAudioUrl] = useState<string | null>(null);
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
            try {
                const response = await fetch(audioUrl);
                const blob = await response.blob();
                const audioFile = new File([blob], "audio.webm", { type: "audio/webm" });
                await uploadAudio(audioFile, rid);
                await sendChatMessage(rid);
                URL.revokeObjectURL(audioUrl);
                setAudioUrl(null);  
            } catch (error) {
                console.error("Error uploading audio:", error);
            }
        }
    };

    return (
        <>
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
