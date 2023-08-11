import { Box, Typography, useTheme } from '@mui/material'
import { tokens } from '../Theme';
import DevCircule from './DevCircule';

import React from 'react'

const StatBox = ({ icon, title, subtitle, increase, progress }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode)
    return (
        <Box width={"100%"} m="0 25px">
            <Box display={"flex"} justifyContent={"space-between"} >
                <Box>
                {icon}
                    <Typography varient="h5" font="bold" sx={{ color: colors.grey[100] }}>

                        {title}

                    </Typography>
                </Box>
                <Box>
                    <DevCircule progress={progress}/>
                </Box>

                <Box display={"flex"} flexDirection={"column"} justifyContent={"space-around"}>
                <Typography varient="h5" font="bold" sx={{ color: colors.grey[100] }}>
                {subtitle}
                </Typography>
                <Typography varient="h5" font="bold" sx={{ color: colors.greenAccent[500] }}>
                    {increase}
                </Typography>

                </Box>

            </Box>

        </Box>
    )
}

export default StatBox