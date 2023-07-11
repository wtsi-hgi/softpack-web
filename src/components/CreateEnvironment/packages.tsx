import { Box, Typography } from "@mui/material"

const Packages = (props: any) => {  
  console.log('propssss', props);
  
  return (
    <div>
      <Typography variant="h2">Packages</Typography >
      
      {props.packages.map((pkg: {name:string, version:string}) => {
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