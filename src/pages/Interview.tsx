import Navbar from "../components/Navbar";
import Background from "../components/Background";
import { Box, Flex } from "@chakra-ui/react";
import Dialog from "../components/Dialog";
import AudioCard from "../components/AudioCard";
import { useRef } from "react";
import InstructionCard from "../components/InstructionCard";

const Interview = () => {
    const rid = "1";
    const dialogRef = useRef<{ refreshMessages: () => void }>(null);

    const refreshDialogMessages = () => {
        if (dialogRef.current) {
            dialogRef.current.refreshMessages(); 
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
                    <Dialog ref={dialogRef} rid={rid} />

                    <Flex flexDirection="column" alignItems="center" gap={14}>
                        <InstructionCard />
                        <AudioCard rid={rid} onUploadComplete={refreshDialogMessages} />
                    </Flex>
                    
                </Box>
            </Background>
        </>
    )
}

export default Interview;
