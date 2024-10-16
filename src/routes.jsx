import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Auth";
import Movie from "./pages/Movie";
import Reservation from "./pages/Reservation";
import NotFound from "./pages/NotFound";
import DashBoard from "./pages/admin/DashBoard";
import UsersManage from "./pages/admin/UsersManage";
export const router = createBrowserRouter([
    {
      path: "/",
      element: <Home/>
    },
    {
      path: "/auth/:type",
      element: <Login/>
    },
    {
      path: "/movie/:id",
      element: <Movie/>
    },
    {
      path: "/reservations",
      element: <Reservation/>
    },
    {
      path: "/dashboard",
      element: <DashBoard/>
    },
    {
      path: "/user-manage",
      element: <UsersManage/>
    },
     {
      path: "*", 
      element: <NotFound />,
    },
 
  ]);
  