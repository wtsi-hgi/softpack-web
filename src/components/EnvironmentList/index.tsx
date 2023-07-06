import Grid from "@mui/material/Grid";
import {
    Card, CardContent, Chip, Divider, InputBase, Link, Paper, Typography
} from "@mui/material";

import Box from "@mui/material/Box";
import ListItem from "@mui/material/ListItem";
import List from "@mui/material/List";
import IconButton from "@mui/material/IconButton";
import SearchIcon from '@mui/icons-material/Search';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import FolderIcon from '@mui/icons-material/Folder';
import AppsIcon from '@mui/icons-material/Apps';
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import {Fragment} from "react";

import data from './data.json';

const EnvironmentList = () => {
    return (
        <Box>
            <Grid
                container
                justifyContent="space-between"
                alignItems="center"
            >
                <Grid item>
                    <h1>Environments</h1>
                </Grid>
                <Grid>
                    <Paper
                        component="form"
                        sx={{ mt: 1, mb: 2, px: 2, display: 'flex', alignItems: 'center', width: 400 }}
                    >
                        <InputBase
                            sx={{ ml: 1, flex: 1 }}
                            placeholder="Search environments"
                            inputProps={{ 'aria-label': 'environments' }}
                        />
                        <IconButton type="button" aria-label="search">
                            <SearchIcon />
                        </IconButton>
                    </Paper>
                </Grid>
            </Grid>
            <Card >
                <CardContent>
                    <Box>
                        <List>
                            {
                                data.data.environments.map((item, index) => (
                                    <Fragment>
                                        <ListItem
                                            key={index}
                                            sx={{ m: 0, p: 0 }}
                                            secondaryAction={
                                                <Box>
                                                    <IconButton edge="end" aria-label="edit">
                                                        <EditIcon sx={{ m: 1 }} />
                                                    </IconButton>
                                                    <IconButton edge="end" aria-label="delete">
                                                        <DeleteIcon sx={{ m: 1 }} />
                                                    </IconButton>
                                                </Box>
                                            }
                                        >
                                            <Box height={150} width={4} bgcolor="green"/>
                                            <Box width={"90%"} sx={{ px: 2 }}>
                                                <Typography sx={{fontWeight: 'bold', mb: 1 }}>{item.name}</Typography>
                                                <Typography>{item.description}</Typography>
                                                <Box
                                                    sx={{
                                                        display: 'flex',
                                                        justifyContent: 'space-between',
                                                    }}
                                                >
                                                    <ListItem sx={{ m: 0, p: 0 }}>
                                                        <ListItemIcon><FolderIcon color="primary" /></ListItemIcon>
                                                        <ListItemText>
                                                            <Link href="#" underline="none">
                                                                {item.path}
                                                            </Link>
                                                        </ListItemText>
                                                    </ListItem>
                                                    <Box sx={{ mt: 2, display: 'flex', justifyContent:"flex-end" }} >
                                                        <Chip sx={{ mr: 1 }} label="Python 3.10.8" color="primary" variant="outlined" size="small" />
                                                        <Chip sx={{ mr: 1 }} label="R 4.2.3" color="primary" variant="outlined" size="small" />
                                                    </Box>
                                                </Box>
                                                <ListItem sx={{ m: 0, p: 0 }}>
                                                    <ListItemIcon><AppsIcon color="primary"/></ListItemIcon>
                                                    <ListItemText>
                                                        {item.packages.map( p => p.name).slice(0,25).sort().join(' • ')}
                                                    </ListItemText>
                                                </ListItem>
                                            </Box>
                                        </ListItem>
                                        <Divider sx={{ my: 2,}}/>
                                    </Fragment>
                                ))
                            }
                        </List>
                    </Box>
                </CardContent>
            </Card>
        </Box>
    );
  };

export default EnvironmentList;
