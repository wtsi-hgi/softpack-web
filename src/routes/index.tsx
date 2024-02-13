import CreateEnvironment from "../components/CreateEnvironment";
import About from "./About";
import Environments from "./Environments";
import Root from "./Root";
import Settings from "./Settings";

export const routes = [
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "about",
        element: <About />,
      },
      {
        index: true,
        path: "environments",
        element: <Environments />,
      },
      {
        path: "create",
        element: <CreateEnvironment />,
      },
      {
        path: "settings",
        element: <Settings />,
      },
      {
        path: "",
        element: <Environments />,
      },
    ],
  },
];
