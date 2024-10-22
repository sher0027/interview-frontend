import { Heading, Text } from "@chakra-ui/react";
import Navbar from "../components/Navbar"
import FeatureList from "../components/FeatureList";
import Background from "../components/Background";

const Home = () => {
    return (
      <>
        <Navbar />
        <Background>

            <Heading fontSize="36px" mt={10}>Revolutionize Your Interview Experience</Heading>
            <Text 
                fontSize="20px" 
                maxW="760px"
                textAlign="center"
                mx="auto"
                mt={6}
            >
                Discover our AI-driven interview preparation tools, upload your resume for personalized analysis, and get actionable insights with our detailed interview ratings and analysis.
            </Text>
            <FeatureList></FeatureList>
        </Background>
      </>
    );
};

export default Home;