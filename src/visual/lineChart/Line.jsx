import React from 'react'
import Header from '../../components/Header'
import { Box } from '@mui/material'
import LineCharts from '../../components/LineCharts'

const Line = () => {
  return (
    <Box>
        <Header title="LineCharts" subtitle={"View Applicant Line Chart"} />
        <Box height="71vh">
            <LineCharts />
        </Box>

    </Box>
  )
}

export default Line;