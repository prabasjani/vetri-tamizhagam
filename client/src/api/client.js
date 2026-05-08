import axios from "axios";
import { toast } from "sonner";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
  withCredentials: true, // VERY IMPORTANT for cookies
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
});

// Response interceptor (central error handling)
// api.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     // You can centralize error logging here
//     toast.error("API ERROR:", error.response?.data || error.message);
//     console.error("API ERROR:", error.response?.data || error.message);

//     return Promise.reject(error);
//   },
// );

export default api;
