import { Box, CircularProgress, CircularProgressLabel, Text, Flex } from "@chakra-ui/react";
import BarChart from "./BarChart";

interface OverallEvaluationProps {
    evaluations: {
        scoreLabel: string;
        score: number;
        dimensionLabel: string;
        data: Record<string, { feedback: string; score: string }>;
    }[];
}

const OverallEvaluationCard = ({ evaluations }: OverallEvaluationProps) => {
    return (
        <Box>
            {evaluations.map((evaluation, index) => (
                <Flex
                    key={index}
                    align="center"
                    justify="space-between"
                    p={4}
                    mb={8}
                    flexWrap="wrap"
                    bg="white"
                    boxShadow="sm"
                    borderRadius="md"
                >
                    {/* Circular Progress Section */}
                    <Box textAlign="center" mx={4}>
                        <CircularProgress
                            value={evaluation.score * 10}
                            size="150px"
                            thickness="10px"
                            color="primary"
                            trackColor="secondary"
                        >
                            <CircularProgressLabel fontFamily="Montserrat, sans-serif" fontSize="20px">
                                {evaluation.score.toFixed(1)}
                            </CircularProgressLabel>
                        </CircularProgress>
                        <Text mt={4} fontWeight="bold" fontSize="lg">
                            {evaluation.scoreLabel}
                        </Text>
                    </Box>

                    {/* ECharts Bar Chart Section */}
                    <Box flex="1" mx={4}>
                        <BarChart
                            title={evaluation.dimensionLabel}
                            data={{
                                labels: Object.keys(evaluation.data),
                                values: Object.values(evaluation.data).map((item) => parseFloat(item.score)),
                                feedbacks: Object.values(evaluation.data).map((item) => item.feedback),
                            }}
                        />
                        <Text mt={4} fontWeight="bold" textAlign="center" fontSize="lg">
                            {evaluation.dimensionLabel}
                        </Text>
                    </Box>
                </Flex>
            ))}
        </Box>
    );
};

export default OverallEvaluationCard;
