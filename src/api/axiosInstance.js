import axios from "axios";

const API_BASE_URL = "http://localhost:3000/"; // Заміни на свій бекенд

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
