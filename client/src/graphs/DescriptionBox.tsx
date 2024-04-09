import BoxHeader from "@/components/BoxHeader";
import { Box, Typography, useTheme } from "@mui/material";

type Props = {
    title: string;
    sideText: string;
}

const DescriptionBox = ({ title, sideText }: Props) => {
    const { palette } = useTheme();

    return (
    <>
        <BoxHeader
            title={title}
            sideText={sideText} />
        <Box
            height="15px"
            margin="1.25rem 1rem 0.4rem 1rem"
            bgcolor={palette.primary[800]}
            borderRadius="1rem">
            <Box
                height="15px"
                width="40%"
                bgcolor={palette.primary[600]}
                borderRadius="1rem">
            </Box>
        </Box>
        <Typography
            margin="0 1rem"
            variant="h6">
            Orci aliquam enim vel diam. Venenatis euismod id donec mus lorem etiam
            ullamcorper odio sed. Ipsum non sed gravida etiam urna egestas
            molestie volutpat et. Malesuada quis pretium aliquet lacinia ornare
            sed. In volutpat nullam at est id cum pulvinar nunc.
        </Typography>
    </>
    )
}

export default DescriptionBox;
