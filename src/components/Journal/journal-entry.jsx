import { useState, useEffect, useContext } from "react";
import { MdDelete, MdEdit } from "react-icons/md";
import DeleteModal, { EditModal } from "../Modal";
import { deleteJournalById, updateJournalById } from "../../api-config/api";
import { useNavigate } from "react-router-dom";
import styles from "./journal-entry.module.css";
import { JournalAppContext } from "../../store/journal-app-store";
import DOMPurify from "dompurify";

const Journal = ({ journal }) => {
  const { refreshJournals } = useContext(JournalAppContext);
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
    try {
      const response = await deleteJournalById(selectedJournalId);
     // console.log(response);
      if(response.status === 204) {
          window.location.reload(); 
      }
    } catch (e) {
      alert("Could not delete. Try again!");
    } finally {
      closeDeleteModal();
    }
  };
  const handleEdit = async (journal) => {
    try {
      const response = await updateJournalById(selectedJournalId, journal);
      //console.log(response);
      if(response.status === 200 || response.status === 201) {
        window.location.reload(); 
      }
    } catch (e) {
      alert("Could not edit. Try again!");
    } finally {
      closeEditModal();
    }
  };
  function handleDate(date) {
    let [newDate, time] = date.split("T");
    return newDate;
  }
  const sanitizedContent = DOMPurify.sanitize(journal.content);
  return (
    <div className={styles.cardContainer}>
      <div className={styles.cardBody}>
        <h5 className={styles.cardTitle}>{journal.title}</h5>
        <p className={styles.date}>Created on {handleDate(journal.date)}</p>
        <br />
        <p className= "card-text" dangerouslySetInnerHTML={{ __html: sanitizedContent }} />
        <div className={styles.buttonContainer}>
          <div
            className={styles.editBtn}
            onClick={() => {
              setSelectedJournalId(journal.id);
              setIsEditModalOpen(true);
            }}
          >
            <MdEdit />
          </div>
          <div
            className={styles.deleteBtn}
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
