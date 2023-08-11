import { Box, useTheme } from '@mui/material';
import React from 'react';
import { tokens } from '../../Theme'
import Header from '../../components/Header';
import { jobposition } from '../../data/dummyData';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const JobPosition = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const navigate = useNavigate();


    const [jobPositions, setJobPositions] = useState([]);

    useEffect(() => {
        const fetchdummyData = async () => {
            const data = await jobposition();
            setJobPositions(data);
        };
        fetchdummyData();

    }, []);

    const handleCellClick = (params) => {
        if (params.field === 'jobDescriptionUrl') {

            const jobId = params.row.id;
            navigate(`/position/${jobId}`);

        }
    };

    const columns = [
        { field: 'id', headerName: 'ID', flex: 1 },
        { field: 'name', headerName: 'Name', flex: 1 },
        { field: 'jobDescriptionUrl', headerName: 'Job Description Url', flex: 1 },
        { field: 'isActive', headerName: 'Active', flex: 1 },
        { field: 'jobDomainId', headerName: 'Job Domain ID', flex: 1 },
        { field: 'jobLevelId', headerName: 'Job Level ID', flex: 1 },
    ];

    return (
        <Box sx={{ background: `${colors.primary[400]} !important`, height: 'calc(100vh - 11.5vh)' }} >

            <Header title="Job Position" subtitle="Required Job Position" />

            <Box
                m="10px 0 0 70px"
                height="72vh"
                width={"85%"}
                sx={{
                    "& .MuiDataGrid-root": {
                        border: "none",
                    },
                    "& .MuiDataGrid-cell": {
                        borderBottom: "none",
                    },
                    "& .name-column--cell": {
                        color: colors.greenAccent[300],
                    },
                    "& .MuiDataGrid-columnHeaders": {
                        backgroundColor: colors.blueAccent[700],
                        borderBottom: "none",
                    },
                    "& .MuiDataGrid-virtualScroller": {
                        backgroundColor: colors.primary[400],
                    },
                    "& .MuiDataGrid-footerContainer": {
                        borderTop: "none",
                        backgroundColor: colors.blueAccent[700],
                    },
                    "& .MuiCheckbox-root": {
                        color: `${colors.greenAccent[200]} !important`,
                    },
                    "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                        color: `${colors.grey[100]} !important`,
                    },

                }}
            >
                <DataGrid
                    checkboxSelection
                    rows={jobPositions}
                    columns={columns}
                    components={{ Toolbar: GridToolbar }}
                    rowsPerPageOptions={[10, 20, 50]}
                    pagination
                    onCellClick={handleCellClick}

                />
            </Box>
        </Box>
    )
}

export default JobPosition