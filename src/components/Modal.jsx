import { useRef} from "react";

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

export const EditModal = ({ onClose, onEdit , journal}) => {
  const titleEle = useRef();
  const contentEle = useRef();
  const handleSave = () =>{
    const title = titleEle.current.value;
    const content = contentEle.current.value;
    const updatedJournal = {
      title:title,
      content:content
    }
    onEdit(updatedJournal);
  }
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
              <label htmlFor="journalTitle" className="form-label">Title</label>
              <input
                ref={titleEle}
                type="text"
                className="form-control"
                id="journalTitle"
                defaultValue={journal.title}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="journalContent" className="form-label">Content</label>
              <textarea
                ref={contentEle}
                className="form-control"
                id="journalContent"
                rows="5"
                defaultValue={journal.content}
              ></textarea>
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
            <button type="button" className="btn btn-outline-success"
            onClick={handleSave}>
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
