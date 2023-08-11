import React from "react";
import { Box, Typography } from '@mui/material';
import { tokens } from "../../Theme";
import { useLocation } from "react-router-dom"; 
import {  useTheme } from '@mui/material';
import { formatDate } from "../calander/FormateDate";


const Letter = () => {
  const location = useLocation();
  const { name, email, phone, address, technology } = location.state;

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
      <Box sx={{ background: `${colors.primary[400]} !important`, height: 'calc(100vh - 11.5vh)', }}>
        <Typography variant="h4" align="center">
          Amnil Technology
        </Typography>
        <Typography variant="h5" paragraph>
          Date: {formatDate()}
        </Typography>
        
        <Typography variant="h5" paragraph>
          Dear {name},
        </Typography>
        <Typography variant="h5" paragraph>
          Subject: Offer of Employment for the Position of {technology}
        </Typography>
        
        <Typography variant="h5" paragraph>
          We are pleased to extend an offer of employment to you for the position of {technology} at Amnil Technology. We were highly impressed with your qualifications, skills, and experience, and after careful consideration, we believe that you will be a valuable addition to our team.
        </Typography>

        
        <Typography variant="h5" paragraph>We look forward to having you join our team and contributing your expertise to Amnil Technology. If you have any questions or require further clarification, please do not hesitate to contact us.  I hope you  still have either this Email: {email} or Phone: {phone}. your address i.e {address} is near to Amnil Technology. So that you feel easy on this journey with Amnil Technology.</Typography> 
        

        <Typography variant="h5" paragraph>
          Once again, congratulations on your appointment, and we eagerly await your positive response.
        </Typography>

        <Typography variant="h5" paragraph>
          Amnil Technology
          <br />
          HR Department
        </Typography>
      </Box>
  );
};

export default Letter;





