import BoxHeader from '@/components/BoxHeader';
import FlexBetween from '@/components/FlexBetween';
import { Box, Typography, useTheme } from '@mui/material';
import { Cell, Pie, PieChart } from 'recharts';

type Props = {
    title: string;
    sideText: string
};

const pieData = [
    { name: "Group A", value: 600 },
    { name: "Group B", value: 400 }
];

const PieChartWithPaddingAngle = ({ title, sideText }: Props) => {
    const { palette } = useTheme();
    const pieColors = [palette.primary[800], palette.primary[300]];

    return (
        <>
            <BoxHeader
                title={title}
                sideText={sideText} />
            <FlexBetween
                mt="0.25rem"
                gap="1.5rem"
                p="0 1rem 0 0">
                <PieChart
                    width={110}
                    height={100}
                    margin={{
                        top: 0,
                        right: -10,
                        left: 10,
                        bottom: 0
                    }}>
                    <Pie
                        data={pieData}
                        stroke="none"
                        innerRadius={18}
                        outerRadius={38}
                        paddingAngle={2}
                        dataKey="value">
                        {pieData.map((entry, index) => (
                            <Cell
                                key={`cell-${entry.name}`}
                                fill={pieColors[index]} />
                        ))}
                    </Pie>
                </PieChart>
                <Box
                    ml="-0.7rem"
                    flexBasis="40%"
                    textAlign="center">
                    <Typography variant="h5">Target Sales</Typography>
                    <Typography
                        variant="h5"
                        m="0.3rem"
                        color={palette.primary[300]}>
                        83
                    </Typography>
                    <Typography variant="h6">
                        Finance goals of the campaign that are desired
                    </Typography>
                </Box>
                <Box flexBasis="40%">
                    <Typography variant="h5">Losses in Revenue</Typography>
                    <Typography variant="h6">Losses are down 25%</Typography>
                    <Typography
                        variant="h5"
                        mt="0.4rem">
                        Profit Margins
                    </Typography>
                    <Typography variant="h6">Margins are up by 30%</Typography>
                </Box>
            </FlexBetween>
        </>
    )
}

export default PieChartWithPaddingAngle;
