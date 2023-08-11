import React, { useEffect } from 'react';
import { Box, useTheme } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { DataGridCellCheckbox } from '@mui/x-data-grid';
import { tokens } from '../../Theme';
import Header from '../../components/Header';
import { fetchApplicants } from '../../api/Api';
import { setApplicants } from '../../redux/applicantSlice';
import { deleteApplicant } from '../../api/Api';
import CreateNewFolderOutlinedIcon from '@mui/icons-material/CreateNewFolderOutlined';
// import { setSelectedRows } from '../../redux/checkedApplicantSlice'; 
import DeleteIcon from '@mui/icons-material/Delete';

import EditIcon from '@mui/icons-material/Edit';

import { Link, useNavigate } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';


const Applicants = () => {

  const theme = useTheme()
  const colors = tokens(theme.palette.mode);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const applicants = useSelector((state) => state.applicants.applicants);
  // const selectedRows = useSelector((state) => state.checkedApplicants.selectedRows); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchApplicants();
        dispatch(setApplicants(data));
        // const savedSelectedRows = localStorage.getItem('selectedRows');
        // if (savedSelectedRows) {
        //   dispatch(setSelectedRows(JSON.parse(savedSelectedRows)));
        // }
      }
      catch (error) {
        console.error('Error fetching Applicant:', error);

      }
    };
    fetchData();
  }, [dispatch])

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
  // const handleCheckboxChange = (event, id) => {
  //   // The event parameter represents the checkbox change event, and the id is the unique identifier of the row.
  
  //   // Get whether the checkbox is checked or not
  //   const checked = event.target.checked;
  
  //   if (checked) {
  //     // If the checkbox is checked, add the current id to the list of selectedRows
  //     const newSelectedRows = [...selectedRows, id];
  
  //     // Dispatch the action to update the selectedRows state in Redux store
  //     dispatch(setSelectedRows(newSelectedRows));
  
  //     // Store the updated selectedRows list in localStorage to persist the state
  //     localStorage.setItem('selectedRows', JSON.stringify(newSelectedRows));
  //   } else {
  //     // If the checkbox is unchecked, remove the current id from the list of selectedRows
  //     const newSelectedRows = selectedRows.filter(rowId => rowId !== id);
  
  //     // Dispatch the action to update the selectedRows state in Redux store
  //     dispatch(setSelectedRows(newSelectedRows));
  
  //     // Store the updated selectedRows list in localStorage to persist the state
  //     localStorage.setItem('selectedRows', JSON.stringify(newSelectedRows));
  //   }
  // };
  



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
    // {
    //     field: "technology", headerName: "Technology",flex:1, renderCell: ({technology})=>{
    //         return(
    //             <Box
    //             width="40%" m={"0 auto"} p="5px" display={"flex"} justifyContent={"center"} backgroundColor={
    //                 technology === "react" ? colors.blueAccent[400] : colors.blueAccent[500]} borderRadius={"4px"} >
    //                     { technology === "Dot Net" && <FiberManualRecordIcon />}
    //                     { technology === "React" && <AcUnitOutlinedIcon />}
    //                     { technology === "QA" && <BugReportOutlinedIcon />}

    //                 </Box>
    //         )
    //     },
    // },
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
                // Check if the event target is the checkbox
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
          // columns={columns.map((column) => ({
          //   ...column,
          //   renderCell: (params) => {
          //     if (column.field === 'operation') {
          //       return column.renderCell(params);
          //     }
          //     return (
          //       <DataGridCellCheckbox
          //         {...params}
          //         onChange={(event) => handleCheckboxChange(event, params.row.id)}
          //       />
          //     );
          //   },
          // }))}
          components={{
            Toolbar: GridToolbar
          }}
          onRowClick={handleRowClick}
          rowsPerPageOptions={[10, 20, 50]}
          pagination
        />
      </Box>
    </Box>
  )
}

export default Applicants