import { createHashRouter } from "react-router-dom";
import App from "./pages/App";
import Sign from "./pages/Sign";
import Detail from "./pages/Detail";
import Main from "./pages/Main";
import About from "./pages/About";

const router = createHashRouter([
  {
    path: "/",
    element: <Sign />,
  },
  {
    path: "main", 
    element: <App />,
    children: [
      {
        path: "",
        element: <Main />,
      },
      {
        path: "detail:id",
        element: <Detail />,
      },
      {
        path: "about",
        element: <About />,
      },
    ],
  },
]);

export default router;
