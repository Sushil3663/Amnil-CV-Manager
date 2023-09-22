import { Box, Button, useTheme } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { tokens } from '../../Theme';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import Header from '../../components/Header';
import { fetchStatus } from '../../api/Api'; 
import { deleteStatus } from '../../api/Api'; 

import DeleteIcon from '@mui/icons-material/Delete';



const JobApplicationStatus = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const [jobStatuses, setJobStatuses] = useState([]);

   
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchStatus();
        setJobStatuses(data);
       
         }
      catch (error) {
        console.error('Error fetching Status:', error);

      }
    };
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    const confirmed = window.confirm("Are you sure you want to delete this status?");
    if (confirmed) {
        try {
            await deleteStatus(id); 
            const updatedApplicants = jobStatuses.filter(applicant => applicant.id !== id);
            setJobStatuses(updatedApplicants);
        } catch (error) {
            console.error('Error deleting status:', error);
        }
    }
};

  const columns = [
    { field: 'name', headerName: 'Name',flex: 1},
    { field: 'technology', headerName: 'Technology',flex: 1 },
    // { field: 'InterviewScheduled', headerName: 'InterviewScheduled',flex: 1 },
    // { field: 'Accepted', headerName: 'Accepted' },
    // { field: 'Await', headerName: 'Await',flex: 1},
    // { field: 'status', headerName: 'status',flex: 1 },
    // { field: 'OfferLetter', headerName: 'OfferLetter',flex: 1 },
   
    {
      field: 'accepted',
      headerName: 'Accepted',
      flex: 1,
      renderCell: (params) => (
        <Box>
          Yes  
        </Box>
      ),
    },
    {
      field: 'response',
      headerName: 'Response',
      flex: 1,
      renderCell: (params) => (
        <Box>
          Await  
        </Box>
      ),
    },
    {
      field: 'status',
      headerName: 'Status',
      flex: 1,
      renderCell: (params) => (
        <Box>
          Hired  
        </Box>
      ),
    },
    {
      field: 'offerletter',
      headerName: 'OfferLetter',
      flex: 1,
      renderCell: (params) => (
        <Box>
          Send  
        </Box>
      ),
    },
    {
        field: "operation",
        headerName: "Operation",
        flex: 1,
        renderCell: (params) => {
          return (
            <Box display="flex" justifyContent="center" gap="3px" onClick={(event) => {
              event.stopPropagation()
            }}>

  
              <Button
                onClick={(event) => {
                  event.stopPropagation();
                  if (event.target.tagName !== "INPUT") {
                    handleDelete(params.row.id);
                  }
                }}
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
              </Button>
            </Box>
  
          );
        },
      },
    ];


    return (
        <Box sx={{ background: `${colors.primary[400]} !important`, height: 'calc(100vh - 10vh)' }}>
            <Header title="Job Status" subtitle=" Applicant Job status" />

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
                }}
            >
                <DataGrid
                    
                    rows={jobStatuses}
                    columns={columns}
                    components={{ Toolbar: GridToolbar }}
                    rowsPerPageOptions={[10, 20, 50]}
                    pagination
                />
            </Box>
        </Box>
    )
}
export default JobApplicationStatus;
