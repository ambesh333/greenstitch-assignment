import { RouteObject } from "react-router";
import Layout from "../layout";
import Boards from "../pages/Boards";
import * as io from "socket.io-client";

const socket = io.connect("http://localhost:8080");

const routes: RouteObject[] = [
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        children: [
          {
            path: "",
            element: <Boards socket={socket} />,
          },
        ],
      },
    ],
  },
];

export default routes;
