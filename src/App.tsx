import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Layout from "./components/Layout";
import OneTask from "./components/taskComponent/OneTask";
import Auth from "./pages/Auth";
import Homepage from "./pages/Homepage";
import UpdateProfile from "./pages/UpdateProfile";

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
