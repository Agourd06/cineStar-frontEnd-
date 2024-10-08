import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Auth";
import  ProtectedRoute  from "./middleWares/MiddleWare"
import Movie from "./pages/Movie";
import Reservation from "./pages/Reservation";
import NotFound from "./pages/NotFound";
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
    }, {
      path: "*", 
      element: <NotFound />,
    },
 
  ]);
  