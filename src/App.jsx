import { Outlet, useLocation } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import "./App.css";

function App() {
  const location = useLocation();
  const hideComponents =
    location.pathname === "/login" || location.pathname === "/create-user";
  return (
    <div className="appContainer">
      {!hideComponents && <Header />}
      <div className="mainContent">
        <Outlet />
      </div>
      {!hideComponents && <Footer />}
    </div>
  );
}

export default App;
