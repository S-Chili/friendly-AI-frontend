import axios from "axios";

const API_BASE_URL = "https://friendly-ai-backend.onrender.com";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Додаємо токен аутентифікації, якщо він є
// api.interceptors.request.use((config) => {
//   const token = localStorage.getItem("token"); // або отримуй іншим способом
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

export default api;
