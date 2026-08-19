import axios from "axios";

/* =========================================================
   NURTURE AI - PREGNANCY DETAILS API
========================================================= */

const API = axios.create({
  baseURL: "http://10.157.64.217:8080/api",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

/* =========================================================
   SAVE PREGNANCY DETAILS
   POST /api/pregnancy
========================================================= */

export const savePregnancyDetails = async (data) => {
  try {
    console.log("Saving pregnancy details:", data);

    const response = await API.post(
      "/pregnancy",
      data
    );

    console.log(
      "Pregnancy save response:",
      response.data
    );

    return response;
  } catch (error) {
    console.error(
      "Error saving pregnancy details:",
      error
    );

    throw error;
  }
};

/* =========================================================
   GET PREGNANCY DETAILS
   GET /api/pregnancy/user/{userId}
========================================================= */

export const getPregnancyDetails = async (userId) => {
  try {
    console.log(
      "Fetching pregnancy details for user:",
      userId
    );

    const response = await API.get(
      `/pregnancy/user/${userId}`
    );

    console.log(
      "Pregnancy details response:",
      response.data
    );

    return response;
  } catch (error) {
    console.error(
      "Error fetching pregnancy details:",
      error
    );

    throw error;
  }
};

/* =========================================================
   UPDATE PREGNANCY DETAILS
   PUT /api/pregnancy/user/{userId}
========================================================= */

export const updatePregnancyDetails = async (
  userId,
  data
) => {
  try {
    console.log(
      "Updating pregnancy details for user:",
      userId
    );

    console.log(
      "Pregnancy update data:",
      data
    );

    const response = await API.put(
      `/pregnancy/user/${userId}`,
      data
    );

    console.log(
      "Pregnancy update response:",
      response.data
    );

    return response;
  } catch (error) {
    console.error(
      "Error updating pregnancy details:",
      error
    );

    throw error;
  }
};

/* =========================================================
   DEFAULT API
========================================================= */

export default API;