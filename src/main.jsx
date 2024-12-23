import React, { StrictMode } from "react";
import ReactDOM, { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import UserPannel from "./pages/UserPannel/UserPannel.jsx";
import Login from "./pages/Login/Login.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute.jsx";
import ProtectedLogin from "./components/ProtectedLogin/ProtectedLogin.jsx";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
    errorElement: <h1>Opps there seem to be an error</h1>,
    children: [
      {
        path: "/",
        element: (
          <PrivateRoute>
            <UserPannel/>
          </PrivateRoute>
        ),
      },
      {
        path: "/login",
        element: (
          <ProtectedLogin>
            <Login />
          </ProtectedLogin>
        )
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </StrictMode>
);
