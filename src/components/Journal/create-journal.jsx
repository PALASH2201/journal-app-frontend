import React, { useState, useRef } from 'react';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertToRaw } from 'draft-js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import draftToHtml from 'draftjs-to-html';
import { createJournalEntry } from "../../api-config/api";
import { useContext } from 'react';
import styles from './create-journal.module.css';
import { useNavigate } from 'react-router-dom';
import { JournalAppContext } from '../../store/journal-app-store';

const CreateJournal = () => {
  const titleEle = useRef(); 
  const [editorState, setEditorState] = useState(EditorState.createEmpty()); 
  const { setJournalEntryList, journalEntryList } = useContext(JournalAppContext);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const title = titleEle.current.value;
    const content = draftToHtml(convertToRaw(editorState.getCurrentContent())); 
    const journal = {
      title: title,
      content: content, 
    };

    try {
      //console.log(journal);
      const response = await createJournalEntry(journal);
      //console.log(response);
      if(response.status === 200 || response.status === 201) {
          setJournalEntryList([response.data,...journalEntryList]);
          titleEle.current.value = ""; 
          setEditorState(EditorState.createEmpty()); 
          navigate("/journals");
      }
    } catch (error) {
      alert("Error creating Journal:", error);
    }
  };

  return (
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
          <Editor
            editorState={editorState}
            onEditorStateChange={setEditorState}
            wrapperClassName="wrapperClassName"
            editorClassName={styles.editorInput}
            toolbarClassName="toolbarClassName"
          />
        </div>
        <div className={styles.cardFooter}>
          <button className={styles.button}>Create</button>
        </div>
      </div>
    </form>
  );
};

export default CreateJournal;
