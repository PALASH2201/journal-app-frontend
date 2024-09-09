import { createJournalEntry } from "../../api-config/api";
import { useContext, useRef, useState } from "react";
import styles from "./create-journal.module.css";
import { useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";
import { JournalAppContext } from "../../store/journal-app-store";
import "react-quill/dist/quill.snow.css";

const modules = {
  toolbar: [
    [{ header: [1, 2, false] }],
    [{ font: [] }],
    [{ size: [] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [{ list: "ordered" }, { list: "bullet" }],
    ["link"],
  ],
};

const CreateJournal = () => {
  const titleEle = useRef();
  const [quillEle, setQuillEle] = useState("");
  const { refreshJournals } = useContext(JournalAppContext);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const title = titleEle.current.value;
    const journal = {
      title: title,
      content: quillEle,
    };
    try {
      await createJournalEntry(journal);
      navigate("/journals");
      refreshJournals();
    } catch (error) {
      console.error("Error creating Journal:", error);
    }
    titleEle.current.value = "";
    setQuillEle("");
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
          </div>
          <div className={styles.editor}>
            Content
            <ReactQuill
              value={quillEle}
              placeholder="Content"
              className={styles.editorInput}
              theme="snow"
              onChange={(content) => setQuillEle(content)}
              modules={modules}
            />
          </div>
          <div className={styles.cardFooter}>
            <button className={styles.button}>Create</button>
          </div>
        </div>
      </form>
    </>
  );
};

export default CreateJournal;
