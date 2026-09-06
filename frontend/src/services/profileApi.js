import API from "./api";

// =========================================================
// GET PERSONAL INFORMATION
// =========================================================

export const getPersonalInfo = async (userId) => {
  return await API.get(
    `/profile/personal-info/${userId}`,
    {
      withCredentials: true,
    }
  );
};

// =========================================================
// CREATE PERSONAL INFORMATION
// =========================================================

export const savePersonalInfo = async (data) => {
  return await API.post(
    "/profile/personal-info",
    data,
    {
      withCredentials: true,
    }
  );
};

// =========================================================
// UPDATE PERSONAL INFORMATION
// =========================================================

export const updatePersonalInfo = async (
  userId,
  data
) => {
  return await API.put(
    `/profile/personal-info/${userId}`,
    data,
    {
      withCredentials: true,
    }
  );
};