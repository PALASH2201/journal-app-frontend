import { useState, useContext } from "react";
import { MdDelete, MdEdit } from "react-icons/md";
import styles from "./journal-entry.module.css";
import DOMPurify from "dompurify";

const Journal = ({ journal, onOpenEditModal, onOpenDeleteModal }) => { // ✅ Accept both props
  const [showFullContent, setShowFullContent] = useState(false);

  function handleDate(date) {
    let [newDate] = date.split("T");
    return newDate;
  }

  const sanitizedContent = DOMPurify.sanitize(journal.content);
  const shortContent = sanitizedContent.substring(0, 200) + "...";

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
        <div className="text-center mt-2">
          <button
            className="btn btn-outline-secondary btn-sm w-auto"
            onClick={() => setShowFullContent(!showFullContent)}
          >
            {showFullContent ? "Show Less" : "Learn More"}
          </button>
        </div>

        <div className={styles.buttonContainer}>
          <div
            className={styles.editBtn}
            onClick={() => onOpenEditModal(journal)} // ✅ Trigger Edit Modal
          >
            <MdEdit />
          </div>
          <div
            className={styles.deleteBtn}
            onClick={() => onOpenDeleteModal(journal.id)} // ✅ Trigger Delete Modal
          >
            <MdDelete />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Journal;
