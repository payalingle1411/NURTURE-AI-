import API from "./api";

/* =========================================================
   NURTURE AI - PREGNANCY API
========================================================= */


/**
 * Save pregnancy details
 *
 * POST /pregnancy
 */
export const savePregnancyDetails = async (data) => {
  return await API.post("/pregnancy", data);
};


/**
 * Get pregnancy details
 *
 * GET /pregnancy/user/{userId}
 */
export const getPregnancyDetails = async (userId) => {
  return await API.get(`/pregnancy/user/${userId}`);
};


/**
 * Update pregnancy details
 *
 * PUT /pregnancy/user/{userId}
 */
export const updatePregnancyDetails = async (userId, data) => {
  return await API.put(
    `/pregnancy/user/${userId}`,
    data
  );
};