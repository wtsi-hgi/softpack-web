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
        element: <Environments popup={<About />} />,
      },
      {
        index: true,
        path: "environments",
        element: <Environments />,
      },
      {
        path: "tags",
        element: <Environments popup={<Tags />} />,
      },
      {
        path: "create",
        element: <Environments popup={<CreateEnvironment />} />,
      },
      {
        path: "",
        element: <Environments />,
      },
    ],
  },
];
