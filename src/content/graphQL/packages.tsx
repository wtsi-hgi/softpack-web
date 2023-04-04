import { Box, Typography } from "@mui/material"

import { ALL_PACKAGES } from "./queries"
import { useQuery } from "@apollo/client"

const Packages = (props: { show: boolean }) => {
  const result = useQuery(ALL_PACKAGES)
  console.log(result)

  if (!props.show) {
    return null
  }
  
  return (
    <div>
      <h2>Packages</h2>
      
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