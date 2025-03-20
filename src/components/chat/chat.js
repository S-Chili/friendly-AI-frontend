import React, { useState, useEffect, useRef } from "react";
import { Box, TextField, IconButton, Paper, Typography } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

export default function Chat() {
  const [messages, setMessages] = useState([
    { text: "Привіт! Як справи?", sender: "bot" },
    { text: "Привіт! Все добре, а у тебе?", sender: "user" },
  ]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    if (input.trim() === "") return;

    setMessages((prev) => [...prev, { text: input, sender: "user" }]);
    setInput("");

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { text: "Це авто-відповідь 😊", sender: "bot" },
      ]);
    }, 1000);
  };

  return (
    <Paper
      elevation={3}
      sx={{ flex: 1, display: "flex", flexDirection: "column", p: 2 }}
    >
      <Box sx={{ flex: 1, overflowY: "auto", p: 1 }}>
        {messages.map((msg, index) => (
          <Box
            key={index}
            sx={{
              display: "flex",
              justifyContent: msg.sender === "user" ? "flex-end" : "flex-start",
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
        ))}
        <div ref={messagesEndRef} />
      </Box>

      <Box sx={{ display: "flex", alignItems: "center", p: 1 }}>
        <TextField
          fullWidth
          variant="outlined"
          size="small"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Напишіть повідомлення..."
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <IconButton color="primary" onClick={handleSend}>
          <SendIcon />
        </IconButton>
      </Box>
    </Paper>
  );
}
