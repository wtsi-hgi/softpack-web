import React, { useState } from "react"
import { Box, Typography } from "@mui/material"

import { ALL_USERS } from "./queries"
import { useQuery } from "@apollo/client"

const Users = (props: { show: boolean }) => {
  const result = useQuery(ALL_USERS)
  console.log(result)

  if (result.loading) {
    return <div>loading...</div>
  }
  
  return (
    <div>
      <h2>Users</h2>
      
      {result.data.allUsers.map((user: {id:string, name:string}) => {
        return (
          <Box key={user.id}>
            <Typography>----------------------------------------------------</Typography>
            <Typography>User ID: {user.id}</Typography>
            <Typography>User name: {user.name}</Typography>
          </Box>
        )
      })}
    </div>
  )
}
  
export default Users