import { useContext } from "react";
import Journal from "./journal-entry";
import { Link } from "react-router-dom";
import { JournalAppContext } from "../../store/journal-app-store";
import LoadingSpinner from "../LoadingSpinner";
import styles from "./get-journals.module.css";

const GetJournals = () => {
  const { journalEntryList, fetching } = useContext(JournalAppContext);

  return (
    <>
      {journalEntryList && (
        <h1 style={{ margin: "15px 10px", textAlign: "center" }}>
          My Journals
        </h1>
      )}
      {fetching && <LoadingSpinner />}
      <div className={styles.listContainer}>
        {journalEntryList &&
          journalEntryList.map((journal) => (
            <Link
              to={`/journal/${journal.id}`}
              key={journal.id}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <Journal journal={journal} />
            </Link>
          ))}
      </div>
    </>
  );
};

export default GetJournals;
