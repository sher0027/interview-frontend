import { Box, Text } from "@chakra-ui/react";
import AudioRecorder from "./AudioRecorder";

interface AudioCardProps {
    rid: string;
    onUploadComplete: () => void;
}
  
const AudioCard = ({ rid, onUploadComplete }: AudioCardProps) => {
    return (
        <Box
            width="460px"
            boxShadow="2px 0px 10px rgba(3, 3, 3, 0.1)"
            borderRadius="24px"
            p={6}
        >
            <Text fontSize="24px" mb={4}>Audio Input</Text>
            <Text fontSize="16px">Click the button below to start speaking.</Text>
            <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                marginY={5}
            >
                <AudioRecorder rid={rid} onUploadComplete={onUploadComplete} />
            </Box>
        </Box>
    );
}

export default AudioCard;