import React from 'react';
import { Box, Typography } from '@mui/material';
import { useTheme } from '@emotion/react';
import { tokens } from '../../Theme';
import { useParams } from 'react-router-dom';
import {  useSelector } from 'react-redux';

const ApplicantDetails = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const {id: applicantID} = useParams();

    const applicants = useSelector((state) => state.applicants.applicants);



    const applicant = applicants.find((applicant) => applicant.id === (applicantID));

    const formatSalary = (salary) => {
        // Format the salary with commas for thousands separator
        return salary.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    };

    return (
        <Box
            sx={{
                background: `${colors.primary[400]} !important`,
                height: 'calc(100vh - 11.5vh)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '20px',
            }}
        >
            {applicant && (
                <Box
                    sx={{
                        color: colors.grey[400],
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '10px',
                    }}
                >
                    <Typography variant="h2" color={colors.grey[100]}>
                        Applicant Details
                    </Typography>
                    <Box
                        sx={{
                            background: colors.blueAccent[700],
                            padding: '20px',
                            borderRadius: '8px',
                            boxShadow: `0px 3px 5px rgba(0, 0, 0, 0.2)`,
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '10px',
                        }}
                    >
                        <Typography variant="h6" color={colors.greenAccent[400]}>
                            <p>Name: {applicant.name}</p>
                            <p>Email: {applicant.email}</p>
                            <p>Phone: {applicant.phone}</p>
                            <p>Reference: {applicant.reference}</p>
                            <p>
                                Technology: {applicant.technology} - Level: {applicant.level}
                            </p>
                            <p>
                                Salary: ${formatSalary(applicant.salary)} per year
                            </p>
                            <p>Experience: {applicant.experience}</p>
                        </Typography>
                    </Box>
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
