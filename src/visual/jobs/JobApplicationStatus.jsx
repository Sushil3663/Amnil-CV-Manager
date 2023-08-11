import { Box, useTheme } from '@mui/material';
import React from 'react';
import { tokens } from '../../Theme'
import Header from '../../components/Header';

const JobApplicationStatus = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    return (
        <Box sx={{ background: `${colors.primary[400]} !important`, height: 'calc(100vh - 11.5vh)' }} >

            <Header title="Job Status" subtitle=" Applicant Job status" />

        

        </Box>
  )
}

export default JobApplicationStatus