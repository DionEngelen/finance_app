import BoxHeader from "@/components/BoxHeader";
import { GetProductsResponse } from "@/state/types";
import { useTheme } from "@mui/material";
import { useMemo } from "react";
import { CartesianGrid, ResponsiveContainer, Scatter, ScatterChart, Tooltip, XAxis, YAxis, ZAxis } from "recharts";

type Props = {
    data: GetProductsResponse[] | undefined
    title: string;
    sideText: string;
};

const SimpleScatterChart = ({ data, title, sideText}: Props) => {
    const { palette } = useTheme();

    const productExpenseData = useMemo(() => {
        return (
            data
            && data.map(({ _id, price, expense }) => {
                return {
                    id: _id,
                    price,
                    expense
                }
            })
        );
    }, [data]);

    return (
        <>
            <BoxHeader
                title={title}
                sideText={sideText} />
            <ResponsiveContainer width="100%" height="100%">
                <ScatterChart
                margin={{
                    top: 20,
                    right: 25,
                    bottom: 40,
                    left: -10,
                }}
                >
                    <CartesianGrid stroke={palette.grey[800]} />
                    <XAxis
                        type="number"
                        dataKey="price"
                        name="price"
                        axisLine={false}
                        tickLine={false}
                        style={{ fontSize: "10px" }}
                        tickFormatter={(v) => `$${v}`} />
                    <YAxis
                        type="number"
                        dataKey="expense"
                        name="expense"
                        axisLine={false}
                        tickLine={false}
                        style={{ fontSize: "10px" }}
                        tickFormatter={(v) => `$${v}`} />
                    <ZAxis
                        type="number"
                        range={[20]} />
                    <Tooltip formatter={(v) => `$${v}`} />
                    <Scatter
                        name="Product Expense Ratio"
                        data={productExpenseData}
                        fill={palette.tertiary[500]} />
                </ScatterChart>
            </ResponsiveContainer>
        </>
    )
}

export default SimpleScatterChart;
