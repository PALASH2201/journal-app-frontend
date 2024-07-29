import styles from './common.module.css';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContainer}>
        <p>&copy; 2024 Journalize.  All rights reserved.</p>
        <nav className={styles.nav}>
          <Link to="#" style={{ textDecoration: "none", color: "inherit" }}>
            Terms
          </Link>
          <Link to="#" style={{ textDecoration: "none", color: "inherit" }}>
            Privacy
          </Link>
          <Link to="#" style={{ textDecoration: "none", color: "inherit" }}>
            Contact
          </Link>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
