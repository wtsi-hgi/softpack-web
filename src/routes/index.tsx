import CreateEnvironment from "../components/CreateEnvironment";
import About from "./About";
import Environments from "./Environments";
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
        element: <Environments />,
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
        element: <Environments />,
      },
    ],
  },
];
