import { createContext, useState } from "react";
import { checkAuth, fetchAllJournals } from "../api-config/api";
import { useEffect } from "react";
export const JournalAppContext = createContext();

const JournalAppProvider = ({ children }) => {
  const [journalEntryList, setJournalEntryList] = useState([]);
  const [fetching, setFetching] = useState(false); 
  const [isAuthenticated,setIsAuthenticated] = useState(checkAuth());
  useEffect(() => {
      const getAllJournals = async () => {
        if(!isAuthenticated){
          return;
        }
        setFetching(true);
        try {
          const response = await fetchAllJournals();
          setJournalEntryList(response.data);
        } catch (error) {
          console.error("Error!!!", error);
        } finally {
          setFetching(false);
        }
      };
      getAllJournals(); 
  }, [isAuthenticated]);


  const handleLogin = () => {
      setIsAuthenticated(true);
  }

  return (
    <JournalAppContext.Provider
      value={{
        journalEntryList: journalEntryList,
        fetching: fetching,
        handleLogin:handleLogin,
        setJournalEntryList:setJournalEntryList
      }}
    >
      {children}
    </JournalAppContext.Provider>
  );
};

export default JournalAppProvider;
