import { useState, useEffect } from "react";
import { MdDelete, MdEdit } from "react-icons/md";
import DeleteModal, { EditModal } from "../Modal";
import { deleteJournalById, updateJournalById } from "../../api-config/api";

const Journal = ({ journal }) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedJournalId, setSelectedJournalId] = useState("");

  const closeDeleteModal = () => {
    setSelectedJournalId("");
    setIsDeleteModalOpen(false);
  };

  const closeEditModal = () => {
    setSelectedJournalId("");
    setIsEditModalOpen(false);
  };

  const handleDelete = async () => {
    //const response = await deleteJournalById(selectedJournalId);
    closeDeleteModal();
  };
  const handleEdit = async (journal) => {
    const response = await updateJournalById(selectedJournalId,journal);
    closeEditModal();
  };

  return (
    <div className="card post-card entry" style={{ width: "30rem" }}>
      <div className="card-body">
        <h5 className="card-title">{journal.title}</h5>
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
