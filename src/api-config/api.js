import axios from "axios";

const API_BASE_URL = "http://localhost:8080";

export function setCredentials(token) {
  localStorage.setItem("token",token);
}

const getCredentials = () => {
  const token = localStorage.getItem("token");
  if (token) {
    return `Bearer ${token}`;
  }
  return "";
};

export function clearCredentials() {
  localStorage.removeItem("token");
}

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

//Public endpoints
export const healthCheck = () => axiosInstance.get("/public/health-check");
export const signup = (user) =>
  axiosInstance.post("/public/signup", user);
export const login = (user) =>
  axiosInstance.post("/public/login", user);

//Journal endpoints
export const fetchAllJournals = async () => {
  const authHeader = getCredentials();
  const response = axiosInstance.get("/journal", {
    headers: {
      Authorization: authHeader,
    },
  });
  return response;
};
export const fetchJournalById =  async(id) => {
  const authHeader = getCredentials();
  const response = axiosInstance.get(`/journal/id/${id}`,{
    headers: {
      Authorization: authHeader,
    },
  });
  return response;
};
export const createJournalEntry = async(journal) => {
  const authHeader = getCredentials();
  axiosInstance.post("/journal", journal, {
    headers: {
      Authorization: authHeader,
    },
  });
};

export const deleteJournalById = async(id) => {
  const authHeader = getCredentials();
  axiosInstance.delete(`/journal/id/${id}`, {
    headers: {
      Authorization: authHeader,
    },
  });
};

export const updateJournalById = async(id, journal) => {
  const authHeader = getCredentials();
  axiosInstance.put(`/journal/id/${id}`, journal, {
    headers: {
      Authorization: authHeader,
    },
  });
};

//User Endpoints
export const updatePassword = async(User) =>{
  const authHeader = getCredentials();
  axiosInstance.put(`/user`,User,{
    headers:{
      Authorization: authHeader,
    },
  });
}; 

export const deleteUser = async() =>{
  const authHeader = getCredentials();
  axiosInstance.delete(`/user`,{
    headers:{
      Authorization: authHeader,
    },
  });
};