import HowTo from './HowTo';
import Environments from './Environments';
import Root from './Root';
import Settings from './Settings';
import CreateEnvironment from '../components/CreateEnvironment';

export const routes = [
  {
    path: '/',
    element: <Root />,
    children: [
      {
        path: 'how-to-use',
        element: <HowTo />,
      },
      {
        index: true,
        path: 'environments',
        element: <Environments />,
      },
      {
        path: 'create',
        element: <CreateEnvironment />,
      },
      {
        path: 'settings',
        element: <Settings />,
      },
      {
        path: '*',
        element: <Environments />,
      },
    ],
  },
];
