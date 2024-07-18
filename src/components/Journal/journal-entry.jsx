import { useState, useEffect } from "react";
import { MdDelete, MdEdit } from "react-icons/md";
import DeleteModal, { EditModal } from "../Modal";
import { deleteJournalById, updateJournalById } from "../../api-config/api";
import{ useNavigate , redirect} from 'react-router-dom'

const Journal = ({ journal }) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedJournalId, setSelectedJournalId] = useState("");
  const navigate = useNavigate();

  const closeDeleteModal = () => {
    setSelectedJournalId("");
    setIsDeleteModalOpen(false);
  };

  const closeEditModal = () => {
    setSelectedJournalId("");
    setIsEditModalOpen(false);
  };

  const handleDelete = async () => {
    await deleteJournalById(selectedJournalId);
    closeDeleteModal();
  };
  const handleEdit = async (journal) => {
    await updateJournalById(selectedJournalId,journal);
    closeEditModal();
  };
  function handleDate(date){
    let [newDate,time] = date.split('T');
    return newDate;
  }

  return (
    <div className="card post-card entry" style={{ width: "30rem" }}>
      <div className="card-body">
        <h5 className="card-title">{journal.title}</h5>
        <p className="card-text">Created on {handleDate(journal.date)}</p>
        <br/>
        <p className="card-text">{journal.content}</p>
        <div className="button-container">
          <div
            className="edit-btn"
            onClick={() => {
              setSelectedJournalId(journal.id);
              setIsEditModalOpen(true);
            }}
          >
            <MdEdit />
          </div>
          <div
            className="delete-btn"
            onClick={() => {
              setSelectedJournalId(journal.id);
              setIsDeleteModalOpen(true);
            }}
          >
            <MdDelete />
          </div>
        </div>
      </div>
      {isDeleteModalOpen && (
        <DeleteModal onClose={closeDeleteModal} onDelete={handleDelete} />
      )}
      {isEditModalOpen && (
        <EditModal
          onClose={closeEditModal}
          onEdit={handleEdit}
          journal={journal}
        />
      )}
    </div>
  );
};

export default Journal;
