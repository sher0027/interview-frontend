import { Image, Text, Heading, LinkBox, LinkOverlay } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

interface FeatureCardProps {
    imageSrc: string;
    title: string;
    description: string;
    linkTo: string; 
}

const FeatureCard = ({ imageSrc, title, description, linkTo }: FeatureCardProps) => {
    return (
        <LinkBox 
            as="article" 
            width="680px" 
            height="278px" 
            p={6} 
            boxShadow="2px 0px 10px rgba(3, 3, 3, 0.1)" 
            borderRadius="24px" 
            textAlign="center"
            _hover={{ boxShadow: "4px 0px 12px rgba(3, 3, 3, 0.2)" }} 
        >
            <Image 
                src={imageSrc} 
                alt={title} 
                borderRadius="full" 
                boxSize="150px" 
                mx="auto" 
                mb={4}
            />
            <Heading fontSize="24px" mb={2}>
                <LinkOverlay as={RouterLink} to={linkTo}>{title}</LinkOverlay>
            </Heading>
            <Text fontSize="16px" fontFamily="Montserrat, sans-serif">{description}</Text>
        </LinkBox>
    );
};

export default FeatureCard;
