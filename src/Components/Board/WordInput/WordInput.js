import React, { useContext, useLayoutEffect, useState } from "react";
import { FormControl, OutlinedInput, TextField } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { AnswerContext } from "../../../Context/AnswerContext";

const useStyles = makeStyles(() => ({
  wordContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(5, 1fr)",
    gridTemplateRows: "1fr",
    gridColumnGap: 10,
    gridRowGap: 0,
    alignItems: "center",
    justifyItems: "center",
  },
  letterBox: {
    width: 50,
    height: 30,
    margin: "15px 1px",
    "& input": {
      "&:hover": {
        cursor: "default",
        outline: "none",
      },
    },
  },
  // inputFormat{

  // },
  correct: {
    backgroundColor: "#6AA965", // "#4caf50", // "#2e7d32",
    color: "white",
  },
  included: {
    backgroundColor: "#CAB457",
    color: "white",
  },
  incorrect: {
    backgroundColor: "#797D7F",
    color: "white",
  },
  active: {
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "rgba(0, 0, 0, 0.26)",
      },
      "&:hover fieldset": {
        borderColor: "rgba(0, 0, 0, 0.26)",
      },
      "&.Mui-focused fieldset": {
        borderColor: "rgba(0, 0, 0, 0.26)",
      },
    },
  },
}));

const isCorrect = ["G", "G", "G", "G", "G"];
const isIncluded = ["Y", "Y", "Y", "Y", "Y"];

const WordInput = ({ status, word, placement }) => {
  const classes = useStyles();
  const { currentAnswer, previousAnswers } = useContext(AnswerContext);
  const [activeWord, setActiveWord] = useState("");

  useLayoutEffect(() => {
    setActiveWord("");
    if (currentAnswer.length < 5) {
      let offset = 5 - currentAnswer.length;
      let newWord = `${currentAnswer}${Array(offset).fill("\xa0").join("")}`;
      setActiveWord(newWord);
    }
    if (currentAnswer.length == 5) {
      setActiveWord(currentAnswer);
    }
  }, [currentAnswer, previousAnswers]);

  return status ? (
    // Current guess
    <div className={classes.wordContainer} sx={{ flexFlow: 1 }}>
      {activeWord.split("").map((letter, idx) => {
        return (
          <FormControl className={classes.letterBox} key={idx}>
            <TextField
              className={classes.active}
              value={letter}
              inputProps={{
                "aria-label": "letter box",
                "style": { textAlign: "center", fontSize: 24, padding: "10px 0" },
              }}
            />
          </FormControl>
        );
      })}
    </div>
  ) : word ? (
    // Incorrect but confirmed guess
    <div className={classes.wordContainer} sx={{ flexFlow: 1 }}>
      {word.split("").map((letter, idx) => {
        return (
          <FormControl
            className={classes.letterBox}
            key={idx}
            variant="outlined"
          >
            <OutlinedInput
              className={
                isCorrect[idx] == placement[idx]
                  ? classes.correct
                  : isIncluded[idx] == placement[idx]
                  ? classes.included
                  : classes.incorrect
              }
              disabled
              value={letter}
              aria-describedby="outlined-weight-helper-text"
              inputProps={{
                "aria-label": "letter box",
                "style": { textAlign: "center", fontSize: 24, padding: "10px 0" },
              }}
            />
          </FormControl>
        );
      })}
    </div>
  ) : (
    // Inactive fields
    <div className={classes.wordContainer} sx={{ flexFlow: 1 }}>
      {[1, 2, 3, 4, 5].map((idx) => {
        return (
          <FormControl
            className={classes.letterBox}
            key={idx}
            variant="outlined"
          >
            <OutlinedInput
              disabled
              value={""}
              aria-describedby="outlined-weight-helper-text"
              inputProps={{
                "aria-label": "letter box",
                "style": { textAlign: "center", fontSize: 24, padding: "10px 0" },
              }}
            />
          </FormControl>
        );
      })}
    </div>
  );
};

export default WordInput;
