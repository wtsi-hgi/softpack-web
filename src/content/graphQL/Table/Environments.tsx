import { Card } from '@mui/material';
import { EnvironmentStatus } from 'src/models/environmentStatus';
import EnvironmentTable from './EnvironmentTable';
import { subDays } from 'date-fns';

function Environments() {
  const environments: EnvironmentStatus[] = [
    {
      id: '1',
      name: 'whistling-acorn',
      description: 'Lorem ipsum dom',
      status: 'completed',
      dateCreated: '12-2-2022',
      owner: 'Adam'
    },
    {
      id: '2',
      name: 'jumping-humpback',
      description: 'Lorem ipsum dom',
      status: 'completed',
      dateCreated: '18-9-2022',
      owner: 'Beth'
    },
    {
      id: '3',
      name: 'spotted-peacock',
      description: 'Lorem ipsum dom',
      status: 'pending',
      dateCreated: '01-01-2023',
      owner: 'Charlie'
    },
    {
      id: '4',
      name: 'hasty-daffodil',
      description: 'Lorem ipsum dom',
      status: 'failed',
      dateCreated: '08-06-2022',
      owner: 'Daisy'
    },
    {
      id: '5',
      name: 'dusty-leaf',
      description: 'Lorem ipsum dom',
      status: 'completed',
      dateCreated: '02-05-2022',
      owner: 'Eric'
    },
    {
      id: '6',
      name: 'rancorous-reindeer',
      description: 'Lorem ipsum dom',
      status: 'failed',
      dateCreated: '18-10-2022',
      owner: 'Fatima'
    },
    {
      id: '7',
      name: 'lethargic-meerkat',
      description: 'Lorem ipsum dom',
      status: 'completed',
      dateCreated: '19-04-2023',
      owner: 'Gary'
    },
    {
      id: '8',
      name: 'inebriated-dog',
      description: 'Lorem ipsum dom',
      status: 'pending',
      dateCreated: '13-02-2022',
      owner: 'Harriet'
    },
    {
      id: '9',
      name: 'circular-snake',
      description: 'Lorem ipsum dom',
      status: 'pending',
      dateCreated: '25-11-2022',
      owner: 'Ivan'
    },
    {
      id: '10',
      name: 'dissolute-badger',
      description: 'Lorem ipsum dom',
      status: 'completed',
      dateCreated: '12-12-2022',
      owner: 'Jess'
    }
  ];

  return (
    <Card>
      <EnvironmentTable environments={environments} />
    </Card>
  );
}

export default Environments;