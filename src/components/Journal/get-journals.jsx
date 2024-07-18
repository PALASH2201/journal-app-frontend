import { useState, useEffect } from "react";
import { fetchAllJournals } from "../../api-config/api";
import Journal from "./journal-entry";

const GetJournals = () => {
  const [journalEntryList, setJournalEntryList] = useState([]);

  useEffect(() => {
    const getAllJournals = async () => {
      try {
        const response = await fetchAllJournals();
        setJournalEntryList(response.data);
      } catch (error) {
        console.error("Error!!!", error);
      }
    };

    getAllJournals();
  }, []);

  return (
    <>
      {journalEntryList && <h1>Your Journals</h1>}
      {journalEntryList &&
        journalEntryList.map((journal) => (
          <Journal key={journal.date} journal={journal} />
        ))}
    </>
  );
};

export default GetJournals;
