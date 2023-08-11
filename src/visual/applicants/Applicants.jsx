import React, { useEffect } from 'react';
import { Box, useTheme } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { tokens } from '../../Theme';
import Header from '../../components/Header';
import { fetchApplicants } from '../../api/Api';
import { setApplicants } from '../../redux/applicantSlice';
import { deleteApplicant } from '../../api/Api';
import CreateNewFolderOutlinedIcon from '@mui/icons-material/CreateNewFolderOutlined';
import DeleteIcon from '@mui/icons-material/Delete';
import { setSelectedRows } from '../../redux/checkedApplicantSlice'; 

import EditIcon from '@mui/icons-material/Edit';

import { Link, useNavigate } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';


const Applicants = () => {

  const theme = useTheme()
  const colors = tokens(theme.palette.mode);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const applicants = useSelector((state) => state.applicants.applicants);
  const selectedRows = useSelector((state) => state.checkedApplicants.selectedRows);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchApplicants();
        dispatch(setApplicants(data));
         // Load selected rows from local storage and update Redux store
         const selectedFromLocalStorage = JSON.parse(localStorage.getItem('selectedRows'));
         if (selectedFromLocalStorage) {
           dispatch(setSelectedRows(selectedFromLocalStorage));
         }
    
     
      }
      catch (error) {
        console.error('Error fetching Applicant:', error);

      }
    };
    fetchData();
  }, [dispatch]);


  const onRowsSelectionHandler = (ids) => {
    const selectedRowsData = ids.map((id) => applicants.find((row) => row.id === id));
    console.log(selectedRowsData);
    dispatch(setSelectedRows(selectedRowsData));
  };

  // const handleRowSelection = (params) => {
  //   const selectedIds = params.selection.map((row) => row.id);
  //   console.log(selectedIds)
  //   dispatch(setSelectedRows(selectedIds));
  // };
  useEffect(() => {
    // Save selected rows to local storage whenever the selection changes
    localStorage.setItem('selectedRows', JSON.stringify(selectedRows));
  }, [selectedRows]);


  const handleDelete = async (id) => {

    try {
      await deleteApplicant(id);
      const updatedApplicants = applicants.filter(applicant => applicant.id !== id);
      dispatch(setApplicants(updatedApplicants));
    }
    catch (error) {
      console.error('Error deleting assessment:', error);

    }

  }
  

  const columns = [

    {
      field: "name", headerName: "Name", flex: 1, cellClassName: "name-column-cell",
    },
    {
      field: "email", headerName: "Email", flex: 1,
    },
    {
      field: "phone", headerName: "Phone", flex: 1,
    },
    {
      field: "reference", headerName: "Reference", flex: 1,
    },
    
    {
      field: "technology", headerName: "Technology", flex: 1,
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
          <Box display="flex" justifyContent="center" gap="3px" onClick={(event) => {
            event.stopPropagation()
          }}>

            <button
              onClick={(event) => {
                event.stopPropagation();

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
              <Link to={`/updateapplicant/${params.row.id}`}><EditIcon style={{ marginRight: '8px' }} /></Link>
            </button>

            <button
              onClick={(event) => {
                event.stopPropagation();
                if (event.target.tagName !== "INPUT" || event.target.type !== "checkbox") {
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
            </button>
          </Box>

        );
      },
    },
  ];

  const handleRowClick = (params, event) => {
    const isDeleteButton = event.target.tagName === 'BUTTON' && event.target.getAttribute('data-operation') === 'delete';

    if (isDeleteButton) {
      return;
    }

    const applicantId = params.row.id;
    navigate(`/applicants/${applicantId}`);
  };

  const handleClickForm = () => {
    navigate("/form")

  }



  return (
    <Box sx={{ background: `${colors.primary[400]} !important`, height: 'calc(100vh - 11.5vh)' }} >        <Header title='Applicants' subtitle="Applied applicants list in Amnil" />

      <Box mt="5px">
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
        }}
      >
        <DataGrid
          checkboxSelection
          rows={applicants}
          columns= {columns}
          components={{Toolbar: GridToolbar}}
          onRowClick={handleRowClick}
          disableSelectionOnClick
          onRowSelectionModelChange ={(ids) => onRowsSelectionHandler(ids)}
          rowsPerPageOptions={[10, 20, 50]}
          pagination
        />
      </Box>
    </Box>
  )
}

export default Applicants