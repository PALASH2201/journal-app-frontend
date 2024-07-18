import { createJournalEntry } from "../../api-config/api";
import { useRef, useState } from "react";
import styles from "./create-journal.module.css";
import { useNavigate } from "react-router-dom";

const CreateJournal = () => {
  const titleEle = useRef();
  const contentEle = useRef();
  const [message, setMessage] = useState();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const title = titleEle.current.value;
    const content = contentEle.current.value;
    const journal = {
      title: title,
      content: content,
    };
    try {
      await createJournalEntry(journal);
      setMessage("Journal created successfully");
      navigate('/journals');
    } catch (error) {
      console.error("Error creating Journal:", error);
      setMessage("Error creating Journal");
    }
    titleEle.current.value = "";
    contentEle.current.value = "";
  };
  return (
    <>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.cardContainer}>
          <div className={styles.cardHeader}>
            <h2 className={styles.cardTitle}>Create a Post</h2>
            <p className={styles.cardDescription}>
              Share your thoughts with the world.
            </p>
          </div>
          <div className={styles.cardContent}>
            <div className={styles.formGroup}>
              <label htmlFor="title">Title</label>
              <input
                id="title"
                className={styles.inputField}
                type="text"
                placeholder="Title"
                ref={titleEle}
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="content" style={styles.lab}>
                Content
              </label>
              <textarea
                id="content"
                className={styles.textareaField}
                placeholder="How do you want to describe your feeling?"
                ref={contentEle}
              />
            </div>
          </div>
          <div className={styles.cardFooter}>
            <button className={styles.button}>Create</button>
          </div>
        </div>
      </form>
      {message && <p>{message}</p>}
    </>
  );
};

export default CreateJournal;
