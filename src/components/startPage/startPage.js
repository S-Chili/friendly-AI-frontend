import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Image from "next/image";
import Link from "next/link";

const drawerWidth = 240;
const navItems = ["SignIn", "About", "Contact"];

function StartingPage(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item} disablePadding>
            <ListItemButton sx={{ textAlign: "center" }}>
              {item === "SignIn" ? (
                <Link
                  href="/signin"
                  style={{ textDecoration: "none", width: "100%" }}
                >
                  <ListItemText primary={item} sx={{ color: "black" }} />
                </Link>
              ) : (
                <ListItemText primary={item} />
              )}
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        minHeight: "100vh",
        background:
          "linear-gradient(135deg, #FFB6C1,rgb(222, 192, 255), #ADD8E6)",
      }}
    >
      <CssBaseline />
      <AppBar
        component="nav"
        sx={{
          backgroundColor: "white",
          position: "sticky",
          marginTop: "50px",
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{
              flexGrow: 1,
              display: { xs: "none", sm: "block" },
            }}
          >
            <Image src="/logo.jpeg" alt="logo image" width={120} height={60} />
          </Typography>
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            {navItems.map((item) =>
              item === "SignIn" ? (
                <Link key={item} href="/signin" passHref>
                  <Button sx={{ color: "black" }}>{item}</Button>
                </Link>
              ) : (
                <Button key={item} sx={{ color: "black" }}>
                  {item}
                </Button>
              )
            )}
          </Box>
        </Toolbar>
      </AppBar>

      <nav>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
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
      </nav>

      <Box
        sx={{
          position: "relative",
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          paddingTop: "50px",
          width: "800px",
          height: "500px",
          alignSelf: "center",
        }}
      >
        <Image
          src="/image.png"
          alt="Hero image"
          width={800}
          height={500}
          style={{
            width: "100%",
            height: "auto",
            maxWidth: "100%",
            marginBottom: "50px",
            position: "relative",
            zIndex: 1,
          }}
        />
        {/* <Box sx={{ padding: "0 20px", textAlign: "center" }}>
          <Typography
            variant="h4"
            sx={{
              color: "white",
              fontSize: { xs: "24px", sm: "36px", md: "48px" },
              fontWeight: 700,
              marginBottom: "20px",
            }}
          >
            Welcome to My Website
          </Typography>
          <Button
            variant="contained"
            color="primary"
            sx={{
              padding: "10px 20px",
              fontSize: { xs: "14px", sm: "16px" },
              marginTop: "20px",
            }}
          >
            Get Started
          </Button>
        </Box> */}
      </Box>
    </Box>
  );
}

export default StartingPage;
