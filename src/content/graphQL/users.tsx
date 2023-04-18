import React, { useState } from "react"
import { Box, Typography } from "@mui/material"

import { ALL_USERS } from "./queries"
import { useQuery } from "@apollo/client"

const Users = (props: { show: boolean }) => {
  const [errorMessage, setErrorMessage] = useState(null)

  const result = useQuery(ALL_USERS, {
    onError: (error) => {
      console.log(error)
      const message = error.graphQLErrors[0].message
      setErrorMessage(message)
    }
  })
  console.log(result)

  if (result.loading) {
    return <div>loading...</div>
  }

  if (result.error) {
    return (
      <div style={{color:'red'}}>
        {result.error.message}
      </div>
    )
  }
  
  return (
    <div>
      <Typography variant="h2">Users</Typography>
      
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