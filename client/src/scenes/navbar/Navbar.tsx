import FlexBetween from "@/components/FlexBetween";
import { Box, Typography, useTheme } from "@mui/material";
import PixIcon from "@mui/icons-material/Pix"
import { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
    const { palette } = useTheme();
    const [selected, setSelected] = useState("dashboard");
    const pages = ["dashboard", "predictions"];

    return (
        <FlexBetween
            mb="0.25rem"
            p="0.5rem 0rem"
            color={palette.grey[300]}>
            {/* LEFT SIDE */}
            <FlexBetween
                gap="0.75rem">
                <PixIcon
                    sx={{ fontSize: "28px"}} />
                <Typography
                    variant="h4"
                    fontSize="16px">
                    Finanseer
                </Typography>
            </FlexBetween>
            {/* RIGHT SIDE */}
            <FlexBetween gap="2rem">
                {pages.map((page: string) => {
                    return (
                        <Box
                        key={page}
                        sx={{ "&:hover": {
                            color: palette.primary[100]
                        }}}>
                            <Link
                                to={page === "dashboard" ? "/" : page}
                                onClick={() => setSelected(page)}
                                style={{
                                    color: selected === page ? "inherit" : palette.grey[700],
                                    textDecoration: "inherit"
                                }}>
                                {page}
                            </Link>
                        </Box>
                    )
                })}
            </FlexBetween>
        </FlexBetween>
    )
};

export default Navbar;