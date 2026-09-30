import type { RouteObject } from "react-router-dom";
import NotFound from "../pages/NotFound";
import Home from "../pages/home/page";
import Ponudba from "../pages/ponudba/page";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/ponudba",
    element: <Ponudba />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
];

export default routes;