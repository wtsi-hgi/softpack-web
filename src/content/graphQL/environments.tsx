import React from "react"
import { Box } from "@mui/material"


const Environments = (props: { show: boolean }) => {
  if (!props.show) {
    return null
  }
  
  return (
    <Box>Hello from environments</Box>
  )
}

export default Environments