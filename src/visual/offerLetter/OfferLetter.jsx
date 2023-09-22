/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { Box, Button, MenuItem, Select, Typography, useTheme } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { tokens } from '../../Theme';

import Header from '../../components/Header';
import { useNavigate } from 'react-router-dom';


const OfferLetter = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();

  const getStatus = (templateName) => {
    // Retrieve the status for the given template name from local storage
    console.log(templateName);
    const status = localStorage.getItem(`${templateName}`);
    return status === 'true' ? 'Sent' : 'Pending';
  };
 
  const [offeredApplicant, setOfferedApplicant] = useState(() => {
    const data = JSON.parse(localStorage.getItem('offeredRows')) || [];
    return data;
  });

  const generateUniqueId = () => {
    return Math.random().toString(36).substr(2, 9);
  };

  const [selectedOfferLetters, setSelectedOfferLetters] = useState([]);
  const [selectedCandidate, setSelectedCandidate] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState('');


  useEffect(() => {
    const storedOfferLetters = JSON.parse(localStorage.getItem('ReviewLetter')) || [];
    setSelectedOfferLetters(storedOfferLetters);

    const storedSelectedCandidate = localStorage.getItem('selectedCandidate') || [];
    const storedSelectedTemplate = localStorage.getItem('selectedTemplate') || [];

      if (storedSelectedCandidate) {
      setSelectedCandidate(storedSelectedCandidate);
    }

    if (storedSelectedTemplate) {
      setSelectedTemplate(storedSelectedTemplate);
    }

  },[]);
 


  const handleCreateClick = () => {
    const selectedCandidateData = offeredApplicant.find(
      (applicant) => applicant.name === selectedCandidate
    );

    let templateName = '';
  
    switch (selectedTemplate) {
      case 'dotnet':
        templateName = 'DotNetTemplate';
        break;
      case 'react':
        templateName = 'ReactTemplate';
        break;
      case 'qa':
        templateName = 'QATemplate';
        break;
      case 'hr':
        templateName = 'HRTemplate';
        break;
      default:
        templateName = 'UnknownTemplate';
        break;
    }
  
    const newOfferLetter = {
      id: generateUniqueId(),
      name: selectedCandidateData.name,
      technology: selectedTemplate,
      template: templateName,

    };
    const updatedOfferLetters = [...selectedOfferLetters, newOfferLetter];
    setSelectedOfferLetters(updatedOfferLetters);
    localStorage.setItem('ReviewLetter', JSON.stringify(updatedOfferLetters));

    
    // // Stored selectedCandidate and selectedTemplate in localStorage
    localStorage.setItem('selectedCandidate', (selectedCandidate));
    localStorage.setItem('selectedTemplate', (selectedTemplate));



    
  };

  const handleView = (id, template) => {
    // console.log(template);
    console.log(id);
    const selectedCandidateData = offeredApplicant.find(
      (applicant) => applicant.name === selectedCandidate
    );
    const formDataJSON = JSON.stringify(selectedCandidateData);
    let templateTech = '';
  
    switch (template) {
      case 'DotNetTemplate':
        templateTech = 'dotnet';
        break;
      case 'ReactTemplate':
        templateTech = 'react';
        break;
      case 'QATemplate':
        templateTech = 'qa';
        break;
      case 'HRTemplate':
        templateTech = 'hr';
        break;
      default:
        templateTech = 'ut';
        break;
    }

    localStorage.setItem(`${selectedTemplate}Template`, formDataJSON);

    navigate(`/template/${templateTech}`);
  };

  const columns = [
    {
      field: 'name',
      headerName: 'Name',
      flex: 1,
      cellClassName: 'name-column-cell',
    },
    {
      field: 'technology',
      headerName: 'Technology',
      flex: 1,
    },
    {
      field: 'template',
      headerName: 'Template',
      flex: 1,
    },
    {
      field: 'action',
      headerName: 'Action',
      flex: 1,
      renderCell: (params,event) => (
        <Box>
          <Button
           onClick={() => handleView(params.id, params.row.template)}
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
            data-operation="preview"
          >
           {getStatus(params.row.template) === 'Sent' ? 'Preview' : 'Review'}
          </Button>
        </Box>
      ),
    },
    {
      field: 'status',
      headerName: 'Status',
      flex: 1,
      renderCell: (params) => (
        <Box>
          <Typography>{getStatus(params.row.template)}</Typography>
        </Box>
      ),
    },
    
  ];

  const handleRowClick = (params, event) => {
    const isPreviewButton = event.target.tagName === 'BUTTON' && event.target.getAttribute('data-operation') === 'preview';
    
   
    if (isPreviewButton) {
      return;
    }
    const selectedCandidates = offeredApplicant.find(
      (applicant) => applicant.name === selectedCandidate
    );

    console.log(selectedCandidates.id)
  
    const applicantId=  selectedCandidates.id
  
    navigate(`/offerform/${applicantId}`);
  };

  return (
    <Box sx={{ background: `${colors.primary[400]} !important`, height: 'calc(100vh - 10vh)', paddingRight: '10px' }}>
      <Box>
        <Header title="Offer Letter Status" subtitle="Selected Candidate for sending Offer Letter" />
      </Box>

      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Box>
          <Select
            displayEmpty
            value={selectedCandidate}
            onChange={(e) => setSelectedCandidate(e.target.value)}
            variant="outlined"
            sx={{ marginRight: '16px' }}
          >
            <MenuItem  value=""  style={{ color: colors.grey[100] }}>
              Candidate
            </MenuItem>
            {offeredApplicant.map((applicant, index) => (
              <MenuItem key={index} value={applicant.name}>
                {applicant.name}
              </MenuItem>
            ))}
          </Select>
        </Box>

        <Box>
          <Select
            displayEmpty
            value={selectedTemplate}
            onChange={(e) => setSelectedTemplate(e.target.value)}
            variant="outlined"
            sx={{ marginRight: '16px' }}
          >
            <MenuItem  value="" style={{ color: colors.grey[100] }}>
              Choose OfferLetter
            </MenuItem>
            <MenuItem value="dotnet" style={{ color: colors.grey[100] }}>
              DotNetTemplate
            </MenuItem>
            <MenuItem value="react" style={{ color: colors.grey[100] }}>
              ReactTemplate
            </MenuItem>
            <MenuItem value="qa" style={{ color: colors.grey[100] }}>
              QATemplate
            </MenuItem>
            <MenuItem value="hr" style={{ color: colors.grey[100] }}>
              HRTemplate
            </MenuItem>
          </Select>
        </Box>
        <Box sx={{ background: `${colors.primary[400]} !important` }}>
          <Button variant="contained" onClick={handleCreateClick}>
            <Typography>Create</Typography>
          </Button>
        </Box>
      </Box>

      <Box
        m="40px 0 0 0"
        height="65vh"
        sx={{
          '& .MuiDataGrid-root': {
            border: 'none',
          },
          '& .MuiDataGrid-cell': {
            borderBottom: 'none',
          },
          '& .name-column--cell': {
            color: colors.greenAccent[300],
          },
          '& .MuiDataGrid-columnHeaders': {
            backgroundColor: colors.blueAccent[700],
            borderBottom: 'none',
          },
          '& .MuiDataGrid-virtualScroller': {
            backgroundColor: colors.primary[400],
          },
          '& .MuiDataGrid-footerContainer': {
            borderTop: 'none',
            backgroundColor: colors.blueAccent[700],
          },
          '& .MuiCheckbox-root': {
            color: `${colors.greenAccent[200]} !important`,
          },
          '& .MuiDataGrid-toolbarContainer .MuiButton-text': {
            color: `${colors.grey[100]} !important`,
          },
        }}
      >
        <DataGrid
          checkboxSelection
          rows={selectedOfferLetters}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
          onRowClick={handleRowClick}
          rowsPerPageOptions={[10, 20, 50]}
          pagination
        />

      </Box>
    </Box>
  );
};

export default OfferLetter;
