import axiosInstance from "./config";

export const sendContactForm = async (payload) => {
  // Aceptar: name, email, phone, message
  const response = await axiosInstance.post("/contact", payload);
  return response.data;
};