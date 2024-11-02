import { Box, Icon, Text, HStack, Link} from "@chakra-ui/react";
import { Link as RouterLink,  useLocation} from "react-router-dom";
import { FaMicrophone } from 'react-icons/fa';

const Navbar = () => {
    const location = useLocation();

    const navLinks = [
        { path: "/home", label: "Home" },
        { path: "/interview", label: "Interview" },
        // { path: "/resume", label: "Resume" },
        { path: "/evaluation", label: "Evaluation" },
        // { path: "/history", label: "History" },
    ];

    return (
        <Box 
            width="100vw" 
            height="64px"
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            boxShadow="2px -2px 10px rgba(3, 3, 3, 0.1)"
            position="fixed"
            bgColor="white"
            p={4}
        >
            <Link as={RouterLink} to="/">
                <Icon as={FaMicrophone} w={6} h={6} mr={2} color="primary" />
                <Text fontSize="24px">AI Interview</Text>
            </Link>
            
            <HStack spacing={8}>
                {navLinks.map((navItem, index) => (
                <Link 
                    key={index} 
                    as={RouterLink}
                    to={navItem.path}
                    color={location.pathname === navItem.path ? "primary" : "#030303"}
                    mr={4}
                >
                    {navItem.label}
                </Link>
                ))}
            </HStack>
        </Box>
    );
};

export default Navbar;
