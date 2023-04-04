import React from "react"
import { Box } from "@mui/material"

const AddUser = (props: { show: boolean }) => {
  if (!props.show) {
    return null
  }
  
  return (
    <Box>Hello from add users!</Box>
  )
}
  
export default AddUser