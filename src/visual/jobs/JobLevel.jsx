import React, { useState } from 'react'
import { Box, useTheme } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { tokens } from '../../Theme';
import { applicantsData as initialcandidateData } from '../../data/dummyData';
import Header from '../../components/Header';

import DeleteIcon from '@mui/icons-material/Delete';
import { useReducer } from 'react';
import { reducer } from '../../components/Redux';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';

import { useNavigate } from 'react-router-dom';

const initialState = {
    item: initialcandidateData,

}

const JobLevel = () => {

    const theme = useTheme()
    const colors = tokens(theme.palette.mode);

    const navigate = useNavigate();


    const [state, dispatch] = useReducer(reducer, initialState);


    const handleDelete = (id) => {
        return dispatch({
            type: "REMOVE",
            payload: id
        });
    };

    const handleRowClick = (params, event) => {
        const isDeleteButton = event.target.tagName === 'BUTTON' && event.target.getAttribute('data-operation') === 'delete' ;

        // If it's the delete button, prevent navigation
        if (isDeleteButton) {
            return;
        }

        // Handle row selection and set the selected applicant
        const applicantId = params.row.id;
        navigate(`/applicants/${applicantId}`);
    };

    const [applicantsData, setApplicantsData] = useState(initialcandidateData);
    const [editRowId, setEditRowId] = useState(null);

    const handleEdit = (id) => {
        setEditRowId(id);
    };

    const handleSave = (updatedRowData) => {
        // Find the index of the row to update
        const rowIndex = applicantsData.findIndex((applicant) => applicant.id === updatedRowData.id);
        // Create a copy of the applicantsData array to modify
        const updatedApplicantsData = [...applicantsData];
        // Update the row with the new data
        updatedApplicantsData[rowIndex] = updatedRowData;
        // Update the applicantsData with the modified array
        setApplicantsData(updatedApplicantsData);
        // Reset the editRowId to exit the edit mode
        setEditRowId(null);
    };


    const columns = [
        {
            field: "name", headerName: "Name", flex: 1, cellClassName: "name-column-cell",
        },

        {
            field: "level", headerName: "Level", flex: 1,
        },

        {
            field: "operation",
            headerName: "Operation",
            flex: 1,
            renderCell: (params) => {
                return (
                    <Box display="flex" justifyContent="center" gap="3px">
                        {editRowId !== params.id ? (
                            <button
                                onClick={(event) => {
                                    event.stopPropagation(); // Prevent row click handler from being triggered
                                    handleEdit(params.id);
                                }}
                                style={{
                                    background: 'green',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '4px',
                                    padding: '8px 16px',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                }}
                                
                            >
                                <EditIcon style={{ marginRight: '8px' }} />
                            </button>
                        ) : (
                            <button
                                onClick={(event) =>{
                                    event.stopPropagation()
                                    handleSave(params.row)
                                }}
                                style={{
                                    background: 'blue',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '4px',
                                    padding: '8px 16px',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',

                                }}
                                

                            >
                                <SaveIcon style={{ marginRight: '8px' }} />
                            </button>
                        )}
                        <button
                            onClick={(event) =>{
                                event.stopPropagation();
                                handleDelete(params.id)
                            } }
                            style={{
                                background: 'red',
                                color: 'white',
                                border: 'none',
                                borderRadius: '4px',
                                padding: '8px 16px',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                            }}
                            data-operation="delete"
                        >
                            <DeleteIcon />
                        </button>
                    </Box>
                );
            },
        },
    ];



    return (
        <Box sx={{ background: `${colors.primary[400]} !important`, height: 'calc(100vh - 11.5vh)' }} >
            <Box marginLeft={"40px"}>
                <Header title='Candidate Status' subtitle="Selected candidate job Level" />
            </Box>
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
                    rows={state.item}
                    columns={columns}
                    components={{ Toolbar: GridToolbar }}
                    onRowClick={handleRowClick}
                    rowsPerPageOptions={[10, 20, 50]}
                    pagination

                />
            </Box>
        </Box>
    )
}



export default JobLevel