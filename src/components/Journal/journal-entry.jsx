import { useState } from "react";
import styles from "./journal-entry.module.css";
import DOMPurify from "dompurify";

const Journal = ({ journal }) => {
  const [showFullContent, setShowFullContent] = useState(false);

  function handleDate(date) {
    let [newDate] = date.split("T");
    return newDate;
  }

  const sanitizedContent = DOMPurify.sanitize(journal.content);
  const shortContent = sanitizedContent.substring(0, 100) + "...";


  return (
    <div className={styles.cardContainer}>
      <div className={styles.cardBody}>
        <h5 className={styles.cardTitle}>{journal.title}</h5>
        <p className={styles.date}>Created on {handleDate(journal.date)}</p>
        <br />
        <p
          className="card-text"
          dangerouslySetInnerHTML={{
            __html: showFullContent ? sanitizedContent : shortContent,
          }}
        />
      </div>
    </div>
  );
};

export default Journal;
