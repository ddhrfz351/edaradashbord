import { createBrowserRouter, Navigate } from "react-router-dom";
import Home from "./pages/home/Home";
import Login from "./pages/Auth/Login";

import App from "./App";
import ProductDetails from "./pages/MovieDetails/productDetails";
import Addproduct from "./pages/manage-products/Addproduct";
import Guest from "./middleware/Guest";
import Admin from "./middleware/Admin";
import Manageproducts from "./pages/manage-products/Manageproducts";
import Updateuser from "./pages/manage-user/Updateuser";
import Adduser from "./pages/manage-user/Adduser";
import Updateproduct from "./pages/manage-products/Updateproduct";
import Managusers from "./pages/manage-user/Manageuser";
import Mangwarehouse from "./pages/manage-warehouse/Managwarehouse";
import Addwarehouse from "./pages/manage-warehouse/Addwarehouse";
import Updatewarehouse from "./pages/manage-warehouse/Updatewarehouse";
import Managrequest from "./pages/managerequest/Managrequest";
import Updaterequest from "./pages/managerequest/Updaterequest";

import Showproduct from "./pages/super/showproduct";
import Showrequst from "./pages/super/showrequst";
import Addrequest from "./pages/super/Addrequest";
import UserDetails from "./pages/MovieDetails/userdetils";

export const routes = createBrowserRouter([
  {
    path: "",
    element: <App />,
    children: [
      {
        path: "/manage-user",
        element: <Admin />,
        children: [
          {
            path: "",
            element: <Managusers />,
          },
          {
            path: "add",
            element: <Adduser />,
          },
          {
            path: ":id",
            element: <Updateuser />,
          },
        ],
      },
      {
        path: "/",
        element: <Home />,
      },
      {
        path: ":id",
        element: <ProductDetails />,
      },
      {
        path: "/users/:id",
        element: <UserDetails/>,
      },
      {
        path: "/Addrequest",
        element: <Addrequest />

      },
      {
        path: "/Showproduct",
        element: <Showproduct />,
      },

      {
        path: "/showhistory/:user_id",
        element: <Showrequst />,

      },
      // GUEST MIDDLEWARE
      {
        element: <Guest />,
        children: [
          {
            path: "/login",
            element: <Login />,

          },

         
        ],
      },

      {
        path: "/manage-products",
        element: <Admin />,
        children: [
          {
            path: "",
            element: <Manageproducts />,
          },
          {
            path: "add",
            element: <Addproduct />,
          },
          {
            path: ":id",
            element: <Updateproduct />
          },

        ],
      },
      {
        path: "/manage-warehouse",
        element: <Admin />,
        children: [
          {
            path: "",
            element: <Mangwarehouse />,
          },
          {
            path: "add",
            element: <Addwarehouse />,
          },
          {
            path: ":id",
            element: <Updatewarehouse />
          },

        ],
      },
      {
        path: "/manage-request",
        element: <Admin />,
        children: [
          {
            path: "",
            element: <Managrequest />,
          },

          {
            path: ":id",
            element: <Updaterequest />
          },

        ],
      },
    ],
  },

  {
    path: "*",
    element: <Navigate to={"/"} />,
  },
]);
