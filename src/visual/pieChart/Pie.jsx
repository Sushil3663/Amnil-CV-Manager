import React from 'react'
import Header from '../../components/Header'
import { Box } from '@mui/material'
import PieCharts from '../../components/PieCharts'

const Pie = () => {
  return (
    <Box>
        <Header title="PieCharts" subtitle={"View Applicant Pie Chart"} />
        <Box height="71vh">
            <PieCharts />
        </Box>

    </Box>
  )
}

export default Pie;