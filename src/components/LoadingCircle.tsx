import { Box, Spinner } from "@chakra-ui/react";

const LoadingCircle = () => {
    return (
        <Box
            position="fixed"
            top="0"
            left="0"
            width="100vw"
            height="100vh"
            display="flex"
            alignItems="center"
            justifyContent="center"
            bg="rgba(0, 0, 0, 0.4)" 
            zIndex="5"
        >
            <Spinner
                size="xl"
                speed="2s"
                thickness="5px"
                color="secondary"
                emptyColor="transparent"
                borderStyle="dashed"
                borderColor="primary"
                borderRadius="full"
            />
        </Box>
    );
}
export default LoadingCircle;