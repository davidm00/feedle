import React, { useContext } from "react";
import { Box } from "@mui/material";
import { makeStyles } from "@mui/styles";
import Board from "../Board/Board";
import Keyboard from "../Keyboad/Keyboard";
import { AnswerContext } from "../../Context/AnswerContext";
import { useEventListener } from "../../Utilities/useEventListener";

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
  const { handleKey } = useContext(AnswerContext);

  useEventListener('keyup', handleKey);

  return (
    <Box
      className={classes.Game}
      sx={{ flexGrow: 1, height: "100vh", width: "100vw"}}
    >
      <Board />
      <Keyboard />
    </Box>
  );
};

export default Game;
