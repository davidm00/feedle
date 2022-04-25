import React, { useContext, useState, useLayoutEffect } from "react";
import { Box } from "@mui/material";
import { makeStyles } from "@mui/styles";

import { AnswerContext } from "../../Context/AnswerContext";
// import { firstRow, secondRow, thirdRow } from "../../Constants/Keyboard";
import Key from "./Key";

const useStyles = makeStyles(() => ({
  rowsContainer: {
    display: "grid",
    gridTemplateColumns: "1fr",
    gridTemplateRows: "repeat(3, 1fr)",
    gridColumnGap: 10,
    gridRowGap: 0,
    alignItems: "center",
    justifyItems: "center",
  },
  shortRowContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(9, 1fr)",
    gridTemplateRows: "1fr",
    gridColumnGap: 10,
    gridRowGap: 0,
    alignItems: "center",
    justifyItems: "center",
  },
  longRowContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(10, 1fr)",
    gridTemplateRows: "1fr",
    gridColumnGap: 10,
    gridRowGap: 0,
    alignItems: "center",
    justifyItems: "center",
  },
}));

const Keyboard = () => {
  const classes = useStyles();
  const { keys } = useContext(AnswerContext)
  const [keyboard, setKeyboard] = useState(null)

  useLayoutEffect(() => {
    setKeyboard(keys)
  }, [keys])

  return (
    keyboard && <Box sx={{ flexGrow: 0, height: 200 }}>
      <Box className={classes.rowsContainer} sx={{ flexGrow: 1 }}>
        <Box className={classes.longRowContainer} sx={{ flexGrow: 1 }}>
          {keyboard.rows[0].map((item) => {
            return (
              <Key
                key={item.letter}
                letter={item.letter}
                type={item.type}
                status={item.status}
              />
            );
          })}
        </Box>
        <Box className={classes.shortRowContainer} sx={{ flexGrow: 1 }}>
          {keyboard.rows[1].map((item) => {
            return (
              <Key
                key={item.letter}
                letter={item.letter}
                type={item.type}
                status={item.status}
              />
            );
          })}
        </Box>
        <Box className={classes.shortRowContainer} sx={{ flexGrow: 1 }}>
          {keyboard.rows[2].map((item) => {
            return (
              <Key
                key={item.letter}
                letter={item.letter}
                type={item.type}
                status={item.status}
              />
            );
          })}
        </Box>
      </Box>
    </Box>
  );
};

export default Keyboard;
