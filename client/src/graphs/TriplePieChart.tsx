import FlexBetween from "@/components/FlexBetween";
import { Box, Typography, useTheme } from "@mui/material";
import { GetKpisResponse } from "@/state/types";
import { useMemo } from "react";
import { Cell, Pie, PieChart } from "recharts";

type Props = {
    data: GetKpisResponse[] | undefined;
};

const TriplePieChart = ({ data }: Props) => {
    const { palette } = useTheme();
    const pieColors = [palette.primary[800], palette.primary[300]];

    const pieChartData = useMemo(() => {
        if (data) {
            const totalExpenses = data[0].totalExpenses;
            return Object.entries(data[0].expensesByCategory)
                .map(([key, value]) => {
                    return [{
                        name: key,
                        value
                    }, {
                        name: `${key} of Total`,
                        value: totalExpenses - value
                    }]
                });
        }
    }, [data])

    return (
        <FlexBetween
            mt="0.2rem"
            gap="0.5rem"
            p="0 1rem"
            textAlign="center">
            {pieChartData?.map((data, index) => (
                <Box key={`${data[0].name}-${index}`}>
                    <PieChart width={80} height={74}>
                        <Pie
                        stroke="none"
                        data={data}
                        innerRadius={10}
                        outerRadius={24}
                        paddingAngle={2}
                        dataKey="value"
                        >
                        {data.map((entry, index) => (
                            <Cell key={`cell-${entry.name}`} fill={pieColors[index]} />
                        ))}
                        </Pie>
                    </PieChart>
                    <Typography variant="h5">
                        {data[0].name}
                    </Typography>
                </Box>
            ))}
        </FlexBetween>
    )
}

export default TriplePieChart
