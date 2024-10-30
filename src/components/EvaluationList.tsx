import { Box, Divider } from "@chakra-ui/react";
import EvaluationCard from "./EvaluationCard";
import InfoBlock from "./InfoBlock";
import { LoremIpsum } from 'react-lorem-ipsum';

const EvaluationList = () => {
    const num = 1;

    const infoList = [
        { label: 'Q', num: num, content: "This is a question for test" },
        { label: 'A', num: num, content: "This is an answer for test" }
    ];

    const evaluationList = [
        { 
            name: "voice", 
            list: [
                { label: "Intensity (DB)", content: <LoremIpsum/> },
                { label: "Word Per Minute", content: <LoremIpsum/> },
                { label: "Pitch", content: <LoremIpsum/>},
                { label: "Short pauses per minute", content: <LoremIpsum/> },
                { label: "Medium pauses per minute", content: <LoremIpsum/> },
                { label: "Long pauses per minute", content: <LoremIpsum/> }
            ]
        },
        { 
            name: "content", 
            list: [
                { label: "Score", content: <LoremIpsum/> },
                { label: "Reason", content: <LoremIpsum/> },
                { label: "Improvement", content: <LoremIpsum/> },
            ]
        }
    ];

    return(
        <Box 
            p={6} 
            boxShadow="2px 0px 10px rgba(3, 3, 3, 0.1)" 
            borderRadius="24px" 
            my={4}
        >
            {infoList.map((item, index) => (
                <Box key={index}>
                    <InfoBlock label={item.label} num={item.num} content={item.content} />
                    {index !== infoList.length - 1 && <Divider color="#d3d3d3" m={4} />}
                </Box>
            ))}
            {evaluationList.map((item, index) => (
                <EvaluationCard key={index} name={item.name} list={item.list} />
            ))}

        </Box>
    )
}

export default EvaluationList;