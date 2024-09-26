import { useRef, useState } from "react";
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, ContentState,convertToRaw } from 'draft-js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import draftToHtml from 'draftjs-to-html';
import DOMPurify from "dompurify";
import styles from "../components/Journal/create-journal.module.css";

const DeleteModal = ({ onClose, onDelete }) => {
  return (
    <div
      className="modal show"
      tabIndex="-1"
      style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Delete Journal</h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={onClose}
            ></button>
          </div>
          <div className="modal-body">
            <p>Are you sure you want to delete your journal ?</p>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
              onClick={onClose}
            >
              Close
            </button>
            <button
              type="button"
              className="btn btn-outline-danger"
              onClick={onDelete}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};


export const EditModal = ({ onClose, onEdit, journal }) => {

  const stripHtmlTags = (html) => {
    const doc = new DOMParser().parseFromString(html, 'text/html');
    return doc.body.textContent || '';
  };

  const plainTextContent = stripHtmlTags(journal.content);
  const initialContent = ContentState.createFromText(plainTextContent);

  const titleEle = useRef();
  const [editorState, setEditorState] = useState(EditorState.createWithContent(initialContent));
  const handleSave = () => {
    const title = titleEle.current.value;
    const content = draftToHtml(convertToRaw(editorState.getCurrentContent())); 
    const updatedJournal = {
      title: title,
      content: content,
    };
    onEdit(updatedJournal);
  };
  return (
    <div
      className="modal show"
      id="staticBackdrop"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabIndex="-1"
      style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}
      aria-labelledby="staticBackdropLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog .modal-dialog-scrollable">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="staticBackdropLabel">
              Edit Journal
            </h1>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={onClose}
            ></button>
          </div>
          <div className="modal-body">
            <div className="mb-3">
              <label htmlFor="journalTitle" className="form-label">
                Title
              </label>
              <input
                ref={titleEle}
                type="text"
                className={styles.inputField}
                id="journalTitle"
                defaultValue={journal.title}
              />
            </div>
            <div className="editor">
              Content
              <Editor
                editorState={editorState}
                onEditorStateChange={setEditorState}
                wrapperClassName="wrapperClassName"
                editorClassName={styles.editorInput}
                toolbarClassName={styles.toolBar}
              />
            </div>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
              onClick={onClose}
            >
              Close
            </button>
            <button
              type="button"
              className="btn btn-outline-success"
              onClick={handleSave}
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
