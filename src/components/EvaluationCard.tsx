import { 
    Box, 
    Flex, 
    Heading, 
    SimpleGrid, 
    Text, 
    Progress 
} from "@chakra-ui/react";

interface EvaluationCardProps {
    name: string;
    list: { label: string; content: string | JSX.Element }[];
}

const EvaluationCard = ({ name, list }: EvaluationCardProps) => {
    return (
        <Box
            p={6}
            borderRadius="24px"
            boxShadow="0 4px 10px rgba(0, 0, 0, 0.1)"
            my={6}
            bg="white"
        >
            <Flex flexDirection="column" alignItems="center">
                <Heading my={4} fontSize="24px" color="gray.700">
                    {name}
                </Heading>

                <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8} w="100%">
                    {list.map((item, index) => (
                        <Box key={index} mt={2}>
                            <Text fontWeight="medium" fontSize="sm" color="gray.600">
                                {item.label}:
                            </Text>
                            {typeof item.content === "string" && !isNaN(Number(item.content)) ? (
                                <Box position="relative" w="100%" mt={2}>
                                    <Progress
                                        value={Number(item.content)}
                                        height="16px"
                                        borderRadius="8px"
                                        bg="secondary"
                                        sx={{
                                            "& > div": {
                                                backgroundColor: "primary", 
                                            },
                                        }}
                                    />
                                    <Text
                                        position="absolute"
                                        top="50%"
                                        left="50%"
                                        transform="translate(-50%, -50%)"
                                        fontSize="xs"
                                        fontWeight="bold"
                                        color="white"
                                    >
                                        {Number(item.content)}
                                    </Text>
                                </Box>
                            ) : (
                                <Text mt={2} textAlign="justify" fontSize="sm" color="gray.700">
                                    {item.content}
                                </Text>
                            )}
                        </Box>
                    ))}
                </SimpleGrid>
            </Flex>
        </Box>
    );
};

export default EvaluationCard;
