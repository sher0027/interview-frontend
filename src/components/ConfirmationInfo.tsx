import { Box, Text, Button } from "@chakra-ui/react";

interface ConfirmationInfoProps {
    actionText: string;
    onConfirm: () => void;
    onCancel: () => void;
    isLoading?: boolean;
}

const ConfirmationInfo = ({ actionText, onConfirm, onCancel, isLoading = false }: ConfirmationInfoProps) => {
    return (
        <Box textAlign="center" p={6}>
            <Text fontSize="20px" mb={4}>
                Are you sure to {actionText}?
            </Text>
            <Button colorScheme="red" onClick={onConfirm} isLoading={isLoading}>
                Confirm
            </Button>
            <Button ml={4} onClick={onCancel} isDisabled={isLoading}>
                Cancel
            </Button>
        </Box>
    );
};

export default ConfirmationInfo;
