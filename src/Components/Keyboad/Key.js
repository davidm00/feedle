import React, { useContext } from "react";
import { Button, Typography } from "@mui/material";
import {
  CheckRounded as CheckIcon,
  BackspaceRounded as DeleteIcon,
} from "@mui/icons-material";
import { makeStyles } from "@mui/styles";
import { AnswerContext } from "../../Context/AnswerContext";
import { verifyWord } from "./verifyWord";
import { options } from "../../Constants/data";

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
    // console.log("KeyCurrent Answer Before: ", currentAnswer);
    let newAnswer = `${currentAnswer}${letter}`;
    if (currentAnswer.length < 5) {
      setCurrentAnswer(newAnswer);
    }
    // console.log("KeyCurrent Answer After: ", currentAnswer);
  };

  const removeLetter = () => {
    let newAnswer;
    // console.log("KeyCurrent Answer Before: ", currentAnswer);
    if (currentAnswer.length > 0) {
      newAnswer = `${currentAnswer.trim().slice(0, -1)}`;
      setCurrentAnswer(newAnswer);
      //   console.log("KeyCurrent Answer After: ", currentAnswer);
    }
  };

  const checkWord = () => {
    if (currentAnswer.length == 5 && options.words.includes(currentAnswer.toLowerCase())) {
      console.log("FEEDLE: ", feedle);
      //TODO - first find if a letter in currentWord exists
      // in the target word. If so, find all occurences of
      // that letter in the word. If the index of a letter
      // in currentWord matches the index of the same letter
      // in  the target, mark that position as green. If the
      // letter is in currentWord and the target but indices
      // are different, then mark that position as yellow
      let toSave = previousAnswers.find((res) => res.active === true);
      console.log("VERIFY WORD: ", verifyWord(currentAnswer, feedle));
      if (currentAnswer.toLowerCase() === feedle) {
        let pos = ["G", "G", "G", "G", "G"];
        previousAnswers[toSave.position] = {
          word: currentAnswer,
          active: false,
          position: toSave.position,
          placement: pos,
        };
      } else {
        console.log("Find res: ", toSave);
        console.log("Position: ", toSave.position);
        console.log("Element to change: ", previousAnswers[toSave.position]);
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
        console.log("New Previous: ", previousAnswers);
        setPreviousAnswers(previousAnswers);
        setCurrentAnswer("");
      }
    } else {
      console.log(previousAnswers, setPreviousAnswers);
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
