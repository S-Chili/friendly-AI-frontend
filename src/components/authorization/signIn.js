import React from "react";
import {
  Box,
  TextField,
  Typography,
  Button,
  Link as MuiLink,
  Avatar,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Image from "next/image";
import Link from "next/link";

export default function SignIn() {
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
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "anchor-center",
          marginTop: "150px",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "#ADD8E6" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography variant="h2" component="h2" sx={{ color: "GrayText" }}>
          Sign In
        </Typography>
        <Box
          component="form"
          sx={{
            "& > :not(style)": { m: 1, width: "35ch" },
            display: "flex",
            flexDirection: "column",
            alignItems: "anchor-center",
            marginTop: "50px",
            marginBottom: "20px",
          }}
          noValidate
          autoComplete="off"
        >
          <TextField id="outlined-basic" label="Email" variant="outlined" />
          <TextField id="outlined-basic" label="Password" variant="outlined" />
        </Box>
        <Button
          variant="outlined"
          sx={{
            width: "40ch",
          }}
        >
          Sign In
        </Button>
        <Link href="/signup" passHref legacyBehavior>
          <MuiLink
            variant="body2"
            sx={{ mt: 2, cursor: "pointer", display: "block", zIndex: 10 }}
          >
            Still don’t have an account? Sign up
          </MuiLink>
        </Link>
      </Box>
    </Box>
  );
}
