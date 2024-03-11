import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import TCGHomePage from "./pages/TCGHomePage";
import axios from "axios";
import TCGSetPage from "./pages/TCGSetPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CardDetail from "./pages/CardDetail";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <div>Not found</div>,
    loader: ({ request, params }) => {
      return axios.get(`${process.env.REACT_APP_SERVER_ADDRESS}/api/tcgs/all`);
    },
    children: [
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
      {
        path: "/card/:id",
        element: <CardDetail />,
        loader: ({ request, params }) => {
          return axios.get(
            axios.get(
              `${process.env.REACT_APP_SERVER_ADDRESS}/api/cards/id/${params.id}`
            )
          );
        },
      },
      {
        path: "/tcgs/:id",
        element: <TCGHomePage />,
        loader: ({ request, params }) => {
          return axios.get(
            `${process.env.REACT_APP_SERVER_ADDRESS}/api/tcgs/id/${params.id}`
          );
        },
      },
      {
        path: "/sets/:id",
        element: <TCGSetPage />,
        loader: ({ request, params }) => {
          return axios.get(
            `${process.env.REACT_APP_SERVER_ADDRESS}/api/sets/id/${params.id}`
          );
        },
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />{" "}
  </React.StrictMode>
);
