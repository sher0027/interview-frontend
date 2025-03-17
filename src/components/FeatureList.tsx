import { Box, SimpleGrid } from "@chakra-ui/react";
import FeatureCard from "./FeatureCard";

const features = [
    {
      imageSrc: "/assets/interview.png", 
      title: "AI Interviews",
      description: "Practice with our AI-powered interview simulator to enhance your skills.",
      linkTo: "/interview"
    },
    // {
    //   imageSrc: "/assets/bg.jpg", 
    //   title: "Resume Upload",
    //   description: "Upload your resume for detailed feedback and optimization tips.",
    //   linkTo: "/resume"
    // },
    {
      imageSrc: "/assets/evaluation.png", 
      title: "Evaluation",
      description: "Receive evaluations based on your interview records and job descriptions (JD).",
      linkTo: "/evaluation"
    },
    // {
    //   imageSrc: "/assets/bg.jpg", 
    //   title: "Interview Analysis",
    //   description: "Review key insights and feedback from your past interviews.",
    //   linkTo: "/history"
    // },
];
  
  

const FeatureList = () => {
    return (
        <Box mt={10}>
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
                {features.map((feature, index) => (
                <FeatureCard 
                    key={index} 
                    imageSrc={feature.imageSrc} 
                    title={feature.title} 
                    description={feature.description} 
                    linkTo={feature.linkTo}
                />
                ))}
            </SimpleGrid>
        </Box>
    );
};

export default FeatureList;
