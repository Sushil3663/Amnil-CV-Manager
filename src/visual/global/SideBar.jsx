import React from 'react'
import { useState } from 'react'
import { Box, useTheme, IconButton, Typography, Collapse, Button } from '@mui/material';
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import "react-pro-sidebar/dist/css/styles.css";
import { Link } from 'react-router-dom';
import { tokens } from '../../Theme';
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import AssessmentRoundedIcon from '@mui/icons-material/AssessmentRounded';
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
// import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
// import PieChartOutlineOutlinedIcon from "@mui/icons-material/PieChartOutlineOutlined";
// import TimelineOutlinedIcon from "@mui/icons-material/TimelineOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import WorkOutlineOutlinedIcon from '@mui/icons-material/WorkOutlineOutlined';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import LocalOfferOutlinedIcon from '@mui/icons-material/LocalOfferOutlined';

import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import { useAuth0 } from "@auth0/auth0-react";
import Profile from './Profile';

const SideBar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const { logout } = useAuth0();

  const [isCollapsed, setIsCollapsed] = useState(false);

  const [isJobsOpen, setIsJobsOpen] = useState(false); // Added state for the dropdown

  const [anchorel, setAnchorel] = useState(null);

  const collapsed = () => {
    setIsCollapsed(!isCollapsed)
  }

  const handleJobsToggle = () => {
    setIsJobsOpen(!isJobsOpen);
  };

  const handleDropdownToggle = (event) => {
    setAnchorel(anchorel ? null : event.currentTarget);
  };


  return (
    <Box display={"flex"} height="100vh" sx={{
      "& .pro-sidebar-inner": {
        background: `${colors.primary[400]} !important`,
      },
      "& .pro-icon-wrapper": {
        backgroundColor: "transparent !important",
      },
      "& .pro-inner-item": {
        padding: "5px 35px 5px 20px !important",
      },
      "& .pro-inner-item:hover": {
        color: "#868dfb !important",
      },
      "& .pro-menu-item.active": {
        color: "#6870fa !important",
      },
    }}>
      <ProSidebar collapsed={isCollapsed}>
        <Menu>
          <MenuItem
            onClick={collapsed}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{
              margin: "10px 0 20px 0",
              color: colors.primary[400],
            }}
          >
            {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="15px"
              >
                <Typography variant="h4" color={colors.grey[100]}>
                  Admin
                </Typography>
                <IconButton onClick={collapsed}>
                  <MenuOutlinedIcon />
                </IconButton>
              </Box>
            )}
          </MenuItem>

          {!isCollapsed && (
            <Profile />)}



          {!isCollapsed && (<Box>
            <MenuItem icon={<HomeOutlinedIcon />} style={{ color: colors.grey[100] }} >
              <Typography variant="h6" color={colors.grey[100]}>
                Dashboard
              </Typography>
              <Link to="/" />
            </MenuItem>

            <MenuItem icon={<PeopleOutlinedIcon />} style={{ color: colors.grey[100] }} >
              <Typography variant="h6" color={colors.grey[100]}>
                Applicants
              </Typography>
              <Link to="/applicants" />
            </MenuItem>

            <MenuItem icon={<ContactsOutlinedIcon />} style={{ color: colors.grey[100] }}>
              <Typography variant="h6" color={colors.grey[100]}>
                Candidates
              </Typography>
              <Link to="/contact" />
            </MenuItem>


            <MenuItem icon={<ReceiptOutlinedIcon />} style={{ color: colors.grey[100] }}>
              <Typography variant="h6" color={colors.grey[100]}>
                Profile Form
              </Typography>
              <Link to="/form" />
            </MenuItem>

            <MenuItem icon={<AssessmentRoundedIcon />} style={{ color: colors.grey[100] }}>
              <Typography variant="h6" color={colors.grey[100]}>
                Assesment
              </Typography>
              <Link to="/assesment" />
            </MenuItem>

            <MenuItem icon={<CalendarTodayOutlinedIcon />} style={{ color: colors.grey[100] }}>
              <Typography variant="h6" color={colors.grey[100]}>
                Interview
              </Typography>
              <Link to="/calander" />
            </MenuItem>

            <MenuItem
              icon={<WorkOutlineOutlinedIcon />}
              style={{ color: colors.grey[100] }}
              onClick={handleJobsToggle} // Toggle the Jobs dropdown
            >
              <Typography variant="h6" color={colors.grey[100]}>
                Jobs
                <IconButton onClick={handleJobsToggle}>
                  {isJobsOpen ? <ExpandLess /> : <ExpandMore />}
                </IconButton>
              </Typography>

            </MenuItem>
            <Collapse in={isJobsOpen}>
              <Box marginLeft={"15px"} color={colors.grey[100]}>
                <Menu
                  anchorel={anchorel}
                  open={Boolean(anchorel)}
                  onClose={handleDropdownToggle}
                  anchororigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                  }}
                  transformorigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                >

                  <MenuItem onClick={handleDropdownToggle} style={{ color: colors.grey[100] }}>

                    <Link to="/domain">
                      <Typography variant="h6" color={colors.grey[100]}>Job Domain </Typography>
                    </Link>
                  </MenuItem>

                  <MenuItem onClick={handleDropdownToggle} style={{ color: colors.grey[100] }}>
                    <Link to="/level">
                      <Typography variant="h6" color={colors.grey[100]}>Job Level</Typography>
                    </Link>
                  </MenuItem>

                  <MenuItem onClick={handleDropdownToggle} style={{ color: colors.grey[100] }}>
                    <Link to="/position">
                      <Typography variant="h6" color={colors.grey[100]}>Job Position</Typography>
                    </Link>
                  </MenuItem>

                  <MenuItem onClick={handleDropdownToggle} style={{ color: colors.grey[100] }}>
                    <Link to="/status">
                      <Typography variant="h6" color={colors.grey[100]}>Job Application Status</Typography>
                    </Link>
                  </MenuItem>

                </Menu>
              </Box>
            </Collapse>

            <MenuItem icon={<LocalOfferOutlinedIcon />} style={{ color: colors.grey[100] }}>
              <Typography variant="h6" color={colors.grey[100]}>
                Letter Template
              </Typography>
              <Link to="/template" />
            </MenuItem>

            <MenuItem icon={<ReceiptOutlinedIcon />} style={{ color: colors.grey[100] }}>
              <Typography variant="h6" color={colors.grey[100]}>
                Offer Letter
              </Typography>
              <Link to="/offer" />
            </MenuItem>

            <MenuItem icon={<LogoutOutlinedIcon />} style={{ color: colors.grey[100] }}>
              <Typography variant="h6" color={colors.grey[100]}>
                <Button style={{ color: colors.grey[100] }} onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>
                  LogOut
                </Button>
              </Typography>

            </MenuItem>



          </Box>)}

          {/* {!isCollapsed && (
            <Box>
              <Item
              title="Dashboard"
              to="/"
              icon={<HomeOutlinedIcon/>}
              selected={selected}
              setSelected={setSelected}
              />
            </Box>
          )
          } */}




        </Menu>
      </ProSidebar>

    </Box>

  )
}

export default SideBar