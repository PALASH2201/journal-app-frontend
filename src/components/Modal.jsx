import { useRef, useState } from "react";
import ReactDOM from "react-dom";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, ContentState, convertToRaw } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftToHtml from "draftjs-to-html";
import styles from "../components/Journal/create-journal.module.css";
import htmlToDraft from "html-to-draftjs";

export const EditModal = ({ onClose, onEdit, journal }) => {
  const blocksFromHtml = htmlToDraft(journal.content || "");
  const { contentBlocks, entityMap } = blocksFromHtml;
  const contentState = ContentState.createFromBlockArray(
    contentBlocks,
    entityMap
  );
  const [editorState, setEditorState] = useState(
    EditorState.createWithContent(contentState)
  );

  const titleEle = useRef();

  const handleSave = () => {
    const title = titleEle.current.value;
    const content = draftToHtml(convertToRaw(editorState.getCurrentContent()));
    const updatedJournal = { title, content };
    onEdit(updatedJournal);
  };

  return ReactDOM.createPortal(
    <div
      className="modal show"
      style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}
    >
      <div className={`modal-dialog ${styles.modalDialogCustom}`}>
        {/* 👈 custom class */}
        <div className={`modal-content ${styles.modalContentCustom}`}>
          {" "}
          {/* 👈 custom class */}
          <div className="modal-header">
            <h1 className="modal-title fs-5">Edit Journal</h1>
            <button
              type="button"
              className="btn-close"
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
    </div>,
    document.getElementById("modal-root")
  );
};

export const DeleteModal = ({ onClose, onDelete }) => {
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
            <p>Are you sure you want to delete your journal?</p>
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
