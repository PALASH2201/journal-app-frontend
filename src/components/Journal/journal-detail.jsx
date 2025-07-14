// JournalDetail.jsx
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import DOMPurify from "dompurify";
import {
  fetchJournalById,
  updateJournalById,
  deleteJournalById,
  getJournalPdfById,
} from "../../api-config/api";
import { EditModal, DeleteModal } from "../Modal";
import { MdEdit, MdDelete } from "react-icons/md";
import { FiDownload } from "react-icons/fi";
import styles from "./journal-detail.module.css";

const JournalDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [journal, setJournal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  useEffect(() => {
    async function fetchJournal() {
      try {
        const response = await fetchJournalById(id);
        setJournal(response.data);
      } catch (err) {
        console.error("Error fetching journal", err);
      } finally {
        setLoading(false);
      }
    }
    fetchJournal();
  }, [id]);

  const handleEdit = async (updatedJournal) => {
    try {
      const response = await updateJournalById(id, updatedJournal);
      if (response.status === 200 || response.status === 201) {
        setJournal(response.data);
        setIsEditModalOpen(false);
      }
    } catch (err) {
      alert("Failed to update journal.");
    }
  };

  const handleDelete = async () => {
    try {
      const response = await deleteJournalById(id);
      if (response.status === 204) {
        navigate("/");
      }
    } catch (err) {
      alert("Failed to delete journal.");
    }
  };

  const downloadJournalPdf = async (title, id) => {
    try {
      const response = await getJournalPdfById(id);
      const url = window.URL.createObjectURL(
        new Blob([response.data], { type: "application/pdf" })
      );
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `${title}.pdf`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error downloading PDF:", error);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (!journal) return <p>Journal not found.</p>;

  const sanitizedContent = DOMPurify.sanitize(journal.content);
  const date = journal.date.split("T")[0];

  return (
    <div className={styles.container}>
      <button className={styles.backButton} onClick={() => navigate(-1)}>
        ← Back to Journals
      </button>

      <div className={styles.headerRow}>
        <div>
          <h2 className={styles.title}>{journal.title}</h2>
          <p className={styles.date}>Created on {date}</p>
        </div>

        <div className={styles.actionButtons}>
          <button onClick={() => setIsEditModalOpen(true)} className={styles.editBtn}>
            <MdEdit /> Edit
          </button>
          <button onClick={() => setIsDeleteModalOpen(true)} className={styles.deleteBtn}>
            <MdDelete /> Delete
          </button>
          <button
            onClick={() => downloadJournalPdf(journal.title, journal.id)}
            className={styles.downloadBtn}
          >
            <FiDownload /> Download
          </button>
        </div>
      </div>

      <hr />
      <div dangerouslySetInnerHTML={{ __html: sanitizedContent }} />

      {isEditModalOpen && (
        <EditModal
          journal={journal}
          onClose={() => setIsEditModalOpen(false)}
          onEdit={handleEdit}
        />
      )}

      {isDeleteModalOpen && (
        <DeleteModal
          onClose={() => setIsDeleteModalOpen(false)}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
};

export default JournalDetail;
