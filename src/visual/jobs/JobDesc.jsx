import React, { useState, useEffect } from 'react';
import { Box, Typography, CircularProgress } from '@mui/material';
import { useTheme } from '@emotion/react';
import { tokens } from '../../Theme';
import { useParams } from 'react-router-dom';
import { jobposition } from '../../data/dummyData';

const JobDesc = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);


    const [applicant, setApplicant] = useState(null); 
    const [loading, setLoading] = useState(true); 
    const { id } = useParams();

    useEffect(() => {

        const fetchData = async () => { 
            // if(loading) return
            try {
                const data = await jobposition();
                console.log('Fetched job positions:', data);
                console.log('Requested id:', id);
                const matchedApplicant = data.find((applicant) => applicant.id == id);
                console.log('Matched applicant:', matchedApplicant);
                if (matchedApplicant) {
                    setApplicant(matchedApplicant);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false); 
            }
        };

        fetchData();
    }, [id, loading]);
    console.log(id,loading);

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
            {loading ? (
                <CircularProgress /> 
            ) : applicant ? (
                <Box
                    sx={{
                        color: colors.grey[400],
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '10px',
                    }}
                >
                    <Typography variant="h2" color={colors.grey[100]}>
                        Applicant Position Details
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
                            <p>Associate Engineer: {applicant.name}</p>
                        </Typography>
                    </Box>
                    <Typography variant="body1" color={colors.grey[100]}>
                        {`This applicant has a strong background in ${applicant.name}`}
                    </Typography>
                </Box>
            ) : (
                <Typography variant="body1" color={colors.grey[100]}>
                    Applicant not found.
                </Typography>
            )}
        </Box>
    );
};

export default JobDesc;
