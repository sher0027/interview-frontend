import { Box, Divider } from "@chakra-ui/react";
import EvaluationCard from "./EvaluationCard";
import OverallEvaluationCard from "./OverallEvaluationCard";
import InfoBlock from "./InfoBlock";
import LoadingCircle from "./LoadingCircle";
import MessageAlert from "./MessageAlert";
import { useEffect, useState } from "react";
import { fetchEvaluation } from "../api/evaluation";
import { fetchRecord } from "../api/record";

const EvaluationList = ({ eid }: { eid: string }) => {
    const [combinedData, setCombinedData] = useState<
        {
            seq: number;
            info: { label: string; content: string }[];
            evaluations: { name: string; list: { label: string; content: string }[] }[];
        }[]
    >([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const [overallEvaluationData, setOverallEvaluationData] = useState<
        { scoreLabel: string; score: number; dimensionLabel: string; data: Record<string, { feedback: string; score: string }> }[]
    >([]);

    useEffect(() => {
        const loadEvaluationData = async () => {
            try {
                setLoading(true);
                setError(null);

                const [evaluationResponse, recordResponse] = await Promise.all([
                    fetchEvaluation(eid),
                    fetchRecord(eid),
                ]);

                if (
                    evaluationResponse.status === 200 &&
                    evaluationResponse.data?.evaluations &&
                    recordResponse.status === 200 &&
                    recordResponse.data?.records
                ) {
                    const evaluations = evaluationResponse.data.evaluations;

                    // Process overall evaluation
                    const overallEvaluation = evaluations.find((evaluation: any) => evaluation.seq === "0");
                    if (overallEvaluation) {
                        const overallData = [
                            {
                                scoreLabel: "Acoustic Overall",
                                score: parseFloat(overallEvaluation.acoustic.comprehensive_score || "0"),
                                dimensionLabel: "Acoustic Dimensions",
                                data: Object.entries(overallEvaluation.acoustic.dimensions || {}).reduce(
                                    (acc: Record<string, { feedback: string; score: string }>, [key, value]: [string, any]) => {
                                        acc[key] = {
                                            feedback: value.feedback || "No feedback provided",
                                            score: value.score || "0", 
                                        };
                                        return acc;
                                    },
                                    {}
                                ),
                            },
                            {
                                scoreLabel: "Content Overall",
                                score: parseFloat(overallEvaluation.content.comprehensive_score || "0"),
                                dimensionLabel: "Content Dimensions",
                                data: Object.entries(overallEvaluation.content.scores_by_aspect || {}).reduce(
                                    (acc: Record<string, { feedback: string; score: string }>, [key, value]: [string, any]) => {
                                        acc[key] = {
                                            feedback: value.feedback || "No feedback provided",
                                            score: value.score || "0", 
                                        };
                                        return acc;
                                    },
                                    {}
                                ),
                            },
                        ];

                        setOverallEvaluationData(overallData);
                    }

                    const individualData = evaluations
                    .filter((evaluation: any) => evaluation.seq != 0)
                    .map((evaluation: any) => {
                        const seq = evaluation.seq;
                        const question = evaluation.question || "No question available"; 
                        const answer = evaluation.answer || "No reply available"; 
                
                        const evaluationDetails = evaluation.acoustic || evaluation.content
                            ? [
                                  {
                                      name: "Acoustic",
                                      list: [
                                          {
                                              label: "Intensity (dB)",
                                              content: evaluation.acoustic?.evaluation_result?.intensity || "N/A",
                                          },
                                          {
                                              label: "Pitch (Hz)",
                                              content: evaluation.acoustic?.evaluation_result?.pitch || "N/A",
                                          },
                                          {
                                              label: "Short Pauses/Min",
                                              content: evaluation.acoustic?.evaluation_result?.pauses?.short_pauses_per_minute || "N/A",
                                          },
                                          {
                                              label: "Medium Pauses/Min",
                                              content: evaluation.acoustic?.evaluation_result?.pauses?.medium_pauses_per_minute || "N/A",
                                          },
                                          {
                                              label: "Long Pauses/Min",
                                              content: evaluation.acoustic?.evaluation_result?.pauses?.long_pauses_per_minute || "N/A",
                                          },
                                      ],
                                  },
                                  {
                                      name: "Content",
                                      list: [
                                          {
                                              label: "Score",
                                              content: evaluation.content?.score || "N/A",
                                          },
                                          {
                                              label: "Feedback",
                                              content: evaluation.content?.feedback || "No feedback available",
                                          },
                                      ],
                                  },
                              ]
                            : [];

                        return {
                            seq,
                            info: [
                                { label: "Q", content: question },
                                { label: "A", content: answer },
                            ],
                            evaluations: evaluationDetails,
                        };
                    });

                    setCombinedData(individualData);
                } else {
                    setError("Failed to fetch evaluation or transcript data.");
                }
            } catch (err) {
                console.error("Error fetching evaluation or transcript data:", err);
                setError("An error occurred while fetching data.");
            } finally {
                setLoading(false);
            }
        };

        loadEvaluationData();
    }, [eid]);

    return (
        <Box p={6} boxShadow="2px 0px 10px rgba(3, 3, 3, 0.1)" borderRadius="24px" my={4} width="1440px">
            {loading && <LoadingCircle />}
            {error && <MessageAlert status="error" message={error} />}
            {!loading && !error && (
                <>
                    <OverallEvaluationCard evaluations={overallEvaluationData} />

                    {combinedData.map((data) => (
                        <Box key={data.seq} my={6}>
                            {data.info.map((item, index) => (
                                <Box key={index}>
                                    <InfoBlock label={item.label} num={data.seq} content={item.content} />
                                    {index !== data.info.length - 1 && <Divider color="#d3d3d3" my={4} />}
                                </Box>
                            ))}
                            {data.evaluations.map((evaluation, index) => (
                                <EvaluationCard key={index} name={evaluation.name} list={evaluation.list} />
                            ))}
                        </Box>
                    ))}
                </>
            )}
        </Box>
    );
};

export default EvaluationList;
