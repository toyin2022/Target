import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/Layout";
import Homepage from "./pages/Homepage";
import UpdateProfile from "./pages/UpdateProfile";
import Auth from "./pages/Auth";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import OneTask from "./components/taskComponent/OneTask";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "",
        element: <Auth />,
      },
      {
        path: "home",
        element: <Homepage />,
      },
      {
        path: "home/:id",
        element: <OneTask />,
      },
      {
        path: "update",
        element: <UpdateProfile />,
      },
    ],
  },
]);

const App = () => {
  return (
    <>
      <ToastContainer />
      <RouterProvider router={router} />
    </>
  );
};

export default App;
