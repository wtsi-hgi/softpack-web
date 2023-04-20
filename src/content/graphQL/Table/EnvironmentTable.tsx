import { FC, ChangeEvent, useState } from 'react';
import { format } from 'date-fns';
import numeral from 'numeral';
import PropTypes from 'prop-types';
import {
  Tooltip,
  Divider,
  Box,
  FormControl,
  InputLabel,
  Card,
  Checkbox,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TableContainer,
  Select,
  MenuItem,
  Typography,
  useTheme,
  CardHeader
} from '@mui/material';

import Label from 'src/components/Label';
import { EnvironmentStatus, Status } from 'src/models/environmentStatus';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import BulkActions from './BulkActions';

interface EnvironmentTableProps {
  className?: string;
  environments: EnvironmentStatus[];
}

interface Filters {
  status?: Status;
}

const getStatusLabel = (environments: Status): JSX.Element => {
  const map = {
    failed: {
      text: 'Failed',
      color: 'error'
    },
    completed: {
      text: 'Completed',
      color: 'success'
    },
    pending: {
      text: 'Pending',
      color: 'warning'
    }
  };

  const { text, color }: any = map[environments];

  return <Label color={color}>{text}</Label>;
};

const applyFilters = (
  environments: EnvironmentStatus[],
  filters: Filters
): EnvironmentStatus[] => {
  return environments.filter((env) => {
    let matches = true;

    if (filters.status && env.status !== filters.status) {
      matches = false;
    }

    return matches;
  });
};

const applyPagination = (
  environments: EnvironmentStatus[],
  page: number,
  limit: number
): EnvironmentStatus[] => {
  return environments.slice(page * limit, page * limit + limit);
};

const EnvironmentTable: FC<EnvironmentTableProps> = ({ environments }) => {
  const [selectedEnvironments, setSelectedEnvironments] = useState<string[]>(
    []
  );
  const selectedBulkActions = selectedEnvironments.length > 0;
  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(10);
  const [filters, setFilters] = useState<Filters>({
    status: null
  });

  const statusOptions = [
    {
      id: 'all',
      name: 'All'
    },
    {
      id: 'completed',
      name: 'Completed'
    },
    {
      id: 'pending',
      name: 'Pending'
    },
    {
      id: 'failed',
      name: 'Failed'
    }
  ];

  const handleStatusChange = (e: ChangeEvent<HTMLInputElement>): void => {
    let value = null;

    if (e.target.value !== 'all') {
      value = e.target.value;
    }

    setFilters((prevFilters) => ({
      ...prevFilters,
      status: value
    }));
  };

  const handleSelectAllEnvironments = (
    event: ChangeEvent<HTMLInputElement>
  ): void => {
    setSelectedEnvironments(
      event.target.checked
        ? environments.map((env) => env.id)
        : []
    );
  };

  const handleSelectOneEnvironment = (
    event: ChangeEvent<HTMLInputElement>,
    envId: string
  ): void => {
    if (!selectedEnvironments.includes(envId)) {
      setSelectedEnvironments((prevSelected) => [
        ...prevSelected,
        envId
      ]);
    } else {
      setSelectedEnvironments((prevSelected) =>
        prevSelected.filter((id) => id !== envId)
      );
    }
  };

  const handlePageChange = (event: any, newPage: number): void => {
    setPage(newPage);
  };

  const handleLimitChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setLimit(parseInt(event.target.value));
  };

  const filteredEnvironments = applyFilters(environments, filters);
  const paginatedEnvironments = applyPagination(
    filteredEnvironments,
    page,
    limit
  );
  const selectedSomeCryptoOrders =
    selectedEnvironments.length > 0 &&
    selectedEnvironments.length < environments.length;
  const selectedAllCryptoOrders =
    selectedEnvironments.length === environments.length;
  const theme = useTheme();

  return (
    <Card>
      {selectedBulkActions && (
        <Box flex={1} p={2}>
          <BulkActions />
        </Box>
      )}
      {!selectedBulkActions && (
        <CardHeader
          action={
            <Box width={150}>
              <FormControl fullWidth variant="outlined">
                <InputLabel>Status</InputLabel>
                <Select
                  value={filters.status || 'all'}
                  onChange={handleStatusChange}
                  label="Status"
                  autoWidth
                >
                  {statusOptions.map((statusOption) => (
                    <MenuItem key={statusOption.id} value={statusOption.id}>
                      {statusOption.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          }
        />
      )}
      <Divider />
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox
                  color="primary"
                  checked={selectedAllCryptoOrders}
                  indeterminate={selectedSomeCryptoOrders}
                  onChange={handleSelectAllEnvironments}
                />
              </TableCell>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell align="left">Description</TableCell>
              <TableCell align="left">Owner</TableCell>
              <TableCell align="left">Date Created</TableCell>
              <TableCell align="left">Status</TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedEnvironments.map((environment) => {
              const isEnvironmentSelected = selectedEnvironments.includes(
                environment.id
              );
              return (
                <TableRow
                  hover
                  key={environment.id}
                  selected={isEnvironmentSelected}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      color="primary"
                      checked={isEnvironmentSelected}
                      onChange={(event: ChangeEvent<HTMLInputElement>) =>
                        handleSelectOneEnvironment(event, environment.id)
                      }
                      value={isEnvironmentSelected}
                    />
                  </TableCell>
                  <TableCell align="left">
                    {environment.id}
                  </TableCell>
                  <TableCell align="left">
                    {environment.name}
                  </TableCell>
                  <TableCell align="left">
                    {environment.description}
                  </TableCell>
                  <TableCell align="left">
                    {environment.owner}
                  </TableCell>
                  <TableCell align="left">
                    {environment.dateCreated}
                  </TableCell>
                  <TableCell align="left">
                    {getStatusLabel(environment.status)}
                  </TableCell>
                  <TableCell align="right">
                    <Tooltip title="Edit" arrow>
                      <IconButton
                        sx={{
                          '&:hover': {
                            background: theme.colors.primary.lighter
                          },
                          color: theme.palette.primary.main
                        }}
                        color="inherit"
                        size="small"
                      >
                        <EditTwoToneIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete" arrow>
                      <IconButton
                        sx={{
                          '&:hover': { background: theme.colors.error.lighter },
                          color: theme.palette.error.main
                        }}
                        color="inherit"
                        size="small"
                      >
                        <DeleteTwoToneIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <Box p={2}>
        <TablePagination
          component="div"
          count={filteredEnvironments.length}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleLimitChange}
          page={page}
          rowsPerPage={limit}
          rowsPerPageOptions={[5, 10, 25, 30]}
        />
      </Box>
    </Card>
  );
};

EnvironmentTable.propTypes = {
  environments: PropTypes.array.isRequired
};

EnvironmentTable.defaultProps = {
  environments: []
};

export default EnvironmentTable;