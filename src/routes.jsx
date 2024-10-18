import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Auth";
import Movie from "./pages/Movie";
import Reservation from "./pages/Reservation";
import NotFound from "./pages/NotFound";
import DashBoard from "./pages/admin/DashBoard";
import UsersManage from "./pages/admin/UsersManage";
import RoomsTable from "./components/admin/rooms/RoomsTable";
import RoomsManage from "./pages/admin/RoomsManage";
import MoviesManage from "./pages/admin/MoviesManage";
import SessionsManage from "./pages/admin/SessionsManage";
import Favorits from "./pages/Favorits";
import ProtectedRoute from "./middleWares/MiddleWare";
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
      path: "/favorits",
      element: <Favorits/>
    },
    {
      path: "/dashboard",
      element: <ProtectedRoute element={<DashBoard/>} requiredRole="admin" />
    },
    {
      path: "/user-manage",
      element: <ProtectedRoute element={<UsersManage/>} requiredRole="admin" />
    },
    {
      path: "/room-manage",
      element: <ProtectedRoute element={<RoomsManage/>} requiredRole="admin" />
    },
    {
      path: "/movie-manage",
      element: <ProtectedRoute element={<MoviesManage/>} requiredRole="admin" />
    },
    {
      path: "/session-manage",
      element: <ProtectedRoute element={<SessionsManage />} requiredRole="admin" />
    },
     {
      path: "*", 
      element: <NotFound />,
    },
 
  ]);
  