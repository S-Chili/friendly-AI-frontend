import api from "./axiosInstance";

// Отримати всі чати
export const fetchChats = async () => {
  const response = await api.get("/chats");
  return response.data;
};

// Створити новий чат
export const createChat = async () => {
  const response = await api.post("/chats");
  return response.data;
};

// Отримати повідомлення конкретного чату
export const fetchMessages = async (chatId) => {
  const response = await api.get(`/chats/${chatId}/messages`);
  return response.data;
};

// Надіслати повідомлення
export const sendMessage = async (chatId, message) => {
  if (!chatId) {
    throw new Error("❌ chatId не може бути undefined!");
  }
  console.log("📡 Відправка запиту на бек:", { chatId, message });

  const response = await api.post("/chat", { chatId, message });
  return response.data;
};
