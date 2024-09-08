import { Outlet, useLocation } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import "./App.css";
import JournalAppProvider from "./store/journal-app-store";
import { useEffect } from "react";
import { GoogleOAuthProvider } from "@react-oauth/google";

function App() {
  const location = useLocation();
  const hideComponents =
    location.pathname === "/login" || location.pathname === "/create-user" || location.pathname === "/health-check" || location.pathname === "/";
  return (
    <div className="appContainer">
      {!hideComponents && <Header />}
      <JournalAppProvider>
      <div className="mainContent">
        <GoogleOAuthProvider clientId={process.env.REACT_APP_CLIENT_ID}>
        <Outlet />
        </GoogleOAuthProvider>
      </div>
      </JournalAppProvider>
      {!hideComponents && <Footer />}
    </div>
  );
}

export default App;
