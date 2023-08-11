import React from 'react'
import Header from '../../components/Header'
import { Box, Button, useTheme } from '@mui/material';
import { tokens } from '../../Theme';
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import StatBox from '../../components/StatBox';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import WebOutlinedIcon from '@mui/icons-material/WebOutlined';
import FunctionsOutlinedIcon from '@mui/icons-material/FunctionsOutlined';
import LineCharts from '../../components/LineCharts';
import BarChart from '../../components/BarCharts';

const Dashboards = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode)

    return (
        <Box m="10px">
            <Box display={"flex"} justifyContent={"center"} alignItems={"center"}>
                <Header title="Dashboard" subtitle="Welcome to the Dashboard" />
            </Box>

            <Box mt="15px">
                <Button sx={{ backgroundColor: colors.blueAccent[700], color: colors.grey[100], fontSize: "15px" }}>
                    <MenuOutlinedIcon />
                    Applicant Data
                </Button>
            </Box>

            <Box display="grid" gridTemplateColumns="repeat(9,1fr)" gap="15px"
                gridAutoRows={"140px"} mt="8px">
                <Box gridColumn="span 3" backgroundColor={colors.primary[400]} display={"flex"} justifyContent={"center"} alignItems={"center"} borderRadius={"5px"}>
                    <StatBox title={"Ten(10)"} subtitle={"CV from Email"} progress="0.55" increase={'+10%'} icon={<EmailOutlinedIcon sx={{ color: colors.greenAccent[500] }} />} />

                </Box>

                <Box gridColumn="span 3" backgroundColor={colors.primary[400]} display={"flex"} justifyContent={"center"} alignItems={"center"} borderRadius={"5px"}>
                    <StatBox title={"Five(5)"} subtitle={"CV from Page"} progress="0.8" increase={'+8%'} icon={<WebOutlinedIcon sx={{ color: colors.greenAccent[500] }} />} />

                </Box>

                <Box gridColumn="span 3" backgroundColor={colors.primary[400]} display={"flex"} justifyContent={"center"} alignItems={"center"} borderRadius={"5px"}>
                    <StatBox title={"Fiften(15)"} subtitle={"Total CV"} progress="0.4" increase={'+9%'} icon={<FunctionsOutlinedIcon sx={{ color: colors.greenAccent[500] }} />} />
                </Box>

            </Box>


            <Box display="grid" gridTemplateColumns="repeat(6,1fr)" gap="10px">
                <Box gridColumn="span 3" backgroundColor={colors.primary[400]}
                    mt={"10px"} borderRadius={"5px"}>
                    <Box height={"230px"}>
                        <LineCharts isDashboard={true} />

                    </Box>
                </Box>
                <Box gridColumn="span 3" backgroundColor={colors.primary[400]}
                    mt={"10px"} borderRadius={"5px"}>
                    <Box height={"230px"}>
                        <BarChart isDashboard={true} />

                    </Box>
                </Box>


            </Box>





        </Box>
    )
}

export default Dashboards;