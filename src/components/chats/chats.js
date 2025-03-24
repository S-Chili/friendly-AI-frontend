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
import { fetchChats, createChat, deleteChat } from "@/api/chatApi";
import { IconButton } from "@mui/material";

const drawerWidth = 300;

export default function Chats({ onSelectChat }) {
  if (!onSelectChat) {
    console.error("❌ onSelectChat не передано в Chats!");
  }

  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [chats, setChats] = useState([]);
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

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
    console.log("📢 Клік по чату:", chatId);
    if (onSelectChat) {
      onSelectChat(chatId);
    } else {
      console.error("❌ onSelectChat не передано!");
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
          <ListItem key={chat._id} disablePadding>
            <ListItemButton onClick={() => handleChatClick(chat._id)}>
              <ListItemIcon>
                <ChatIcon />
              </ListItemIcon>
              <ListItemText primary={chat.name} />
            </ListItemButton>
            <IconButton
              sx={{ paddingRight: 2 }}
              onClick={() => handleDeleteChat(chat._id)}
            >
              <DeleteOutlineIcon style={{ color: "#919090" }} />
            </IconButton>
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
