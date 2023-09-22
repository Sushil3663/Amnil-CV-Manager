import React, { useEffect } from 'react';
import { Box, Button, useTheme } from '@mui/material';
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
import ChecklistOutlinedIcon from '@mui/icons-material/ChecklistOutlined';
import { Link, useNavigate } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import './applicant.css'
import { useState } from 'react';
import { clearReason } from '../../redux/blacklistSlice';

const Applicants = () => {

  const theme = useTheme()
  const colors = tokens(theme.palette.mode);


  const navigate = useNavigate();
  const dispatch = useDispatch();
  const applicants = useSelector((state) => state.applicants.applicants);



  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchApplicants();
        dispatch(setApplicants(data));

        const savedSelectedRows = localStorage.getItem('selectedRows');
        if (savedSelectedRows) {
          dispatch(setSelectedRows(JSON.parse(savedSelectedRows)));
        }
      }
      catch (error) {
        console.error('Error fetching Applicant:', error);
      }
    };
    fetchData();
  }, [dispatch]);



  const [storedSelectedCandidate, setStoredSelectedCandidate] = useState(() => {
    const data = JSON.parse(localStorage.getItem('selectedRows'));
    return data || [];
  });

  const [storedBlacklist, setStoredBlacklist] = useState(() => {
    const data = JSON.parse(localStorage.getItem('blacklist'));
    return data || [];
  });

  const handleDelete = async (id) => {
    const confirmed = window.confirm("Are you sure you want to delete this applicant..?");
    if (confirmed) {
      try {
        await deleteApplicant(id);
        const updatedApplicants = applicants.filter(applicant => applicant.id !== id);
        dispatch(setApplicants(updatedApplicants));

        const filteredData = storedBlacklist.filter(item => item.id !== id);
        setStoredBlacklist(filteredData);
        localStorage.setItem('blacklist', JSON.stringify(filteredData));

        const filteredSelectedData = storedSelectedCandidate.filter(item => item.id!== id);
        setStoredSelectedCandidate(filteredSelectedData);
        localStorage.setItem('selectedRows', JSON.stringify(filteredSelectedData));

        dispatch(clearReason({ id }));

      } catch (error) {
        console.error('Error deleting applicant:', error);
      }
    }
  };
  const handleList = (id) => {

    const selectedRowsData = applicants.find((row) => row.id === id);

    const storedData = JSON.parse(localStorage.getItem('selectedRows')) || [];

    const storedBlacklist = JSON.parse(localStorage.getItem('blacklist')) || [];

    // Check if the selected applicant is already on the blacklist
    const isBlacklisted = storedBlacklist.some((applicant) => applicant.id === id);

    if (isBlacklisted) {
      alert("This applicant is already on the blacklist.");
      return;
    }

    // Check if the selected applicant is already selected
    const isSelected = storedData.some((applicant) => applicant.id === id);

    if (isSelected) {
      alert("This applicant is already selected.");
      return;
    }



    storedData.push(selectedRowsData);
    localStorage.setItem('selectedRows', JSON.stringify(storedData));

    dispatch(setSelectedRows(storedData))

  }



  const handleView = (id) => {
    const applicantId = id;
    navigate(`/applicants/${applicantId}`);


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
      field: "technology", headerName: "Technology", flex: 1,
    },
    {
      field: "level", headerName: "Level", flex: 1,
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
      field: "view",
      headerName: "View",
      flex: 1,
      renderCell: (params) => {
        return (
          <Box display="flex" justifyContent="center" gap="3px" onClick={(event) => {
            event.stopPropagation()
          }}>

            <Button
              onClick={() => handleView(params.id)}



              style={{
                background: 'green',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                padding: '8px 16px',
                cursor: 'pointer',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >View

            </Button>


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
          <Box display="flex" justifyContent="center" gap="3px" onClick={(event) => {
            event.stopPropagation()
          }}>

            <Button
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
            </Button>

            <Button
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
            </Button>
          </Box>

        );
      },
    },
  ];

  // const handleRowClick = (params, event) => {
  //   const isDeleteButton = event.target.tagName === 'BUTTON' && event.target.getAttribute('data-operation') === 'delete';
  //   const isCheckbox = event.target.tagName === 'INPUT' && event.target.getAttribute('type') === 'checkbox';

  //   if (isDeleteButton || !isCheckbox) {
  //     return;
  //   }

  //   // Prevent default behavior (selection) when a row is clicked
  //   event.preventDefault();

  //   const applicantId = params.row.id;
  //   navigate(`/applicants/${applicantId}`);
  // };

  const handleClickForm = () => {
    navigate("/form")

  }
  const handleBlackList = () => {
    navigate("/applicants/blacklist")

  }


  return (
    <Box sx={{ background: `${colors.primary[400]} !important`, height: 'calc(100vh - 10vh)' }} >

      <Header title='Applicants' subtitle="Applied applicants list in Amnil" />

      <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"}>

        <Box mt="5px">
          <Button
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
          </Button>

        </Box>
        <Box mt="5px">
          <Button
            onClick={handleBlackList}
            style={{
              background: 'red',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              padding: '8px 16px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              marginRight: "4rem"
            }}

          >
            View Blacklist
          </Button>

        </Box>
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
          columns={columns}
          components={{ Toolbar: GridToolbar }}
          // onRowClick={handleRowClick}
          disableSelectionOnClick
          // onRowSelectionModelChange ={(ids) => onRowsSelectionHandler(ids)}
          rowsPerPageOptions={[10, 20, 50]}
          pagination
          getCellClassName={(params) => {
            const storedBlacklist = JSON.parse(localStorage.getItem('blacklist')) || [];
            const isBlacklisted = storedBlacklist.some((applicant) => applicant.id === params.id);

            const storedData = JSON.parse(localStorage.getItem('selectedRows')) || [];
            const isSelected = storedData.some((applicant) => applicant.id === params.id);

            if (isBlacklisted) {
              return 'blur-red';
            } else if (isSelected) {
              return 'blur-green';
            } else {
              return '';
            }
          }}
        />
      </Box>
    </Box>
  )
}

export default Applicants