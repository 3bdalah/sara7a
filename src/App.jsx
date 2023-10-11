import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";

import Layout from "./components/Layout/Layout";
import Register from "./components/Register/Register";
import Login from "./components/Login/Login";
import Profile from "./components/Profile/Profile";
import SendMessage from "./components/SendMessage/SendMessage";
import NotFound from "./components/NotFound/NotFound";
import Home from "./components/Home/Home";
import ProtectedRoutes from "./components/ProtectedRoutes/ProtectedRoutes";
function App() {
  const routes = createBrowserRouter([
    {
      path: "",
      element: <Layout />,
      children: [
        { path: "", element: <Home /> },
        { path: "register", element: <Register /> },
        {
          path: "login",
          element: <Login />,
        },
        {
          path: "profile",
          element: (
            <ProtectedRoutes>
              {" "}
              <Profile />{" "}
            </ProtectedRoutes>
          ),
        },
        {
          path: "message/:id",
          element: <SendMessage />,
        },
        { path: "*", element: <NotFound /> },
      ],
    },
  ]);
  return <RouterProvider router={routes}></RouterProvider>;
}

export default App;
