import React, { useContext, useLayoutEffect } from "react";
import {
  Alert,
  Box,
  Button,
  Chip,
  Divider,
  Fade,
  Stack,
  Typography,
} from "@mui/material";
import { AnswerContext } from "../../Context/AnswerContext";
import { ReplayOutlined } from "@mui/icons-material";
import { options } from "../../Constants/data";

const PopUp = () => {
  const {
    popup,
    setCurrentAnswer,
    setPreviousAnswers,
    generateFeedle,
    setPopup,
    setFeedle,
    feedle,
    setKeys,
  } = useContext(AnswerContext);

  const reset = () => {
    setCurrentAnswer("");
    setPreviousAnswers([
      {
        word: "",
        active: true,
        position: 0,
        placement: ["x", "x", "x", "x", "x"],
      },
      {
        word: null,
        active: false,
        position: 1,
        placement: ["x", "x", "x", "x", "x"],
      },
      {
        word: null,
        active: false,
        position: 2,
        placement: ["x", "x", "x", "x", "x"],
      },
      {
        word: null,
        active: false,
        position: 3,
        placement: ["x", "x", "x", "x", "x"],
      },
      {
        word: null,
        active: false,
        position: 4,
        placement: ["x", "x", "x", "x", "x"],
      },
      {
        word: null,
        active: false,
        position: 5,
        placement: ["x", "x", "x", "x", "x"],
      },
    ]);
    setKeys({
      rows: [
        [
          {
            letter: "Q",
            type: "letter",
            status: "default",
          },
          {
            letter: "W",
            type: "letter",
            status: "default",
          },
          {
            letter: "E",
            type: "letter",
            status: "default",
          },
          {
            letter: "R",
            type: "letter",
            status: "default",
          },
          {
            letter: "T",
            type: "letter",
            status: "default",
          },
          {
            letter: "Y",
            type: "letter",
            status: "default",
          },
          {
            letter: "U",
            type: "letter",
            status: "default",
          },
          {
            letter: "I",
            type: "letter",
            status: "default",
          },
          {
            letter: "O",
            type: "letter",
            status: "default",
          },
          {
            letter: "P",
            type: "letter",
            status: "default",
          },
        ],
        [
          {
            letter: "A",
            type: "letter",
            status: "default",
          },
          {
            letter: "S",
            type: "letter",
            status: "default",
          },
          {
            letter: "D",
            type: "letter",
            status: "default",
          },
          {
            letter: "F",
            type: "letter",
            status: "default",
          },
          {
            letter: "G",
            type: "letter",
            status: "default",
          },
          {
            letter: "H",
            type: "letter",
            status: "default",
          },
          {
            letter: "J",
            type: "letter",
            status: "default",
          },
          {
            letter: "K",
            type: "letter",
            status: "default",
          },
          {
            letter: "L",
            type: "letter",
            status: "default",
          },
        ],
        [
          {
            letter: "Enter",
            type: "button",
          },
          {
            letter: "Z",
            type: "letter",
            status: "default",
          },
          {
            letter: "X",
            type: "letter",
            status: "default",
          },
          {
            letter: "C",
            type: "letter",
            status: "default",
          },
          {
            letter: "V",
            type: "letter",
            status: "default",
          },
          {
            letter: "B",
            type: "letter",
            status: "default",
          },
          {
            letter: "N",
            type: "letter",
            status: "default",
          },
          {
            letter: "M",
            type: "letter",
            status: "default",
          },
          {
            letter: "Backspace",
            type: "button",
          },
        ],
      ],
    });
    setFeedle(generateFeedle());
    setPopup("new");
  };

  useLayoutEffect(() => {
    if (popup === "short" || popup === "invalid") {
      const timeId = setTimeout(() => {
        // After 3 seconds set the show value to false
        setPopup("");
      }, 3000);

      return () => {
        clearTimeout(timeId);
      };
    }
  }, [popup]);

  if (popup === "short") {
    return (
      <Alert severity="error">
        <strong>Not enough letters!</strong> - try again!
      </Alert>
    );
  }

  if (popup === "invalid") {
    return (
      <Alert severity="error">
        <strong>Not in word list!</strong> - try again!
      </Alert>
    );
  }

  return popup === "error" ? (
    <>
      <Fade in={popup === "error"}>
        <Box
          sx={{
            position: "absolute",
            top: "20vh",
            right: "10vw",
            height: "20vw",
            width: "25ch",
            backgroundColor: "primary.light",
            borderRadius: 15,
            border: "solid 3px",
            borderColor: "primary.dark",
            padding: 3,
          }}
        >
          <Stack
            direction={"column"}
            justifyContent={"center"}
            alignItems={"center"}
            sx={{
              height: "100%",
            }}
            spacing={1}
          >
            <Divider>
              <Chip label="Feedle Fact" />
            </Divider>
            <Typography
              variant="body2"
              sx={{
                height: "100%",
                overflow: "scroll",
              }}
            >
              {options.history[feedle]}
            </Typography>
          </Stack>
        </Box>
      </Fade>
      <Alert
        severity="error"
        action={
          <Button
            onClick={() => {
              reset();
            }}
            color="inherit"
            size="small"
            endIcon={<ReplayOutlined />}
          >
            NEW GAME
          </Button>
        }
      >
        <strong>Wrong Answer!</strong> You did not guess the correct answer —
        try again! The word was: <strong>{feedle.toUpperCase()}</strong>
      </Alert>
    </>
  ) : popup === "success" ? (
    <>
      <Fade in={popup === "success"}>
        <Box
          sx={{
            position: "absolute",
            top: "20vh",
            right: "10vw",
            height: "20vw",
            width: "25ch",
            backgroundColor: "primary.light",
            borderRadius: 15,
            border: "solid 3px",
            borderColor: "primary.dark",
            padding: 3,
          }}
        >
          <Stack
            direction={"column"}
            justifyContent={"center"}
            alignItems={"center"}
            sx={{
              height: "100%",
            }}
            spacing={1}
          >
            <Divider>
              <Chip label="Feedle Fact" />
            </Divider>
            <Typography
              variant="body2"
              sx={{
                height: "100%",
                overflow: "scroll",
              }}
            >
              {options.history[feedle]}
            </Typography>
          </Stack>
        </Box>
      </Fade>
      <Alert
        severity="success"
        action={
          <Button
            onClick={() => {
              reset();
            }}
            color="inherit"
            size="small"
            endIcon={<ReplayOutlined />}
          >
            NEW GAME
          </Button>
        }
      >
        <strong>Correct Answer!</strong> You guessed the correct answer — play
        again! The word was: <strong>{feedle.toUpperCase()}</strong>
      </Alert>
    </>
  ) : (
    ""
  );
};

export default PopUp;
