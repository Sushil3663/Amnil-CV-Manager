import { useTheme } from '@emotion/react'
import React from 'react'
import { tokens } from '../Theme';
import { Box, Typography } from '@mui/material';

const Header = ({ title, subtitle }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    return (
      <Box sx ={{color:colors.grey[400]}}>
        <Typography
          variant="h4"
          color={colors.grey[100]}
          fontWeight="bold"
          sx={{ m: "0 0 5px 0" }}
        >
          {title}
        </Typography>
        <Typography variant="h6" color={colors.greenAccent[400]}>
          {subtitle}
        </Typography>
      </Box>
    );
  };
  
  export default Header;