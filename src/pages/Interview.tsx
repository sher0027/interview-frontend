import Navbar from "../components/Navbar";
import Background from "../components/Background";
import { Box, Flex } from "@chakra-ui/react";
import Dialog from "../components/Dialog";
import AudioCard from "../components/AudioCard";
import InstructionCard from "../components/InstructionCard";

const Interview = () => {
    const rid = "1";
    
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
                    <Dialog rid={rid} />

                    <Flex flexDirection="column" alignItems="center" gap={14}>
                        <InstructionCard />
                    
                        <AudioCard/>
                    </Flex>
                    
                </Box>
            </Background>
        </>
    )
}
export default Interview;