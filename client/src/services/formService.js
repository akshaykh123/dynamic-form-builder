import api from "../api/axios";

export const createForm = async (formData) => {
  const response = await api.post("/forms", formData);

  return response.data;
};

export const getForms = async () => {
  const response = await api.get("/forms");

  return response.data;
};