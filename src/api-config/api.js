import axios from "axios";

// const API_BASE_URL = "https://journalapplication-ssku.onrender.com/";
//https://journalapplication-2.onrender.com

const backendServers = [
  "https://journalapplication-ssku.onrender.com/",
  "https://journalapplication-2.onrender.com"
];
// const API_BASE_URL = "http://localhost:8080";


const API_BASE_URL = backendServers[Math.floor(Math.random() * backendServers.length)];

export function setCredentials(token) {
  localStorage.setItem("token",token);
}

export function checkAuth(){
  const token = localStorage.getItem('token');
  return !!token ;
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
export const signup = (user) => {
  const response = axiosInstance.post("/public/signup", user);
  return response;
}
export const login = (user) =>{
  const response = axiosInstance.post("/public/login", user);
  return response;
}

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
  const response = axiosInstance.post("/journal", journal, {
    headers: {
      Authorization: authHeader,
    },
  });
  return response;
};

export const deleteJournalById = async(id) => {
  const authHeader = getCredentials();
  const response = axiosInstance.delete(`/journal/id/${id}`, {
    headers: {
      Authorization: authHeader,
    },
  });
  return response;
};

export const updateJournalById = async(id, journal) => {
  const authHeader = getCredentials();
  const response = axiosInstance.put(`/journal/id/${id}`, journal, {
    headers: {
      Authorization: authHeader,
    },
  });
  return response;
}; 

export const getJournalPdfById = async(id) =>{
  const authHeader = getCredentials();
  const response = axiosInstance.get(`/journal/generate-pdf/id/${id}`,{
    headers: {
      Authorization: authHeader,
    },
    responseType: 'blob'
  });
  return response;
}

//User Endpoints
export const updatePassword = async(User) =>{
  const authHeader = getCredentials();
  const response = axiosInstance.put(`/user`,User,{
    headers:{
      Authorization: authHeader,
    },
  });
  return response;
}; 

export const deleteUser = async() =>{
  const authHeader = getCredentials();
  const response = axiosInstance.delete(`/user`,{
    headers:{
      Authorization: authHeader,
    },
  });
  return response;
};  

export const updateProfile = async(User) =>{
  const authHeader = getCredentials();
  const response = axiosInstance.put('/user/profile',User,{
    headers:{
      Authorization: authHeader
    }
  });
  return response;
};