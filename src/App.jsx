import HealthCheck from "./components/Public/health-check";
import CreateUser from "./components/Public/create-user";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import GetJournals from "./components/Journal/get-journals";
import CreateJournal from "./components/Journal/create-journal";
import Home from "./components/Home";
import Login from "./components/Public/Login";
import AccountSettings from "./components/User/Account";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/health-check" element={<HealthCheck />} />
        <Route path="/home" element={<Home />} />
        <Route path="/create-user" element={<CreateUser />} />
        <Route path="/journals" element={<GetJournals />} />
        <Route path="/create-journal" element={<CreateJournal />} />
        <Route path="/account" element={<AccountSettings />} />
        <Route path="*" element={<h1>404 Not Found</h1>} />
      </Routes>
    </Router>
  );
}

export default App;
