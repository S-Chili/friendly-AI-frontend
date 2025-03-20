"use client";
import * as React from "react";
import PropTypes from "prop-types";
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

const drawerWidth = 360;

function Home(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

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
        <Chats />
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
        <Chat />
      </Box>
    </Box>
  );
}

export default Home;
