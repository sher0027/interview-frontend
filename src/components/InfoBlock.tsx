import { Flex, Heading, Text } from "@chakra-ui/react";

interface InfoBlockProps {
    label: string;
    num: number;
    content: JSX.Element | string;
}

const InfoBlock = ({ label, num, content }: InfoBlockProps) => {
    return (
        <Flex>
            <Heading mr={4} fontSize="24px">{label}{num}:</Heading>
            {typeof content === "string" ? (
                <Text fontSize="20px">{content}</Text>
            ) : (
                content
            )}
        </Flex>
    );
};

export default InfoBlock;
