import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/home";
import Login from "./pages/Auth";
import  ProtectedRoute  from "./middleWares/MiddleWare"
import Movie from "./pages/Movie";
export const router = createBrowserRouter([
    {
      path: "/",
      element: <Home/>
    },
    {
      path: "/auth",
      element: <Login/>
    },
    {
      path: "/movie/:id",
      element: <Movie/>
    },
    {
      path: "/reservations/:id",
      element: <ProtectedRoute element={<Home/>} requiredRole="client"/>
    },
 
  ]);
  