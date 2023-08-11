import React from 'react'
import Header from '../../components/Header'
import { Box } from '@mui/material'
import BarCharts from '../../components/BarCharts'

const Bar = () => {
  return (
    <Box>
        <Header title="BarChart" subtitle={"View Applicant Bar Chart"} />
        <Box height="71vh">
            <BarCharts />
        </Box>

    </Box>
  )
}

export default Bar