"use client";
import React, { useState, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import Hero from "@/components/hero/hero";
import Chat from "@/components/chat/chat";
import MenuIcon from "@mui/icons-material/Menu";
import IconButton from "@mui/material/IconButton";
import ThemeSwitcher from "@/styles/ThemeSwitcher";
import Chats from "@/components/chats/chats";
import { createChat, sendMessage } from "@/api/chatApi";
import { TextField, Typography, CircularProgress, Stack } from "@mui/material";

const drawerWidth = 300;

function InitialChatScreen({ onInitialMessage, isLoading }) {
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (input.trim() && !isLoading) {
      onInitialMessage(input.trim());
      setInput("");
    }
  };

  const description = (
    <>
      <Typography variant="h5" component="h1" gutterBottom>
        🤖 Вітаємо у Friendly AI Chatbot!
      </Typography>
      <Typography variant="body1" color="text.secondary" paragraph>
        Я — ваш особистий помічник для швидкого отримання інформації.
      </Typography>
      <Typography variant="subtitle1" color="primary.main" gutterBottom>
        Мої можливості:
      </Typography>
      <Typography
        variant="body2"
        component="ul"
        sx={{ pl: 2, mb: 3, textAlign: "left" }}
      >
        <li>Перевірка погоди на сьогодні, завтра, післязавтра.</li>
        <li>Відповіді на загальні запитання.</li>
        <li>Підтримка розмови та жарти!</li>
      </Typography>
    </>
  );

  return (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        p: 3,
      }}
    >
      <>
        {description}
        <Box sx={{ display: "flex", alignItems: "center", mt: 3 }}>
          <TextField
            fullWidth
            variant="outlined"
            size="small"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={
              isLoading ? "Створення чату..." : "Введіть перше повідомлення..."
            }
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            disabled={isLoading}
          />
          <IconButton color="primary" onClick={handleSend} disabled={isLoading}>
            {isLoading ? <CircularProgress size={24} /> : <MenuIcon />}
          </IconButton>
        </Box>
      </>
    </Box>
  );
}

function Home() {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [selectedChatId, setSelectedChatId] = useState(null);
  const [isGlobalLoading, setIsGlobalLoading] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleSelectChat = (chatId) => {
    console.log("🔍 Вибраний chatId:", chatId);
    setSelectedChatId(chatId);
  };

  const handleInitialMessage = async (message) => {
    setIsGlobalLoading(true);

    try {
      const newChat = await createChat();
      const newChatId = newChat._id;

      await sendMessage(newChatId, message);

      setSelectedChatId(newChatId);
    } catch (error) {
      console.error(
        "❌ Помилка при створенні/надсиланні першого повідомлення:",
        error
      );
      alert("Не вдалося створити чат. Перевірте з'єднання.");
    } finally {
      setIsGlobalLoading(false);
    }
  };

  useEffect(() => {
    console.log("🛠 ChatId змінився:", selectedChatId);
  }, [selectedChatId]);

  return (
    <Box sx={{ display: "flex", height: "100vh", flexDirection: "column" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar
          sx={{
            height: "128px",
            minHeight: "128px",
            display: "flex",
            alignItems: "center",
          }}
        >
          {/* Кнопка для відкриття меню в мобільному режимі */}
          <IconButton
            color="inherit"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" }, zIndex: 10 }} // Додаємо zIndex, щоб бути вище всього
          >
            <MenuIcon />
          </IconButton>

          {/* Hero тепер не перекриває кнопку */}
          <Box sx={{ flexGrow: 1 }}>
            <Hero />
            <ThemeSwitcher />
          </Box>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      >
        <Chats
          onSelectChat={handleSelectChat}
          mobileOpen={mobileOpen}
          handleDrawerToggle={handleDrawerToggle}
          selectedChatId={selectedChatId}
        />
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          height: "100vh",
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          overflow: "auto",
          display: "flex",
          flexDirection: "column",
          pt: "128px",
        }}
      >
        {isGlobalLoading ? (
          <Stack
            alignItems="center"
            justifyContent="center"
            sx={{ height: "100%", mt: "-128px" }}
          >
            <CircularProgress size={60} />
            <Typography variant="h6" sx={{ mt: 2 }}>
              Створення першого чату...
            </Typography>
          </Stack>
        ) : selectedChatId ? (
          <Chat chatId={selectedChatId} />
        ) : (
          <InitialChatScreen
            onInitialMessage={handleInitialMessage}
            isLoading={isGlobalLoading}
          />
        )}
      </Box>
    </Box>
  );
}

export default Home;
