import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from '../../Theme';
const Profile = () => {
    const { user, isAuthenticated, isLoading } = useAuth0();
    const theme = useTheme();
    const colors = tokens(theme.palette.mode)
    if (isLoading) {
        return <Box>Loading ...</Box>;
    }

    return (
        isAuthenticated && (
           
            <Box display={"flex"} flexDirection={"column"} alignItems={"center"} pb={"15px"}>
             <IconButton>
             {/* <AccountCircleRoundedIcon style={{ width: "40px", height: "50px" }} /> */}
                <img src={user.picture} alt={user.name} style={{ width: "40px", height: "50px", borderRadius: "50%"}} /> </IconButton>
                <Typography variant="h5" color={colors.grey[100]}>{user.name}</Typography>

            </Box>
        )
    );
};

export default Profile;

