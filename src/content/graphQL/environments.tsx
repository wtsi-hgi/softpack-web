import { Box, Typography } from "@mui/material"

import { ALL_ENVIRONMENTS } from "./queries"
import { useQuery } from "@apollo/client"
import { useState } from "react"
import ApplicationsTransactions from "./Table"

const Owner = (owner: any) => {
  return (
    <Box key={owner.id}>
      <Typography variant="h3">Owner:</Typography>
      <Typography>Name: {owner.name}</Typography>
      <Typography>Owner ID: {owner.id}</Typography>
    </Box>
  )
}

const Package = (pckg: any) => {
  return (
    <Box key={pckg.version}>
      <Typography variant="h3">Package:</Typography>
      <Typography>Name: {pckg.name}</Typography>
      <Typography>Package Version: {pckg.version}</Typography>
    </Box>
  )
}

const Environments = (props: { show: boolean }) => {
  const [errorMessage, setErrorMessage] = useState(null)

  {/*const result = useQuery(ALL_ENVIRONMENTS, {
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
  }*/}
  
  return (
    <div>
      <ApplicationsTransactions />

      {/*{console.log(result.data.allEnvironments)}
      
      {result.data.allEnvironments.map((env: {name:string, packages:any[], owners:any[]}) => {
        return (
          <Box key={env.name}>
            <Typography>----------------------------------------------------</Typography>
            <Typography>Environment Name: {env.name}</Typography>
            {env.owners.map((owner) => Owner(owner))}
            {env.packages.map((pckg) => Package(pckg))}
          </Box>
        )
      })}*/}
    </div>
  )
}
  
export default Environments