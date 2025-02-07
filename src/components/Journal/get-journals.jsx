import { useContext, useState } from "react";
import Journal from "./journal-entry";
import { JournalAppContext } from "../../store/journal-app-store";
import LoadingSpinner from "../LoadingSpinner";
import {DeleteModal,  EditModal } from "../Modal"; // ✅ Import DeleteModal
import styles from "./get-journals.module.css";
import { deleteJournalById, updateJournalById } from "../../api-config/api";

const GetJournals = () => {
  const { journalEntryList, fetching } = useContext(JournalAppContext);

  // ✅ State for Edit Modal
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedJournal, setSelectedJournal] = useState(null);

  // ✅ State for Delete Modal
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedJournalId, setSelectedJournalId] = useState(null);

  // ✅ Handle Edit Save
  const handleEdit = async (updatedJournal) => {
    try {
      const response = await updateJournalById(selectedJournal.id, updatedJournal);
      if (response.status === 200 || response.status === 201) {
        window.location.reload();
      }
    } catch (e) {
      alert("Could not edit. Try again!");
    } finally {
      setIsEditModalOpen(false);
    }
  };

  // ✅ Handle Delete Confirmation
  const handleDelete = async () => {
    try {
      const response = await deleteJournalById(selectedJournalId);
      if (response.status === 204) {
        window.location.reload();
      }
    } catch (e) {
      alert("Could not delete. Try again!");
    } finally {
      setIsDeleteModalOpen(false);
    }
  };

  return (
    <>
      {journalEntryList && <h1 style={{ margin: "15px 10px" ,textAlign:'center'}}>My Journals</h1>}
      {fetching && <LoadingSpinner />}
      <div className={styles.gridContainer}>
        {journalEntryList &&
          journalEntryList.map((journal) => (
            <Journal
              key={journal.date}
              journal={journal}
              onOpenEditModal={(journal) => {
                setSelectedJournal(journal);
                setIsEditModalOpen(true);
              }}
              onOpenDeleteModal={(journalId) => {
                setSelectedJournalId(journalId);
                setIsDeleteModalOpen(true);
              }}
            />
          ))}
      </div>

      {/* ✅ Centralized Delete Modal */}
      {isDeleteModalOpen && (
        <DeleteModal
          onClose={() => setIsDeleteModalOpen(false)}
          onDelete={handleDelete}
        />
      )}

      {/* ✅ Centralized Edit Modal */}
      {isEditModalOpen && (
        <EditModal
          onClose={() => setIsEditModalOpen(false)}
          onEdit={handleEdit}
          journal={selectedJournal}
        />
      )}
    </>
  );
};

export default GetJournals;
