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

export const deleteChat = async (chatId) => {
  if (!chatId) {
    throw new Error("❌ chatId не може бути undefined!");
  }
  console.log("🗑 Видалення чату:", chatId);

  const response = await api.delete(`/chats/${chatId}`);
  return response.data;
};

// src/api/chatApi.js
// Припустимо, що у вас є налаштований екземпляр axios з назвою `api`

export const updateChatName = async (chatId, newName) => {
  try {
    const response = await api.put(`/chats/${chatId}`, {
      newName,
    });
    // ✅ Повертаємо дані з властивості 'data'
    return response.data;
  } catch (error) {
    console.error("❌ Помилка оновлення чату:", error);
    throw new Error("Не вдалося оновити назву чату");
  }
};

// ... інші функції
