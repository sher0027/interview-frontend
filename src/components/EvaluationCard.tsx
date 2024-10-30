import { Box, CircularProgress, CircularProgressLabel, Flex, Heading, SimpleGrid, Text } from "@chakra-ui/react";

interface EvaluationCardProps {
    name: string;
    list: { label: string; content: string | JSX.Element  }[]; 
}

const EvaluationCard = ({name, list}: EvaluationCardProps) =>{
    return(
        <Box
            p={6}
            borderRadius="24px"
            boxShadow="2px 0px 10px rgba(3, 3, 3, 0.1)" 
            my={6}
        >
            <Flex flexDirection="column" alignItems="center">
                <Heading my={2} fontSize="24px">{name}</Heading>
                <CircularProgress
                    value={80}
                    size="150px" 
                    thickness="10px" 
                    color="primary" 
                    trackColor="secondary"
                    mb={4}
                >
                    <CircularProgressLabel fontFamily="Montserrat, sans-serif">8/10</CircularProgressLabel>
                </CircularProgress>
                <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
                    {list.map((item, index) => (
                        <Box key={index} mt={2}>
                            <Text fontWeight="medium">{item.label}:</Text>
                            <Text textAlign="justify">{item.content}</Text>
                        </Box>
                    ))}
                </SimpleGrid>
            </Flex> 
            
        </Box>
    )
}

export default EvaluationCard;