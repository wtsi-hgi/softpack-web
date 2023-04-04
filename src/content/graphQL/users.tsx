import React, { useState } from "react"
import { Box, Typography } from "@mui/material"

import { ALL_USERS } from "./queries"
import { useQuery } from "@apollo/client"

const User = ({ person, onClose }) => {
  return (
    <div>
      <h2>{person.name}</h2>
      <div>
        {person.address.street} {person.address.city}
      </div>
      <div>{person.phone}</div>
      <button onClick={onClose}>close</button>
    </div>
  )
}

const Users = (props: { show: boolean }) => {
  const [users, setUsers] = useState(null)

  const result = useQuery(ALL_USERS)
  console.log(result)

  if (!props.show) {
    return null
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