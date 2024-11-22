import {
    Box,
    Flex,
    Heading,
    SimpleGrid,
    Text,
    Tooltip,
} from "@chakra-ui/react";

interface EvaluationCardProps {
    name: string;
    list: {
    label: string;
    content: string | JSX.Element; 
    unit?: string; 
    range?: string; 
    desiredRange?: string; 
    }[];
}

const RangeText = ({
    value,
    unit,
    color,
}: {
    value: number | null;
    unit: string;
    color: string;
}) => (
    <Text fontSize="xs" color={color}>
    {value} {unit}
    </Text>
);
  
  

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
            <Heading my={4} fontSize="24px" color="gray.700">{name}</Heading>

            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8} w="100%">
                {list.map((item, index) => {
                const isNumericContent =
                    typeof item.content === "string" && !isNaN(Number(item.content));
                const value = isNumericContent ? Number(item.content) : null;

                const [rangeStart, rangeEnd] = item.range
                    ? item.range.split("-").map(Number)
                    : [null, null];

                const [desiredStart, desiredEnd] = item.desiredRange
                    ? item.desiredRange.split("-").map(Number)
                    : [null, null];

                const valuePosition =
                    rangeStart !== null && rangeEnd !== null && value !== null
                    ? ((value - rangeStart) / (rangeEnd - rangeStart)) * 100
                    : 0;

                const desiredPositionStart =
                    rangeStart !== null &&
                    rangeEnd !== null &&
                    desiredStart !== null
                    ? ((desiredStart - rangeStart) / (rangeEnd - rangeStart)) * 100
                    : 0;

                const desiredPositionEnd =
                    rangeStart !== null &&
                    rangeEnd !== null &&
                    desiredEnd !== null
                    ? ((desiredEnd - rangeStart) / (rangeEnd - rangeStart)) * 100
                    : 0;

                return (
                    <Flex key={index} mt={4} flexDirection="column" justifyContent="center">
                        <Text fontWeight="medium" fontSize="sm" color="gray.600" mb={1}>{item.label}: </Text>
                        {isNumericContent ? (
                            // Render progress bar for numeric content
                            <Box
                                position="relative"
                                w="100%"
                                height="16px"
                                bg="secondary"
                                borderRadius="8px"
                            >
                            {desiredStart !== null && desiredEnd !== null && (
                                <Box
                                    position="absolute"
                                    left={`${desiredPositionStart}%`}
                                    width={`${desiredPositionEnd - desiredPositionStart}%`}
                                    height="100%"
                                    bg="primary"
                                    borderRadius="8px"
                                    zIndex={1}
                                />
                            )}

                            {value !== null && (
                                <Tooltip label={`${value} ${item.unit}`} placement="top">
                                <Box
                                    position="absolute"
                                    top="50%"
                                    left={`${valuePosition}%`}
                                    transform="translate(-50%, -50%)"
                                    width="4px"
                                    height="16px"
                                    bg="#D1E8FF"
                                    borderRadius="4px"
                                    boxShadow="0 0 4px rgba(0, 0, 0, 0.2)"
                                    zIndex={3}
                                />
                                </Tooltip>
                            )}
                            </Box>
                        ) : (
                            // Render plain text for non-numeric content
                            <Text mt={2} fontSize="sm" color="gray.700" textAlign="justify">{item.content}</Text>
                        )}
                        {item.range && isNumericContent && (
                        <Box position="relative" mt={1}>
                            <Flex justify="space-between">
                            {rangeStart !== desiredStart && (
                                <RangeText value={rangeStart} unit={item.unit || ""} color="gray.500" />
                            )}
                            {rangeEnd !== desiredEnd && (
                                <RangeText value={rangeEnd} unit={item.unit || ""} color="gray.500" />
                            )}
                            </Flex>

                            {item.desiredRange && (
                            <Box position="relative" w="100%">
                                <Text
                                    fontSize="xs"
                                    color="black"
                                    position="absolute"
                                    top="-18px"
                                    left={`${desiredPositionStart}%`}
                                    transform="translateX(-50%)"
                                >
                                {desiredStart} {item.unit}
                                </Text>

                                <Text
                                    fontSize="xs"
                                    color="black"
                                    position="absolute"
                                    top="-18px"
                                    left={`${desiredPositionEnd}%`}
                                    transform="translateX(-50%)"
                                >
                                {desiredEnd} {item.unit}
                                </Text>
                            </Box>
                            )}
                        </Box>
                        )}
                    </Flex>
                    );
                })}
            </SimpleGrid>
        </Flex>
    </Box>
    );
};

export default EvaluationCard;