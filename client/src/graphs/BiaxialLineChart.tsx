import BoxHeader from "@/components/BoxHeader";
import { GetKpisResponse } from "@/state/types";
import { useTheme } from "@mui/material";
import { useMemo } from "react";
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

type Props = {
    data: GetKpisResponse[] | undefined;
    graphTitle: string
    title: string;
    subtitle?: string;
    sideText: string;
    icon?: React.ReactNode;
}

const BiaxialLineChart = ({ data, graphTitle, title, subtitle, sideText }: Props) => {
    const { palette } = useTheme();

    const revenueProfit = useMemo(() => {
        return (
            data
            && data[0].monthlyData.map(({ month, revenue, expenses}) => {
                return {
                    name: month.substring(0, 3),
                    revenue,
                    profit: (revenue - expenses).toFixed(2)
                }
            })
        );
    }, [data]);

    const operationalExpenses = useMemo(() => {
        return (
            data
            && data[0].monthlyData.map(({ month, operationalExpenses, nonOperationalExpenses}) => {
                return {
                    name: month.substring(0, 3),
                    "Operational Expenses": operationalExpenses,
                    "Non Operational Expenses": nonOperationalExpenses
                }
            })
        );
    }, [data]);

    const checkWhichGraph = () => {
        if (graphTitle === "b") {
            return revenueProfit
        }
        return operationalExpenses
    }

    return (
        <>
            <BoxHeader
                title={title}
                subtitle={subtitle}
                sideText={sideText} />
            <ResponsiveContainer width="100%" height="100%">
                <LineChart
                    data={checkWhichGraph()}
                    margin={{
                    top: 20,
                    right: 0,
                    left: -10,
                    bottom: 55,
                    }}>
                    <CartesianGrid
                        vertical={false}
                        stroke={palette.grey[800]} />
                    <XAxis
                        dataKey="name"
                        tickLine={false}
                        style={{ fontSize: "10px" }} />
                    <YAxis
                        yAxisId="left"
                        orientation="left"
                        tickLine={false}
                        axisLine={false}
                        style={{ fontSize: "10px" }} />
                    <YAxis
                        yAxisId="right"
                        orientation="right"
                        tickLine={false}
                        axisLine={false}
                        style={{ fontSize: "10px" }} />
                    <Tooltip />
                    {graphTitle === "b" && <Legend
                        height={20}
                        wrapperStyle={{
                            margin: "0 0 10px 0"
                        }} />}
                    <Line
                        yAxisId="left"
                        type="monotone"
                        dataKey={graphTitle === "b" ? "profit" : "Non Operational Expenses"}
                        stroke={palette.tertiary[500]} />
                    <Line
                        yAxisId="right"
                        type="monotone"
                        dataKey={graphTitle === "b" ? "revenue" : "Operational Expenses"}
                        stroke={palette.primary.main} />
                </LineChart>
            </ResponsiveContainer>
        </>
    )
}

export default BiaxialLineChart;
