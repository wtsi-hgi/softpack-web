import React from "react"
import { Box, Typography } from "@mui/material"
import { useState } from 'react'
import { useMutation } from '@apollo/client'
import { ALL_USERS, CREATE_USER } from "./queries"

const AddUser = (props: { show: boolean }) => {
  const [errorMessage, setErrorMessage] = useState(null)
  const [name, setName] = useState('')

  const [ createUser ] = useMutation(CREATE_USER, {
    refetchQueries: [ {query: ALL_USERS} ],
    onError: (error) => {
      console.log(error)
      const message = error.graphQLErrors[0].message
      setErrorMessage(message)
    }
  })

  const submit = async (event) => {
    event.preventDefault()

    createUser({  variables: { name } })

    setName('')
  }
  
  return (
    <div>
      <Typography variant="h2">Create New User</Typography>

      {errorMessage && 
        <div style={{color:'red'}}>
        {errorMessage}
      </div>}

      <form onSubmit={submit}>
        <div>
          name <input value={name}
            onChange={({ target }) => setName(target.value)}
          />
        </div>
        <button type='submit'>add!</button>
      </form>
    </div>
  )
}
  
export default AddUser
