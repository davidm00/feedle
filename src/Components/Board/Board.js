import React, {useContext, useLayoutEffect, useState} from "react";
import { Box } from "@mui/material";
import WordInput from "./WordInput/WordInput";
import { makeStyles } from "@mui/styles";
import { AnswerContext } from "../../Context/AnswerContext";

const useStyles = makeStyles(() => ({
  guessContainer: {
    display: "grid",
    gridTemplateColumns: "1fr",
    gridTemplateRows: "repeat(6, 1fr)",
    gridColumnGap: 0,
    gridRowGap: 10,
    alignItems: "center",
    justifyItems: "center",
  },
}));

const Board = () => {
  const classes = useStyles();
  const { previousAnswers } = useContext(AnswerContext);
  const [inputs, setInputs] = useState([])

  useLayoutEffect(() => {
    setInputs(previousAnswers)
  }, [previousAnswers])

  return (
    <Box sx={{ flexGrow: 1, alignItems: "center" }}>
      <Box
        className={classes.guessContainer}
        sx={{ flexGrow: 1, mt: 5, mb: 10 }}
      >
        {inputs.map(({word, active, position, placement}) => {
          return <WordInput key={position} status={active} word={word} placement={placement} />;
        })}
      </Box>
    </Box>
  );
};

export default Board;
