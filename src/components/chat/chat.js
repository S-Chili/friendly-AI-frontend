import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  TextField,
  IconButton,
  Paper,
  Typography,
  CircularProgress,
  Stack,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { fetchMessages, sendMessage } from "@/api/chatApi";

export default function Chat({ chatId }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isFetchingMessages, setIsFetchingMessages] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (chatId) {
      setIsFetchingMessages(true); //
      console.log("🔄 Завантаження повідомлень для:", chatId);
      fetchMessages(chatId)
        .then((data) => {
          console.log("📨 Отримані повідомлення:", data);
          setMessages(
            data.flatMap((msg) =>
              [
                { text: msg.userMessage, sender: "user" },
                { text: msg.botResponse, sender: "bot" },
              ].filter((m) => m.text)
            )
          );
          setIsFetchingMessages(false);
        })
        .catch((error) => {
          console.error("❌ Помилка завантаження повідомлень:", error);
          setIsFetchingMessages(false);
        });
    }
  }, [chatId]);

  const handleSendMessage = async () => {
    if (!chatId || !input.trim()) {
      alert("Виберіть чат і введіть повідомлення!");
      return;
    }

    const newUserMessage = { text: input, sender: "user" };
    setMessages((prev) => [...prev, newUserMessage]);
    const messageToSend = input;
    setInput("");
    setIsSending(true);

    try {
      const response = await sendMessage(chatId, messageToSend);
      console.log("🤖 Відповідь бота:", response);

      const botReply = response?.response;
      if (botReply) {
        const botMessage = { text: botReply, sender: "bot" };
        setMessages((prev) => [...prev, botMessage]);
      } else {
        console.error("Помилка: Відповідь бота не отримана.");
      }
    } catch (error) {
      console.error("❌ Помилка надсилання повідомлення:", error);
      alert("Не вдалося надіслати повідомлення. Перевірте з'єднання.");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <Paper
      elevation={3}
      sx={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        p: 2,
        height: "100%",
      }}
    >
      <Box sx={{ flex: 1, overflowY: "auto", p: 1 }}>
        {isFetchingMessages ? (
          <Stack
            alignItems="center"
            justifyContent="center"
            sx={{ height: "100%" }}
          >
            <CircularProgress />
            <Typography variant="body1" sx={{ mt: 2 }}>
              Завантаження повідомлень...
            </Typography>
          </Stack>
        ) : (
          messages.map((msg, index) => (
            <Box
              key={index}
              sx={{
                display: "flex",
                justifyContent:
                  msg.sender === "user" ? "flex-end" : "flex-start",
                mb: 1,
              }}
            >
              <Typography
                sx={{
                  bgcolor: msg.sender === "user" ? "primary.main" : "grey.300",
                  color: msg.sender === "user" ? "white" : "black",
                  p: 1.5,
                  borderRadius: "10px",
                  maxWidth: "70%",
                }}
              >
                {msg.text}
              </Typography>
            </Box>
          ))
        )}
        <div ref={messagesEndRef} />
      </Box>

      <Box sx={{ display: "flex", alignItems: "center", p: 1 }}>
        <TextField
          fullWidth
          variant="outlined"
          size="small"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={isSending ? "Відправка..." : "Напишіть повідомлення..."}
          onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
          disabled={isSending}
        />
        <IconButton
          color="primary"
          onClick={handleSendMessage}
          disabled={isSending}
        >
          {isSending ? <CircularProgress size={24} /> : <SendIcon />}{" "}
        </IconButton>
      </Box>
    </Paper>
  );
}
