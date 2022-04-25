import React from "react";
import { Box } from "@mui/material";
import { makeStyles } from "@mui/styles";
import Board from "../Board/Board";
import Keyboard from "../Keyboad/Keyboard";

const useStyles = makeStyles(() => ({
  Game: {
    display: "grid",
    gridTemplateColumns: "1fr",
    gridTemplateRows: "repeat(3, 1fr)",
    gridColumnGap: 0,
    gridRowGap: 10,
  },
}));

const Game = () => {
  const classes = useStyles();

  return (
    <Box className={classes.Game} sx={{ flexGrow: 1, maxHeight: "50vh" }}>
      <Board />
      <Keyboard />
    </Box>
  );
};

export default Game;
