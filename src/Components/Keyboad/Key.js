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
  default: {
    color: "white",
    backgroundColor: "#808384",
    "&:hover": {
      backgroundColor: "rgba(0, 0, 0, 0.26)",
    },
  },
  contained: {
    color: "white",
    backgroundColor: "#CAB457",
    "&:hover": {
      backgroundColor: "#baa33b",
    },
  },
  correct: {
    color: "white",
    backgroundColor: "#6AA965",
    "&:hover": {
      backgroundColor: "#4d8349",
    },
  },
  incorrect: {
    color: "white",
    backgroundColor: "#414344",
    "&:hover": {
      backgroundColor: "#5c5f60",
    },
  },
}));

function Key({ letter, type, status }) {
  const classes = useStyles();
  const {
    currentAnswer,
    setCurrentAnswer,
    previousAnswers,
    setPreviousAnswers,
    feedle,
    setPopup,
    generateKeys,
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
        setPopup("");
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
        // console.log("CORRECT");
        let pos = ["G", "G", "G", "G", "G"];
        previousAnswers[toSave.position] = {
          word: currentAnswer,
          active: false,
          position: toSave.position,
          placement: pos,
        };
        generateKeys();
        setPreviousAnswers(previousAnswers);
        setCurrentAnswer("");
        setPopup("success");
      } else {
        // console.log("CONFIREMD WORD");
        previousAnswers[toSave.position] = {
          word: currentAnswer,
          active: false,
          position: toSave.position,
          placement: verifyWord(currentAnswer, feedle),
        };

        if (previousAnswers[toSave.position].position < 5) {
          previousAnswers[toSave.position + 1] = {
            word: null,
            active: true,
            position: toSave.position + 1,
            placement: ["x", "x", "x", "x", "x"],
          };
        } else {
          // console.log("NO MORE GUESS ATTEMPTS");
          setPopup("error");
        }
        generateKeys();
        setPreviousAnswers(previousAnswers);
        setCurrentAnswer("");
      }
    } else if (currentAnswer.length < 5) {
      // console.log("TOO SHORT");
      setPopup("short");
    } else {
      // console.log("WORD NOT IN LIST");
      setPopup("invalid");
    }
  };

  return type === "letter" ? (
    <Button
      className={`${classes.keyButton} ${
        status === "default"
          ? classes.default
          : status === "correct"
          ? classes.correct
          : status === "contained"
          ? classes.contained
          : classes.incorrect
      }`}
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
      className={classes.default}
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
      className={classes.default}
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
