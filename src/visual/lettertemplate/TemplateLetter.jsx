
import { Box } from '@mui/material';
import { tokens } from "../../Theme";

import { useTheme } from '@mui/material';
import Template from './Template';

const OfferLetterEditor = () => {


    const theme = useTheme();
    const colors = tokens(theme.palette.mode);



    return (
        <Box sx={{ background: `${colors.primary[400]} !important`, height: 'calc(100vh - 10vh)', }}>
            <Template />
        </Box>
    );
};

export default OfferLetterEditor;
