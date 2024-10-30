import { Alert, AlertIcon, AlertTitle, AlertDescription, Box } from "@chakra-ui/react";

interface MessageAlertProps {
    status: "error" | "success";
    message: string;
}

const MessageAlert = ({ status, message }: MessageAlertProps) => {
    return (
        <Box
            position="fixed"
            top="20px"  
            left="50%"
            transform="translateX(-50%)" 
            zIndex="5"
            width="fit-content"
        >
            <Alert status={status} borderRadius="md" boxShadow="lg">
                <AlertIcon />
                <AlertTitle>{status === "success" ? "Success!" : "Error"}</AlertTitle>
                <AlertDescription>{message}</AlertDescription>
            </Alert>
        </Box>
        
        
    );
};

export default MessageAlert;
