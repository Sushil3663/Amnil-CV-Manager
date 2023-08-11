import { Box, useTheme } from '@mui/material';
import React from 'react';
import { tokens } from '../../Theme'
// import JobDomain from './JobDomain';

import Header from '../../components/Header';
import { Link, Outlet } from 'react-router-dom';
const Jobs = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    return (
        <Box sx={{ background: `${colors.primary[400]} !important`, height: 'calc(100vh - 11.5vh)' }} >

            <Header title="Job Status" subtitle=" Applicant JobStatus and JobLevel" />

            <Link to = "domain"> Job Domain</Link>
            <Outlet />

           

        </Box>
    );
};

export default Jobs;
