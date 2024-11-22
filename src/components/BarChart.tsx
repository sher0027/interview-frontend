import { useEffect, useRef } from "react";
import * as echarts from "echarts";

interface BarChartProps {
    title: string;
    data: {
        labels: string[];
        values: number[];
        feedbacks: string[];
    };
}

const BarChart = ({ title, data }: BarChartProps) => {
    const chartRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (chartRef.current) {
            const chartInstance = echarts.init(chartRef.current);

            const options = {
                title: {
                    text: title,
                    left: "center",
                },
                tooltip: {
                    trigger: "axis", // Triggers tooltip on hover
                    formatter: (params: any) => {
                        const index = params[0].dataIndex; // Get the index of the hovered bar
                        return `
                            <div style="max-width: 200px; word-wrap: break-word; white-space: normal; font-size: 12px;">
                                <strong>${data.labels[index]}</strong><br />
                                Score: ${data.values[index]}<br />
                                Feedback: ${data.feedbacks[index]}
                            </div>
                        `;
                    },
                    backgroundColor: "#fff", // Optional: Set a background color
                    borderColor: "#ccc", // Optional: Set a border color
                    borderWidth: 1, // Optional: Add a border width
                    textStyle: {
                        color: "#333", // Optional: Set text color
                        fontSize: 12, // Adjust font size
                    },
                },
                
                xAxis: {
                    type: "category",
                    data: data.labels,
                },
                yAxis: {
                    type: "value",
                },
                series: [
                    {
                        name: "Score",
                        type: "bar",
                        data: data.values,
                        itemStyle: {
                            color: "#396ec8", // Customize bar color
                        },
                    },
                ],
            };

            chartInstance.setOption(options);

            // Clean up chart instance on unmount
            return () => {
                chartInstance.dispose();
            };
        }
    }, [data, title]);

    return <div ref={chartRef} style={{ width: "100%", height: "300px" }} />;
};

export default BarChart;
