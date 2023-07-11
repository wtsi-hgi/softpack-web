import Home from './Home';
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
        index: true,
        element: <Home />,
      },
      {
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
    ],
  },
];
