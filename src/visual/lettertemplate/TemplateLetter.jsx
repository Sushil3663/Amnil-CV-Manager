import React, { useState } from 'react';
import { Box, Button } from '@mui/material';
import { Link, Outlet } from 'react-router-dom';
import { tokens } from "../../Theme";
import { useTheme } from '@mui/material';
import CancelPresentationOutlinedIcon from '@mui/icons-material/CancelPresentationOutlined';
import CoPresentOutlinedIcon from '@mui/icons-material/CoPresentOutlined';

const OfferLetterEditor = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    // const [show, setShow] = useState(true);

    // const handleToggle = () => {
    //     setShow(!show);
    // };

    return (
      
        <Box
            sx={{
                background: `${colors.primary[400]} !important`,
                height: 'calc(100vh - 14vh)',
                p: 2,
            }}
        >
            {/* <Box
                display="flex"
                justifyContent="end"
                alignItems="center"
                gap={2}
                mt={2}
                mb={1}
                mr={"10px"}
            >
                {show ? (
                    <Link
                        to="reject"
                        onClick={handleToggle}
                    >
                        <Button style={{
                            background: 'red',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            padding: '8px 16px',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                        }}>Reject<CancelPresentationOutlinedIcon /></Button>

                    </Link>
                ) : (
                    <Link
                        to="offer"
                        onClick={handleToggle}
                    >
                         <Button style={{
                            background: 'Green',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            padding: '8px 16px',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                        }}>Offer<CoPresentOutlinedIcon /></Button>
                    </Link>
                )}
            </Box> */}
           
                    {/* <Link
                        to="offer"
                        // onClick={handleToggle}
                    >
                        <Button style={{
                            background: 'red',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            padding: '8px 16px',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                        }}>Offer<CancelPresentationOutlinedIcon /></Button>

                    </Link> */}
                

            <Outlet />
        </Box>
    );
};

export default OfferLetterEditor;
