import { Box, Typography } from "@mui/material"

import { ALL_ENVIRONMENTS } from "./queries"
import { useQuery } from "@apollo/client"

const Environments = (props: { show: boolean }) => {
  const result = useQuery(ALL_ENVIRONMENTS)
  console.log(result)

  if (result.loading) {
    return <div>loading...</div>
  }

  if (!props.show) {
    return null
  }
  
  return (
    <div>
      <h2>Environments</h2>
      
      {result.data.allEnvironments.map((env: {name:string, packages:any[], owners:any[]}) => {
        return (
          <Box key={env.name}>
            <Typography>----------------------------------------------------</Typography>
            <Typography>Environment Name: {env.name}</Typography>
            <Typography>Environment Packages: {env.packages}</Typography>
            <Typography>Environment Owners: {env.owners}</Typography>
          </Box>
        )
      })}
    </div>
  )
}
  
export default Environments