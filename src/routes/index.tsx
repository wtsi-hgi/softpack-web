import CreateEnvironment from "../components/CreateEnvironment";
import EnvironmentList from "../components/ViewEnvironments/EnvironmentList";
import About from "./About";
import Root from "./Root";
import Tags from "./Tags";

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
        element: <EnvironmentList />,
      },
      {
        path: "tags",
        element: <Tags />,
      },
      {
        path: "create",
        element: <CreateEnvironment />,
      },
      {
        path: "",
        element: <EnvironmentList />,
      },
    ],
  },
];
