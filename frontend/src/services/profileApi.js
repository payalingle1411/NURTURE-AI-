import axios from "axios";

const API = axios.create({
  baseURL: "http://10.157.64.217:8080/api",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

// Save personal information
export const savePersonalInfo = async (data) => {
  try {
    const response = await API.post("/profile/personal-info", data);
    return response;
  } catch (error) {
    console.error("Error saving personal information:", error);
    throw error;
  }
};

// Get personal information
export const getPersonalInfo = async (userId) => {
  try {
    const response = await API.get(
      `/profile/personal-info/${userId}`
    );
    return response;
  } catch (error) {
    console.error("Error fetching personal information:", error);
    throw error;
  }
};

export default API;