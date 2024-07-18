import axios from "axios";

const API_BASE_URL = "http://localhost:8080";

export function setCredentials(userName, password) {
  localStorage.setItem("userName", userName);
  localStorage.setItem("password", password);
}

const getCredentials = () => {
  const userName = localStorage.getItem("userName");
  const password = localStorage.getItem("password");
  if (userName && password) {
    return `Basic ${btoa(`${userName}:${password}`)}`;
  }
  return "";
};

export function clearCredentials() {
  localStorage.removeItem("userName");
  localStorage.removeItem("password");
}

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

//Public endpoints
export const healthCheck = () => axiosInstance.get("/public/health-check");
export const createUser = (user) =>
  axiosInstance.post("/public/create-user", user);
export const authenticateUser = (user) =>
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
  const response = axiosInstance.get(`/journal/id/${id}`, id, {
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
  axiosInstance.delete(`/journal/id/${id}`, id, {
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
