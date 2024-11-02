import { Box, Text, Flex, Button } from "@chakra-ui/react";
import { useState } from "react";
import InfoModal from "../components/InfoModal";
import ResumeInfo from "../components/ResumeInfo";
import CompanyInfo from "../components/CompanyInfo";

const InstructionCard = () => {
    const [modalStates, setModalStates] = useState([false, false]);

    const openModal = (index: number) => {
        setModalStates((prev) => prev.map((isOpen, i) => (i === index ? true : isOpen)));
    };

    const closeModal = (index: number) => {
        setModalStates((prev) => prev.map((isOpen, i) => (i === index ? false : isOpen)));
    };

    const modals = [
        {
            buttonText: "Upload Resume",
            content: <ResumeInfo />,
        },
        {
            buttonText: "Input Target Role",
            content: <CompanyInfo />,
        },
    ];

    return (
        <Box
            width="460px"
            boxShadow="2px 0px 10px rgba(3, 3, 3, 0.1)"
            borderRadius="24px"
            p={6}
        >
            <Text fontSize="24px" mb={4}>Instructions</Text>
            <Text fontSize="16px">Please provide the following information to start your interview journey!</Text>
            <Flex justifyContent="space-around" marginY={5}>
                {modals.map((modal, index) => (
                    <Box key={index}>
                        <Button onClick={() => openModal(index)} variant={index === 1 ? "outline" : "solid"}>
                            {modal.buttonText}
                        </Button>
                        <InfoModal
                            isOpen={modalStates[index]}
                            onClose={() => closeModal(index)}
                        >
                            {modal.content}
                        </InfoModal>
                    </Box>
                ))}
            </Flex>
        </Box>
    );
};

export default InstructionCard;
