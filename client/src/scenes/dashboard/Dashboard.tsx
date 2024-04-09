import DashboardBox from "@/components/DashboardBox";
import { useGetKpisQuery, useGetProductsQuery, useGetTransactionsQuery } from "@/state/api";
import { Box, useMediaQuery } from "@mui/material";
import SimpleAreaChart from "@/graphs/SimpleAreaChart";
import BiaxialLineChart from "@/graphs/BiaxialLineChart";
import SimpleBarChart from "@/graphs/SimpleBarChart";
import PieChartWithPaddingAngle from "@/graphs/PieChartWithPaddingAngle";
import SimpleScatterChart from "@/graphs/SimpleScatterChart";
import Table from "@/graphs/Table";
import BoxHeader from "@/components/BoxHeader";
import TriplePieChart from "@/graphs/TriplePieChart";
import DescriptionBox from "@/graphs/DescriptionBox";

const graphs: string[] = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j"];
const gridTemplateLargeScreens: string = `
    "${graphs[0]} ${graphs[1]} ${graphs[2]}"
    "${graphs[0]} ${graphs[1]} ${graphs[2]}"
    "${graphs[0]} ${graphs[1]} ${graphs[2]}"
    "${graphs[0]} ${graphs[1]} ${graphs[5]}"
    "${graphs[3]} ${graphs[4]} ${graphs[5]}"
    "${graphs[3]} ${graphs[4]} ${graphs[5]}"
    "${graphs[3]} ${graphs[7]} ${graphs[8]}"
    "${graphs[6]} ${graphs[7]} ${graphs[8]}"
    "${graphs[6]} ${graphs[7]} ${graphs[9]}"
    "${graphs[6]} ${graphs[7]} ${graphs[9]}"
`;
const gridTemplateSmallScreens: string = `
    "${graphs[0]}"
    "${graphs[0]}"
    "${graphs[0]}"
    "${graphs[0]}"
    "${graphs[1]}"
    "${graphs[1]}"
    "${graphs[1]}"
    "${graphs[1]}"
    "${graphs[2]}"
    "${graphs[2]}"
    "${graphs[2]}"
    "${graphs[3]}"
    "${graphs[3]}"
    "${graphs[3]}"
    "${graphs[4]}"
    "${graphs[4]}"
    "${graphs[5]}"
    "${graphs[5]}"
    "${graphs[5]}"
    "${graphs[6]}"
    "${graphs[6]}"
    "${graphs[6]}"
    "${graphs[7]}"
    "${graphs[7]}"
    "${graphs[7]}"
    "${graphs[7]}"
    "${graphs[8]}"
    "${graphs[8]}"
    "${graphs[9]}"
    "${graphs[9]}"
`;

const Dashboard = () => {
    const isAboveMediumScreen: boolean = useMediaQuery("(min-width: 1200px)");
    const { data: kpis } = useGetKpisQuery();
    const { data: products } = useGetProductsQuery();
    const { data: transactions } = useGetTransactionsQuery();
    
    const graphContents = [
        <SimpleAreaChart data={kpis} />,
        <BiaxialLineChart
            data={kpis}
            graphTitle={graphs[1]}
            title="Profit and Revenue"
            subtitle="top line represents revenue, bottom line expenses"
            sideText="+4%" />,
        <SimpleBarChart data={kpis} />,
        <BiaxialLineChart
            data={kpis}
            graphTitle={graphs[3]}
            title="Operational vs Non-operational expenses"
            sideText="+4%" />,
        <PieChartWithPaddingAngle
            title="Campaigns and Targets"
            sideText="+4%" />,
        <SimpleScatterChart
            data={products}
            title="Product Prices vs Expenses"
            sideText="+4%" />,
        <Table
            data={products}
            title="List of Products"
            sideText={`${products?.length} products`} />,
            <Table
            data={transactions}
            title="Recent Orders"
            sideText={`${transactions?.length} latest transactions`} />,
        <>
            <BoxHeader
                title="Expense Breakdown by Category"
                sideText="+4%" />
            <TriplePieChart
                data={kpis} />
        </>,
        <DescriptionBox
            title="Overall Summary and Explanation of Data"
            sideText="+15%" />
    ];

    return (
        <Box
            width="100%"
            height="100%"
            display="grid"
            gap="1.5rem"
            sx={isAboveMediumScreen
                ? {
                    gridTemplateColumns: "repeat(3, minmax(370px, 1fr))",
                    gridTemplateRows: "repeat(10, minmax(60px, 1fr))",
                    gridTemplateAreas: gridTemplateLargeScreens
                } : {
                    gridAutoColumns: "1fr",
                    gridAutoRows: "80px",
                    gridTemplateAreas: gridTemplateSmallScreens
                }
            } >
            {graphs.map((graph: string, index) => {
                return (
                    <DashboardBox
                        key={graph}
                        gridArea={graph}>
                        {index === 0 && graphContents[index]}
                        {index === 1 && graphContents[index]}
                        {index === 2 && graphContents[index]}
                        {index === 3 && graphContents[index]}
                        {index === 4 && graphContents[index]}
                        {index === 5 && graphContents[index]}
                        {index === 6 && graphContents[index]}
                        {index === 7 && graphContents[index]}
                        {index === 8 && graphContents[index]}
                        {index === 9 && graphContents[index]}
                    </DashboardBox>
                )
            })}
        </Box>
    )
}

export default Dashboard;
