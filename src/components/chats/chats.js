"use client";
import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Toolbar from "@mui/material/Toolbar";
import ChatIcon from "@mui/icons-material/Chat";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import AddCommentIcon from "@mui/icons-material/AddComment";
import EditIcon from "@mui/icons-material/Edit"; // ✅ Новий імпорт
import DoneIcon from "@mui/icons-material/Done"; // ✅ Новий імпорт
import {
  fetchChats,
  createChat,
  deleteChat,
  updateChatName,
} from "@/api/chatApi"; // ✅ Оновлений імпорт
import { IconButton, TextField } from "@mui/material"; // ✅ Оновлений імпорт

const drawerWidth = 300;

export default function Chats({
  onSelectChat,
  mobileOpen,
  handleDrawerToggle,
}) {
  if (!onSelectChat) {
    console.error("❌ onSelectChat не передано в Chats!");
  }

  const [chats, setChats] = useState([]);
  const [isEditing, setIsEditing] = useState(false); // ✅ Стан для режиму редагування
  const [editedChatId, setEditedChatId] = useState(null); // ✅ ID чату, що редагується
  const [editedName, setEditedName] = useState(""); // ✅ Нова назва чату

  useEffect(() => {
    const loadChats = async () => {
      const data = await fetchChats();
      setChats(data);
    };
    loadChats();
  }, []);

  const handleCreateChat = async () => {
    const newChat = await createChat();
    setChats((prev) => [...prev, newChat]);
  };

  const handleDeleteChat = async (chatId) => {
    if (!chatId) {
      console.error("❌ chatId не може бути undefined!");
      return;
    }
    console.log("🗑 Видалення чату:", chatId);
    await deleteChat(chatId);
    setChats((prev) => prev.filter((chat) => chat._id !== chatId));
  };

  const handleChatClick = (chatId) => {
    if (isEditing) return; // ✅ Забороняємо перемикання чатів під час редагування
    console.log("📢 Клік по чату:", chatId);
    if (onSelectChat) {
      onSelectChat(chatId);
    } else {
      console.error("❌ onSelectChat не передано!");
    }
    if (mobileOpen) {
      handleDrawerToggle();
    }
  };

  // ✅ Нова функція для перемикання в режим редагування
  const handleEditClick = (chat) => {
    setIsEditing(true);
    setEditedChatId(chat._id);
    setEditedName(chat.name);
  };

  // ✅ Нова функція для збереження назви
  const handleSaveClick = async () => {
    // ✅ Умова перевіряє, чи ім'я дійсно змінилося
    if (
      editedName.trim() &&
      editedName !== chats.find((c) => c._id === editedChatId)?.name
    ) {
      try {
        const updatedChat = await updateChatName(editedChatId, editedName);
        // ✅ Оновлення стану chats
        setChats((prev) =>
          prev.map(
            (chat) => (chat._id === editedChatId ? updatedChat : chat) // Використовуємо оновлений об'єкт
          )
        );
      } catch (error) {
        console.error("❌ Не вдалося оновити назву чату:", error);
      }
    }
    // ✅ Завжди скидаємо стан редагування, незалежно від результату
    setIsEditing(false);
    setEditedChatId(null);
  };

  // ✅ Нова функція для обробки натискань клавіш у полі введення
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSaveClick();
    }
  };

  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <ListItemButton
        variant="contained"
        style={{ justifyContent: "end" }}
        onClick={handleCreateChat}
      >
        <AddCommentIcon style={{ color: "#919090" }} />
      </ListItemButton>
      <List>
        {chats.map((chat) => (
          <ListItem
            key={chat._id}
            disablePadding
            sx={{ display: "flex", alignItems: "center" }}
          >
            {isEditing && editedChatId === chat._id ? (
              <TextField
                variant="outlined"
                size="small"
                value={editedName}
                onChange={(e) => setEditedName(e.target.value)}
                onKeyDown={handleKeyDown}
                sx={{ flexGrow: 1, my: 1, ml: 2 }}
                autoFocus
              />
            ) : (
              <ListItemButton
                onClick={() => handleChatClick(chat._id)}
                sx={{ flexGrow: 1 }}
              >
                <ListItemIcon>
                  <ChatIcon />
                </ListItemIcon>
                <ListItemText primary={chat.name} />
              </ListItemButton>
            )}
            {isEditing && editedChatId === chat._id ? (
              <IconButton onClick={handleSaveClick} sx={{ paddingRight: 2 }}>
                <DoneIcon style={{ color: "green" }} />
              </IconButton>
            ) : (
              <>
                <IconButton
                  sx={{ paddingRight: 1 }}
                  onClick={() => handleEditClick(chat)}
                >
                  <EditIcon style={{ color: "#919090" }} />
                </IconButton>
                <IconButton
                  sx={{ paddingRight: 2 }}
                  onClick={() => handleDeleteChat(chat._id)}
                >
                  <DeleteOutlineIcon style={{ color: "#919090" }} />
                </IconButton>
              </>
            )}
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <Box
      component="nav"
      sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
    >
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        sx={{
          display: { xs: "block", sm: "none" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth,
          },
        }}
      >
        {drawer}
      </Drawer>

      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", sm: "block" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth,
          },
        }}
        open
      >
        {drawer}
      </Drawer>
    </Box>
  );
}
