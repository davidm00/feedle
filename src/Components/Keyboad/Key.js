import React, { useContext } from "react";
import { Button, Typography } from "@mui/material";
import {
  CheckRounded as CheckIcon,
  BackspaceRounded as DeleteIcon,
} from "@mui/icons-material";
import { AnswerContext } from "../../Context/AnswerContext";
import { verifyWord } from "./verifyWord";
import { options } from "../../Constants/data";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(() => ({
  keyButton: {
    margin: 2.5,
    width: 60,
  },
}));

function Key({ letter, type }) {
  const classes = useStyles();
  const {
    currentAnswer,
    setCurrentAnswer,
    previousAnswers,
    setPreviousAnswers,
    feedle,
  } = useContext(AnswerContext);

  const addLetter = () => {
    if (currentAnswer.toLowerCase() !== feedle || currentAnswer === "") {
      let newAnswer = `${currentAnswer}${letter}`;
      if (currentAnswer.length < 5) {
        setCurrentAnswer(newAnswer);
      }
    }
  };

  const removeLetter = () => {
    if (currentAnswer.toLowerCase() !== feedle || currentAnswer === "") {
      let newAnswer;
      if (currentAnswer.length > 0) {
        newAnswer = `${currentAnswer.trim().slice(0, -1)}`;
        setCurrentAnswer(newAnswer);
      }
    }
  };

  const checkWord = () => {
    if (
      currentAnswer.length == 5 &&
      options.words.includes(currentAnswer.toLowerCase())
    ) {
      let toSave = previousAnswers.find((res) => res.active === true);
      if (currentAnswer.toLowerCase() === feedle) {
        let pos = ["G", "G", "G", "G", "G"];
        previousAnswers[toSave.position] = {
          word: currentAnswer,
          active: false,
          position: toSave.position,
          placement: pos,
        };
        setPreviousAnswers(previousAnswers);
        setCurrentAnswer("");
      } else {
        previousAnswers[toSave.position] = {
          word: currentAnswer,
          active: false,
          position: toSave.position,
          placement: verifyWord(currentAnswer, feedle),
        };
        previousAnswers[toSave.position + 1] = {
          word: null,
          active: true,
          position: toSave.position + 1,
          placement: ["x", "x", "x", "x", "x"],
        };
        setPreviousAnswers(previousAnswers);
        setCurrentAnswer("");
      }
    } else {
      console.log("WORD NOT IN LIST");
    }
  };

  return type === "letter" ? (
    <Button
      className={classes.keyButton}
      variant="contained"
      onClick={() => {
        addLetter();
      }}
    >
      <Typography sx={{ fontSize: 20 }} align={"center"}>
        {letter}
      </Typography>
    </Button>
  ) : letter === "Enter" ? (
    <Button
      sx={{ width: "100%" }}
      variant="contained"
      onClick={() => {
        checkWord();
      }}
    >
      <CheckIcon />
    </Button>
  ) : (
    <Button
      sx={{ width: "100%" }}
      variant="contained"
      onClick={() => {
        removeLetter();
      }}
    >
      <DeleteIcon />
    </Button>
  );
}

export default Key;
