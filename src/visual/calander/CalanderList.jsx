import React, { useState } from 'react';
import { Box, Button, Typography, useTheme } from '@mui/material';
import Header from "../../components/Header";
import { tokens } from "../../Theme";
import { useNavigate } from 'react-router-dom';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
const CalanderList = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const navigate = useNavigate();

    const [currentEvents, setCurrentEvents] = useState(
        JSON.parse(localStorage.getItem('events') || '[]')
    );

    const handleClickForm = () => {
        navigate("/calander")

    }



    return (
        <Box sx={{ background: `${colors.primary[400]} !important`, height: 'calc(100vh - 10vh)' }}>
            <Header title="Event List" subtitle="View Event List and Interviewer" />
            <Box
                display="flex"
                justifyContent="end"
                alignItems="center"
                mr={"15px"}
            >
                <Button
                    onClick={handleClickForm}
                    style={{
                        background: 'green',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        padding: '5px 12px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'end',

                    }}

                >
                    Calander <CalendarMonthOutlinedIcon style={{ marginRight: '5px' }} />
                </Button>

            </Box>


            <Box sx={{ padding: '16px' }}>
                {currentEvents.map(event => (
                    <Box
                        key={event.id}
                        sx={{

                            padding: '16px',
                            marginBottom: '16px',
                            borderRadius: '8px',
                            boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.6)',
                        }}
                    >
                        <Typography variant="h5"><b>{event.title}</b></Typography>
                        <Typography variant="h6">
                            <b>Date:</b> {event.start} to {event.end}
                        </Typography>
                        <Typography variant="h6">
                            <b>Interview Type:</b> {event.interviewType}
                        </Typography>
                        <Typography variant="h6">
                            <b>Interviewer:</b> {event.interviewerName }
                        </Typography>
                        <Typography variant="h6">
                            <b>Interviewer Email </b>: {event.interviewerEmail}
                        </Typography> 
                    </Box>
                ))}
            </Box>
        </Box>
    )
}

export default CalanderList;
