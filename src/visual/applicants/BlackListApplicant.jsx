import React from 'react';
import { Box, Typography, Paper, Button } from '@mui/material';
import { useTheme } from '@emotion/react';
import { tokens } from '../../Theme';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ReplyOutlinedIcon from '@mui/icons-material/ReplyOutlined';
import { clearReason } from '../../redux/blacklistSlice';

const BlackListApplicant = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const { id: applicantID } = useParams();

    const dispatch = useDispatch();

    const applicants = useSelector((state) => state.applicants.applicants);

    const blacklistReasons = useSelector((state) => state.blacklistReasons);

    const navigate = useNavigate();
    const applicant = applicants.find((applicant) => applicant.id === applicantID);



    const handlenavigate = () => {
        navigate("/applicants/blacklist")

    }
    const handleClearReason = () => {
        // Dispatch the action to clear the reason in the Redux store
        dispatch(clearReason({ applicantID }));
    };


    return (
        <Box
            sx={{
                background: `${colors.primary[400]} !important`,
                height: 'calc(100vh - 10vh)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',

            }}
        >
            <Box
                display="flex"
                justifyContent="end"
                alignItems="center"
                gap={2}
                mr={"10px"}
            >
                <Button
                    onClick={handlenavigate}
                    style={{
                        background: 'green',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'end',
                        paddingLeft: '4px'
                    }}

                >
                    BlackList <ReplyOutlinedIcon style={{ marginRight: '5px' }} />
                </Button>


            </Box>

            {applicant && (
                <Box
                    sx={{
                        color: colors.grey[400],
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '10px',
                    }}
                >
                    <Typography variant="h4" color={colors.grey[100]}>
                        BlackListed Applicant Details
                    </Typography>
                    <Paper
                        elevation={3}
                        sx={{
                            padding: '20px',
                            borderRadius: '8px',
                            display: 'flex',
                            flexDirection: 'column',

                        }}
                    >
                        <Typography variant="h6" color={colors.grey[100]}>
                            <Box>
                                <Typography variant="h6">
                                    <b><u>Applicant Full Name:</u></b> <br />

                                    {applicant.name}

                                </Typography>

                            </Box>
                            <hr />

                            <Box>
                                <Typography variant="h6">
                                    <b><u>Applicant Primary Email:</u> </b> <br />

                                    {applicant.email}

                                </Typography>
                            </Box>

                            <hr />

                            <Box>
                                <Typography variant="h6">
                                    <b><u>Applicant  Phone Number:</u> </b>  <br />
                                    {applicant.phone}

                                </Typography>
                            </Box>
                            <hr />

                            <Box>
                                <Typography variant="h6">
                                    <b><u>Application From:</u> </b>  <br />
                                    {applicant.reference}

                                </Typography>
                            </Box>
                            <hr />

                            <Box>
                                <Typography variant="h6">
                                    <b><u>Applicant Technology:</u> </b>  <br />
                                    Technology :  {applicant.technology} - Level:{' '}
                                    {applicant.level}

                                </Typography>
                            </Box>
                            <hr />

                            <Box>
                                <Typography variant="h6">
                                    <b><u>Experience:</u> </b>  <br />
                                    Experience(in Year) :  {applicant.experience} - Company Name: Softtech Park
                                </Typography>
                            </Box>
                            <hr />



                        </Typography>
                    </Paper>

                </Box>
            )}


            <Box>
                {applicant && (
                    <Box>
                        {blacklistReasons[applicantID] && (
                            <Box display={"flex"} alignItems={"center"} justifyContent={"space-between"} marginTop={"5px"}>
                                <Box>
                                    <Typography variant="h6">
                                        <b><u>Blacklist Reason:</u></b> <br />
                                        {blacklistReasons[applicantID]}
                                    </Typography>
                                </Box>
                                <Box paddingRight={"20px"}>
                                    <Button onClick={handleClearReason} style={{ backgroundColor: "red" }}>Clear Reason</Button>
                                </Box>
                            </Box>
                        )}
                    </Box>
                )}
            </Box>
        </Box>
    );
};






export default BlackListApplicant
