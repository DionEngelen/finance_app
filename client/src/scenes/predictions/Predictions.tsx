import DashboardBox from "@/components/DashboardBox";
import FlexBetween from "@/components/FlexBetween";
import { useGetKpisQuery } from "@/state/api";
import { Box, Button, Typography, useTheme } from "@mui/material";
import { useMemo, useState } from "react";
import { CartesianGrid, Label, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import regression, { DataPoint } from "regression";

const Predictions = () => {
    const { palette } = useTheme();
    const [isPredictions, setIsPredictions] = useState(false);
    const { data: kpis } = useGetKpisQuery();

    const formattedData = useMemo(() => {
        if (!kpis) return [];
        const monthData = kpis[0].monthlyData;
        const formatted: Array<DataPoint> = monthData.map(
            ({ revenue }, index: number) => {
                return [index, revenue];
            }
        );
        const regressionLine = regression.linear(formatted);
        return monthData.map(
            ({ month, revenue }, index: number) => {
                return {
                    name: month,
                    "Actual Revenue": revenue,
                    "Regression Line": regressionLine.points[index][1],
                    "Prediction Revenue": regressionLine.predict(index + 12)[1]
                };
            }
        );
    }, [kpis])

    return (
        <DashboardBox
            height="100%"
            width="100%"
            p="1rem"
            overflow="hidden">
            <FlexBetween
                m="1rem 2.5rem"
                gap="1rem">
                <Box>
                    <Typography variant="h3">Revenue and Predictions</Typography>
                    <Typography variant="h6">
                        Charted revenue based on a linear regression model
                    </Typography>
                </Box>
                <Button
                    onClick={() => setIsPredictions(!isPredictions)}
                    sx={{
                        color: palette.grey[900],
                        bgcolor: palette.grey[700],
                        boxShadow: "0.1rem 0.1rem 0.1rem 0.1rem rgba(0, 0, 0, 0.4)"
                    }}>
                    {isPredictions ? "Hide" : "Show"} Predicted Revenue for Next Year
                </Button>
            </FlexBetween>
            <ResponsiveContainer width="100%" height="100%">
                <LineChart
                    data={formattedData}
                    margin={{
                    top: 20,
                    right: 75,
                    left: 20,
                    bottom: 80,
                    }}>
                    <CartesianGrid
                        stroke={palette.grey[800]}
                        strokeDasharray="3 3" />
                    <XAxis
                        dataKey="name"
                        tickLine={false}
                        style={{ fontSize: "10px" }}>
                        <Label
                            value="month"
                            offset={-5}
                            position="insideBottom" />
                    </XAxis>
                    <YAxis
                        domain={[12000, 26000]}
                        orientation="left"
                        axisLine={{ strokeWidth: "0" }}
                        style={{ fontSize: "10px" }}
                        tickFormatter={v => `$${v}`}>
                        <Label
                            value="Revenue in USD"
                            angle={-90}
                            offset={-5}
                            position="insideLeft" />
                    </YAxis>
                    <Tooltip />
                    <Legend verticalAlign="top" />
                    <Line
                        type="monotone"
                        dataKey="Actual Revenue"
                        stroke={palette.primary.main}
                        strokeWidth={0}
                        dot={{ strokeWidth: 5 }} />
                    <Line
                        type="monotone"
                        dataKey="Regression Line"
                        stroke="#8884d8"
                        dot={false} />
                    {isPredictions
                    && (<Line
                        strokeDasharray="5 5"
                        dataKey="Prediction Revenue"
                        stroke={palette.secondary[500]} />)}
                </LineChart>
            </ResponsiveContainer>
        </DashboardBox>
    )
};

export default Predictions;
