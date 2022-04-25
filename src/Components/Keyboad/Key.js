import React, { useContext } from "react";
// import { Button, Typography } from "@mui/material";
import { Button, IconButton, Typography } from "@mui/material";
import {
  CheckRounded as CheckIcon,
  BackspaceRounded as DeleteIcon,
} from "@mui/icons-material";
import { AnswerContext } from "../../Context/AnswerContext";
import { verifyWord } from "../../Utilities/verifyWord";
import { options } from "../../Constants/data";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(() => ({
  default: {
    color: "white",
    backgroundColor: "#808384",
    "&:hover": {
      backgroundColor: "rgba(0, 0, 0, 0.26)",
    },
    ["@media screen and (max-width:780px)"]: {
      width: 30,
      marginTop: 2.5,
    },
  },
  desktopDefault: {
    ["@media screen and (max-width:780px)"]: {
      display: "none",
    },
  },
  mobileDefault: {
    color: "white",
    backgroundColor: "#808384",
    width: 30,
    marginTop: 2.5,
    "&:hover": {
      backgroundColor: "rgba(0, 0, 0, 0.26)",
    },
    ["@media screen and (min-width:782px)"]: {
      display: "none",
    },
  },
  icon: {
    ["@media screen and (max-width:780px)"]: {
      fontSize: 16,
    },
  },
  keyButton: {
    margin: 2.5,
    width: 20,
    ["@media screen and (max-width:780px)"]: {
      display: "none",
    },
  },
  mobileKeyButton: {
    margin: 0,
    marginTop: 2.5,
    ["@media screen and (min-width:782px)"]: {
      display: "none",
    },
  },
  contained: {
    color: "white",
    backgroundColor: "#CAB457",
    "&:hover": {
      backgroundColor: "#baa33b",
    },
    ["@media screen and (max-width:780px)"]: {
      width: 30,
      marginTop: 2.5,
    },
  },
  correct: {
    color: "white",
    backgroundColor: "#6AA965",
    "&:hover": {
      backgroundColor: "#4d8349",
    },
    ["@media screen and (max-width:780px)"]: {
      width: 30,
      marginTop: 2.5,
    },
  },
  incorrect: {
    color: "white",
    backgroundColor: "#414344",
    "&:hover": {
      backgroundColor: "#5c5f60",
    },
    ["@media screen and (max-width:780px)"]: {
      width: 30,
      marginTop: 2.5,
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
    // key,
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
    <>
      <Button
        className={`${classes.keyButton} ${
          status === "default"
            ? classes.default
            : status === "correct"
            ? classes.correct
            : status === "contained"
            ? classes.contained
            : classes.incorrect
        } ${status === "default" ? classes.defaultMobile : ""}`}
        size="small"
        // variant="contained"
        onClick={() => {
          addLetter();
        }}
      >
        <Typography
          className={classes.keyLetter}
          sx={{ fontSize: 20 }}
          align={"center"}
        >
          {letter}
        </Typography>
      </Button>
      <IconButton
        className={`${classes.mobileKeyButton} ${
          status === "default"
            ? classes.default
            : status === "correct"
            ? classes.correct
            : status === "contained"
            ? classes.contained
            : classes.incorrect
        }`}
        size="small"
        // variant="contained"
        onClick={() => {
          addLetter();
        }}
      >
        <Typography
          className={classes.keyLetter}
          // sx={{ fontSize: 20 }}
          align={"center"}
        >
          {letter}
        </Typography>
      </IconButton>
    </>
  ) : letter === "Enter" ? (
    <>
      <Button
        className={`${classes.default} ${classes.desktopDefault}`}
        variant="contained"
        onClick={() => {
          checkWord();
        }}
      >
        <CheckIcon className={classes.icon} />
      </Button>
      <IconButton
        className={classes.mobileDefault}
        onClick={() => {
          checkWord();
        }}
      >
        <CheckIcon className={classes.icon} />
      </IconButton>
    </>
  ) : (
    <>
      <Button
        className={`${classes.default} ${classes.desktopDefault}`}
        variant="contained"
        onClick={() => {
          removeLetter();
        }}
      >
        <DeleteIcon className={classes.icon} />
      </Button>
      <IconButton
        className={classes.mobileDefault}
        onClick={() => {
          removeLetter();
        }}
      >
        <DeleteIcon className={classes.icon} />
      </IconButton>
    </>
  );
}

export default Key;
