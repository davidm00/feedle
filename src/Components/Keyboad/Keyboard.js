import React from "react";
import { Box } from "@mui/material";
import { makeStyles } from "@mui/styles";

// import { AnswerContext } from "../../Context/AnswerContext";
import { firstRow, secondRow, thirdRow } from "../../Constants/Keyboard";
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

  return (
    <Box sx={{ flexGrow: 0, height: 200 }}>
      <Box className={classes.rowsContainer} sx={{ flexGrow: 1 }}>
        <Box className={classes.longRowContainer} sx={{ flexGrow: 1 }}>
          {firstRow.map((item) => {
            return (
              <Key key={item.letter} letter={item.letter} type={item.type} />
            );
          })}
        </Box>
        <Box className={classes.shortRowContainer} sx={{ flexGrow: 1 }}>
          {secondRow.map((item) => {
            return (
              <Key key={item.letter} letter={item.letter} type={item.type} />
            );
          })}
        </Box>
        <Box className={classes.shortRowContainer} sx={{ flexGrow: 1 }}>
          {thirdRow.map((item) => {
            return (
              <Key key={item.letter} letter={item.letter} type={item.type} />
            );
          })}
        </Box>
      </Box>
    </Box>
  );
};

export default Keyboard;
