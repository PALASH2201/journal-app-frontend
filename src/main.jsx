import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import Login from "./components/Public/Login.jsx";
import Home from "./components/Home.jsx";
import GetJournals from "./components/Journal/get-journals.jsx";
import CreateJournal from "./components/Journal/create-journal.jsx";
import AccountSettings from "./components/User/Account.jsx";
import CreateUser from "./components/Public/create-user.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Navigate to="/login" /> },
      { path: "/login", element: <Login /> },
      { path: "/home", element: <Home /> },
      { path: "/journals", element: <GetJournals /> },
      { path: "/create-journal", element: <CreateJournal /> },
      { path: "/create-user", element: <CreateUser /> },
      { path: "/account", element: <AccountSettings /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
