import React from 'react';
import { Box, Typography, Paper, Button } from '@mui/material';
import { useTheme } from '@emotion/react';
import { tokens } from '../../Theme';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ReplyOutlinedIcon from '@mui/icons-material/ReplyOutlined';
import CreateNewFolderOutlinedIcon from '@mui/icons-material/CreateNewFolderOutlined';
import { setReason } from '../../redux/blacklistSlice';

const ApplicantDetails = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const { id: applicantID } = useParams();

    const dispatch = useDispatch();

    const applicants = useSelector((state) => state.applicants.applicants);

    // const blacklistReasons = useSelector((state) => state.blacklistReasons);

    const navigate = useNavigate();
    const applicant = applicants.find((applicant) => applicant.id === applicantID);

    const formatSalary = (salary) => {

        return salary.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    };

    const handleClickForm = () => {
        navigate("/applicants")

    }

    const handlelist = () => {
        const storedselectedCandidate = JSON.parse(localStorage.getItem('selectedRows'));

        // Find the applicant with the matching ID
        const applicant = applicants.find((applicant) => (applicant.id) === (applicantID));

        if (applicant) {

            // Prompt for the reason for blacklisting
            const reason = prompt("Enter the reason for blacklisting this applicant:");

            if (reason !== null) { // User didn't cancel
                // Dispatch the action to set the reason in the Redux store
                dispatch(setReason({ applicantID, reason }));
            }
            // Remove the applicant from the selectedRows localStorage
            const filteredData = storedselectedCandidate.filter(item => item.id !== applicantID);
            localStorage.setItem('selectedRows', JSON.stringify(filteredData));

            // Add the applicant to the blacklist localStorage
            const storedBlacklist = JSON.parse(localStorage.getItem('blacklist')) || [];
            storedBlacklist.push(applicant);
            localStorage.setItem('blacklist', JSON.stringify(storedBlacklist));
        }

        navigate(`/applicants/blacklist`);
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
                    onClick={handleClickForm}
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
                    ShortList <ReplyOutlinedIcon style={{ marginRight: '5px' }} />
                </Button>
                <Button
                    onClick={handlelist}
                    style={{
                        background: 'red',
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
                    BlackList <CreateNewFolderOutlinedIcon style={{ marginRight: '5px' }} />
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
                        Applicant Details
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


                            <b>Expected Salary:</b> ${formatSalary(applicant.salary)} per year

                        </Typography>
                    </Paper>
                    <Typography variant="body1" color={colors.grey[100]}>
                        {`This applicant, ${applicant.name}, has a strong background in ${applicant.technology} with ${applicant.experience} of experience.
                      They are currently at the ${applicant.level} level and expect a yearly salary of $${formatSalary(applicant.salary)}.
                          For further contact, you can reach them at ${applicant.email} or ${applicant.phone}.`}
                    </Typography>
                </Box>
            )}
        </Box>
    );
};

export default ApplicantDetails;
