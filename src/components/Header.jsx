import styles from './common.module.css';
import { Link } from 'react-router-dom';
import { clearCredentials } from "../api-config/api";

const Header = () => {
  const handleLogout = () => {
    clearCredentials();
  };
  
  return (
    <header className={styles.header}>
      <div className={styles.headerContainer}>
        <Link to="/home" className={styles.appName}>Journalize</Link>
        <nav className={styles.nav}>
          <Link
            to="/create-journal"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            New Journal
          </Link>
          <Link
            to="/account"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            Profile
          </Link>
          <Link
            to="/journals"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            Journals
          </Link>
          <a
            href="/login"
            className={styles.logoutButton}
            onClick={handleLogout}
          >
            Logout
          </a>
        </nav>
      </div>
    </header>
  );
};

export default Header;
