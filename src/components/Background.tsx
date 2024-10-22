import { Box} from "@chakra-ui/react";
import { ReactNode } from "react";


interface BackgroundProps {
    children: ReactNode;
}

const Background = ({ children }: BackgroundProps) =>{
    return(
        <Box
            minH="100vh"
            width="100vw"
            p="64px 32px" 
            display="flex" 
            alignItems="center"
            flexDirection="column"
        >
            {children}
        </Box>
    )
}
export default Background;