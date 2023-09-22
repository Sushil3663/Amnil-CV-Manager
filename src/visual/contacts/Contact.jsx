import React from 'react'
import { Box, useTheme } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { tokens } from '../../Theme';

import Header from '../../components/Header';

import DeleteIcon from '@mui/icons-material/Delete';

import {  useDispatch, useSelector } from 'react-redux';
import { deleteSelectedApplicant } from '../../redux/checkedApplicantSlice'; 
import { useNavigate } from 'react-router-dom'; 
import ChecklistOutlinedIcon from '@mui/icons-material/ChecklistOutlined';

const Candidate = () => {

  const theme = useTheme()
  const colors = tokens(theme.palette.mode);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const selectedCandidate= useSelector((state) => state.checkedApplicants.selectedRows);
  console.log(selectedCandidate)
  
// useEffect(()=>{
//   const storedselectedCandidate = JSON.parse(localStorage.getItem('selectedRows'));

// },[])
  

const storedselectedCandidate = JSON.parse(localStorage.getItem('selectedRows'));

// const applicants = useSelector((state) => state.applicants.applicants);

  const handleDelete = (id) => {
    const confirmed = window.confirm("Are you sure you want to delete this applicant..?");
    if(confirmed){
      try {
        dispatch(deleteSelectedApplicant(id))

        const localStorageKey = 'selectedRows';
        const storedData = JSON.parse(localStorage.getItem('selectedRows'));
        if (storedData) {
          const filteredData = storedData.filter(item => !id.includes(item.id));
          localStorage.setItem(localStorageKey, JSON.stringify(filteredData));
        }

      }catch(error) {
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
    navigate(`/contact/${applicantId}`);
  };

  const handleList = (id) => {

    const offeredRowsData = storedselectedCandidate.find((row) => row.id === id);

    const storedData = JSON.parse(localStorage.getItem('offeredRows')) || [];

    storedData.push(offeredRowsData);
    localStorage.setItem('offeredRows', JSON.stringify(storedData));

  }


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
      field: "shortlist",
      headerName: "ShortList",
      flex: 1,
      renderCell: (params) => {
        return (
          <Box display="flex" justifyContent="center" gap="3px" onClick={(event) => {
            event.stopPropagation()
          }}>

            <button

              onClick={() => handleList(params.id)}



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
              <ChecklistOutlinedIcon style={{ marginRight: '8px' }} />
            </button>


          </Box>

        );
      },
    },
    {
      field: "operation",
      headerName: "Operation",
      flex: 1,
      renderCell: (params) => {
        return (
          <Box display="flex" justifyContent="center">
          
          <button
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
          </button>
        </Box>
        );
      },
    },
  ];



  return (
    <Box sx={{ background: `${colors.primary[400]} !important`, height: 'calc(100vh - 10vh)',paddingRight: "10px" }} >
      <Box>
        <Header title='Candidate' subtitle="Selected candidate list in Amnil" />
      </Box>
      <Box
        m="40px 0 0 0"
        height="71vh"
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
          rows={storedselectedCandidate}
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

export default Candidate;