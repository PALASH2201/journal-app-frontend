import React from "react";
import { Link } from "react-router-dom";

const styles = {
  flexContainer: {
    display: "flex",
    width: "100%",
    flexDirection: "column",
  },
  container: {
    margin:"0 auto",
    maxWidth: "1024px",
  },
  main: {
    flex: "1",
    padding: "3rem 1.5rem",
  },
  gridContainer: {
    display: "grid",
    gap: "2rem",
    gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
  },
  card: {
    backgroundColor: "#ffffff",
    padding: "1.5rem",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    transition: "background-color 0.3s ease",
  },
};
  const Home = () =>{
    return (
      <div style={styles.flexContainer}>
        <main style={styles.main}>
          <div style={styles.container}>
            <div style={{ textAlign: "center" }}>
              <h1 style={{ fontSize: "2rem", fontWeight: "bold" }}>
                Welcome to Journalize
              </h1>
              <p style={{ marginTop: "1rem", color: "var(--muted-foreground)" }}>
                Capture your thoughts, ideas, and experiences in a beautiful and
                organized way.
              </p>
            </div>
            <div style={styles.gridContainer}>
              <Link
                to="/create-journal"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <div style={styles.card}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <div style={{ fontSize: "1.5rem", fontWeight: "bold" }}>
                      New Journal
                    </div>
                    <PlusIcon style={{ width: "1.5rem", height: "1.5rem" }} />
                  </div>
                  <p
                    style={{
                      marginTop: "1rem",
                      color: "var(--muted-foreground)",
                    }}
                  >
                    Create a new journal to start writing.
                  </p>
                </div>
              </Link>
              <Link to="/account" style={{ textDecoration: "none", color: "inherit" }}>
                <div style={styles.card}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <div style={{ fontSize: "1.5rem", fontWeight: "bold" }}>
                      Profile
                    </div>
                    <UserIcon style={{ width: "1.5rem", height: "1.5rem" }} />
                  </div>
                  <p
                    style={{
                      marginTop: "1rem",
                      color: "var(--muted-foreground)",
                    }}
                  >
                    View and manage your account details.
                  </p>
                </div>
              </Link>
              <Link
                to="/journals"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <div style={styles.card}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <div style={{ fontSize: "1.5rem", fontWeight: "bold" }}>
                      Journals
                    </div>
                    <BookOpenIcon style={{ width: "1.5rem", height: "1.5rem" }} />
                  </div>
                  <p
                    style={{
                      marginTop: "1rem",
                      color: "var(--muted-foreground)",
                    }}
                  >
                    Browse and access your saved journals.
                  </p>
                </div>
              </Link>
            </div>
          </div>
        </main>
      </div>
    );  
  }

export default Home;

function BookOpenIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
    </svg>
  );
}

function PlusIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>
  );
}

function UserIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}
