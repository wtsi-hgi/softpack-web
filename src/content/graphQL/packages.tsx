import { Box, Typography } from "@mui/material"

import { ALL_PACKAGES } from "./queries"
import { useQuery } from "@apollo/client"
import { useState } from "react"

const Packages = (props: { show: boolean }) => {  
  const [errorMessage, setErrorMessage] = useState(null)

  const result = useQuery(ALL_PACKAGES, {
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
      <Typography variant="h2">Packages</Typography >
      
      {result.data.allPackages.map((pkg: {name:string, version:string}) => {
        return (
          <Box key={pkg.name}>
            <Typography>----------------------------------------------------</Typography>
            <Typography>Package Name: {pkg.name}</Typography>
            <Typography>Package Version: {pkg.version}</Typography>
          </Box>
        )
      })}
    </div>
  )
}
  
export default Packages