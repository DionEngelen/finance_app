import BoxHeader from "@/components/BoxHeader";
import { GetProductsResponse, GetTransactionsResponse } from "@/state/types";
import { Box, useTheme } from "@mui/material";
import { DataGrid, GridCellParams } from "@mui/x-data-grid";

type Props = {
    data: GetProductsResponse[] | GetTransactionsResponse[] | undefined;
    title: string;
    sideText: string;
}

const Table = ({ data, title, sideText }: Props) => {
    const { palette } = useTheme();

    const productColumns = [{
        field: "_id",
        headerName: "id",
        flex: 1
    }, {
        field: "expense",
        headerName: "Expense",
        flex: 0.5,
        renderCell: (p: GridCellParams) => `$${p.value}`
    }, {
        field: "price",
        headerName: "Price",
        flex: 0.5,
        renderCell: (p: GridCellParams) => `$${p.value}`
    }];

    const transactionColumns = [{
        field: "_id",
        headerName: "id",
        flex: 1
    }, {
        field: "buyer",
        headerName: "Buyer",
        flex: 0.67,
    }, {
        field: "amount",
        headerName: "Amount",
        flex: 0.35,
        renderCell: (p: GridCellParams) => `$${p.value}`
    }, {
        field: "productIds",
        headerName: "Count",
        flex: 0.1,
        renderCell: (p: GridCellParams) => (p.value as Array<string>).length
    }];
    
    const isProduct = (object: Props["data"]): object is GetProductsResponse[] => {
        return object ? "price" in object[0] : false;
    };

    return (
        <>
            <BoxHeader
                title={title}
                sideText={sideText} />
            <Box
                mt={data && isProduct(data) ? "0.5rem" : "1rem"}
                p={data && isProduct(data) ? "0 0.5rem" : "0 0.5rem 1rem 0.5rem"}
                height={data && isProduct(data) ? "70%" : "80%"}
                sx={{
                    "& .MuiDataGrid-root": {
                        color: palette.grey[300],
                        border: "none"
                    },
                    "& .MuiDataGrid-cell": {
                        borderBottom: `1px solid ${palette.grey[800]} !important`
                    },
                    "& .MuiDataGrid-columnHeaders": {
                        borderBottom: `1px solid ${palette.grey[800]} !important`
                    },
                    "& .MuiDataGrid-columnSeparator": {
                        visibility: "hidden"
                    },
                }}>
                <DataGrid
                    columnHeaderHeight={25}
                    rowHeight={35}
                    hideFooter={true}
                    rows={data || []}
                    columns={data && isProduct(data) ? productColumns : transactionColumns} />
            </Box>
        </>
    )
};

export default Table;
