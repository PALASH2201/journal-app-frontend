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
import HealthCheck from "./components/Public/health-check";
import JournalDetail from "./components/Journal/journal-detail.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Login/> },
      { path: "/login", element: <Login /> },
      { path: "/home", element: <Home /> },
      { path: "/journals", element: <GetJournals /> },
      { path: "/journal/:id", element: <JournalDetail /> },
      { path: "/create-journal", element: <CreateJournal /> },
      { path: "/create-user", element: <CreateUser /> },
      { path: "/account", element: <AccountSettings /> },
      { path: "/health-check", element: <HealthCheck /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
    <RouterProvider router={router} />
);
