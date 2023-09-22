import React, { useEffect, useState } from 'react'
import { Box, Button, useTheme } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { tokens } from '../../Theme';

import Header from '../../components/Header';

import DeleteIcon from '@mui/icons-material/Delete';

import { useNavigate } from 'react-router-dom'; 
// import { useSelector } from 'react-redux';
import ReplyOutlinedIcon from '@mui/icons-material/ReplyOutlined';

const BlackList = () => {

  const theme = useTheme()
  const colors = tokens(theme.palette.mode);


  const navigate = useNavigate();

// const handleDelete = (id) => {
//     const confirmed = window.confirm("Are you sure you want to delete this applicant?");
//     if (confirmed) {
//     //     try {
//     //         // Find the applicant with the matching ID in storedBlacklist
//     //         const applicantToRemove = storedBlacklist.find((applicant) => applicant.id === id);

//     //         if (applicantToRemove) {
//     //             // Remove the applicant from storedBlacklist
//     //             const updatedBlacklist = storedBlacklist.filter((applicant) => applicant.id !== id);
//     //             localStorage.setItem('blacklist', JSON.stringify(updatedBlacklist));
//     //         }
//     //     } catch (error) {
//     //         console.error('Error removing applicant from blacklist:', error);
//     //     }
//     }
// };

// Initialize the state with the data from local storage
const [storedBlacklist, setStoredBlacklist] = useState(() => {
  const data = JSON.parse(localStorage.getItem('blacklist'));
  return data || [];
});



const handleDelete = (id) => {
  const confirmed = window.confirm("Are you sure you want to delete this applicant..?");
  if (confirmed) {
    try {

      const filteredData = storedBlacklist.filter(item => item.id !== id);
      setStoredBlacklist(filteredData);

      localStorage.setItem('blacklist', JSON.stringify(filteredData));
    } catch (error) {
      console.error('Error deleting applicant:', error);
    }
  }
};
  

  const handleRowClick = (params, event) => {
    const isDeleteButton = event.target.tagName === 'BUTTON' && event.target.getAttribute('data-operation') === 'delete';
    
   
    if (isDeleteButton) {
      return;
    }
  
  
    const applicantId = params.row.id;
    navigate(`/applicants/list/${applicantId}`);
  };
  

  const columns = [
   
    {
      field: "name", headerName: "Name", flex: 1, cellClassName: "name-column-cell",
    },
    {
      field: "email", headerName: "Email", flex: 1,
    },
    {
      field: "technology", headerName: "Technology", flex: 1,
    },
    {
      field: "phone", headerName: "Phone", flex: 1,
    },
    {
      field: "operation",
      headerName: "Operation",
      flex: 1,
      renderCell: (params) => {
        return (
          <Box display="flex" justifyContent="center">
          
          <Button
            onClick={()=> handleDelete(params.id)}
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
          >Remove
            <DeleteIcon />
          </Button>
        </Box>
        );
      },
    },
  ];

  const handleClickForm = () => {
    navigate('/applicants');
  }


  return (
    <Box sx={{ background: `${colors.primary[400]} !important`, height: 'calc(100vh - 10vh)', paddingRight: "5px"}} >
      <Box>
        <Header title='BlackListed Applicant' subtitle="BlackListed Applicant List" />
      </Box>
      <Box
        m="40px 0 0 0"
        height="65vh"
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
                    Applicants <ReplyOutlinedIcon style={{ marginRight: '5px' }} />
                </Button>
              

            </Box>
        <DataGrid
          checkboxSelection
          rows={storedBlacklist}
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

export default BlackList;