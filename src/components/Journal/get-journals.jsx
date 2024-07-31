import {useContext } from "react";
import Journal from "./journal-entry";
import { JournalAppContext } from "../../store/journal-app-store";
import LoadingSpinner from '../LoadingSpinner'

const GetJournals = () => {
  const {journalEntryList}=useContext(JournalAppContext)
  const {fetching} = useContext(JournalAppContext);
  return (
    <>
      {journalEntryList && <h1 style={{textAlign:"center",margin:"5px 0px"}}>My Journals</h1>}
      {fetching && <LoadingSpinner/>}
      {journalEntryList &&
        journalEntryList.map((journal) => (
          <Journal key={journal.date} journal={journal} />
        ))}
    </>
  );
};

export default GetJournals;
