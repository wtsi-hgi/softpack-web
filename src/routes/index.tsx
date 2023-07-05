import Home from './Home';
import Environments from './Environments';
import Root from './Root';
import Settings from './Settings';

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
        path: 'settings',
        element: <Settings />,
      },
    ],
  },
];
