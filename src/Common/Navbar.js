import { Box, AppBar, Toolbar, IconButton, Typography } from "@mui/material";
import { Fastfood, QuestionMark } from "@mui/icons-material";
import React from "react";

const Navbar = () => {
  return (
    <Box sx={{ flexGrow: 1, textAlign: "center" }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{
              mr: 2,
              "&:hover": {
                cursor: "default",
              },
            }}
            disableTouchRipple
            disableFocusRipple
            disableRipple
          >
            <Fastfood />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Feedle
          </Typography>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 0 }}
          >
            <QuestionMark />
          </IconButton>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
