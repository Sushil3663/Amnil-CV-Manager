import { Box, useTheme } from '@mui/material';
import React, { useEffect } from 'react';
import { tokens } from '../../Theme'
import { DataGrid, GridToolbar } from '@mui/x-data-grid';

import { useDispatch, useSelector } from 'react-redux';
import { fetchAssessments } from '../../api/Api';
import { setAssessments } from '../../redux/assessmentSlice';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CreateNewFolderOutlinedIcon from '@mui/icons-material/CreateNewFolderOutlined';
import {  Link, useNavigate } from 'react-router-dom'; 
import { deleteAssessment } from '../../api/Api';

import Header from '../../components/Header';

const Assesment = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    // const [editingAssessment, setEditingAssessment] = useState({});

    const navigate = useNavigate()

    const dispatch = useDispatch();
    const assessments = useSelector((state) => state.assessments.assessments);


    // const handleEdit = (assessment) => {
    //     console.log(assessment)
    //     setEditingAssessment(assessment);

        // if (assessment) { // Check if assessment is not undefined
        //     navigate("/assesmentform")
        // }

        
    //   };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchAssessments();
                dispatch(setAssessments(data));

            }
            catch (error) {
                console.error('Error fetching assessments:', error);

            }
        };
        fetchData();
    }, [dispatch])

    // useEffect(() => {
    //     console.log(editingAssessment); // Log updated editingAssessment here
    // }, [editingAssessment]);

    const handleDelete = async(id)=>{
        try{
            await deleteAssessment(id);
            const updatedAssessments = assessments.filter(assessment => assessment.id !== id);
            dispatch(setAssessments(updatedAssessments));
        }
        catch(error){
            console.error('Error deleting assessment:', error);

        }

    }

    const columns = [
        { field: 'cid', headerName: 'CandidateID' },
        { field: 'title', headerName: 'Title' },
        { field: 'testurl', headerName: 'TestURL', flex: 1 },
        { field: 'creationdate', headerName: 'creationDate', flex: 1 },
        { field: 'expirydate', headerName: 'expiryDate', flex: 1 },
        { field: 'evaluation', headerName: 'Evaluation', flex: 1 },
        { field: 'remark', headerName: 'Remarks' },
        {
            field: "operation",
            headerName: "Operation",
            flex: 1,
            renderCell: (params) => {
                return (
                    <Box display="flex" justifyContent="center" gap="3px">
                        <button
                        // onClick={() => handleEdit(params.row)}
                        
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
                        <Link to={`/updateassessmentForm/${params.row.id}`}><EditIcon style={{ marginRight: '8px' }} /></Link>
                            
                        </button>

                        <button
                            onClick={() => handleDelete(params.row.id)}
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

                        >
                            <DeleteIcon />
                        </button>
                    </Box>
                );
            },
        },
    ];


    const handleClickForm = () =>{
        navigate("/assesmentform")

    }

    return (
        <Box sx={{ background: `${colors.primary[400]} !important`, height: 'calc(100vh - 11.5vh)' }} >

            <Header title="Assessments" subtitle=" Applicant Assessments Section " />

            <Box>
                <button
                    onClick={handleClickForm}
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
                    Create <CreateNewFolderOutlinedIcon style={{ marginRight: '8px' }} />
                </button>

            </Box>

            <Box
                m="10px 0 0 10px"
                height="68vh"
                width={"95%"}
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
                    rows={assessments}
                    columns={columns}
                    components={{ Toolbar: GridToolbar }}
                    rowsPerPageOptions={[10, 20, 50]}
                    pagination

                />
                
            </Box>
           
        </Box>
    );
};

export default Assesment;
