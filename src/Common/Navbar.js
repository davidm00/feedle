import React, { useContext } from "react";
import {
  Box,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  DialogContentText,
  DialogContent,
  DialogTitle,
  Dialog,
  Stack,
} from "@mui/material";
import { Close, Fastfood, QuestionMark } from "@mui/icons-material";
import { AnswerContext } from "../Context/AnswerContext";
import WordInput from "../Components/Board/WordInput/WordInput";
import { isRight, isWrong, isClose } from "../Constants/Keyboard.js";

const Navbar = () => {
  const { handleKey } = useContext(AnswerContext);
  const [open, setOpen] = React.useState(true);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box
      sx={{ flexGrow: 1, textAlign: "center", width: "100vw" }}
      onKeyDown={(e) => handleKey(e)}
    >
      <AppBar
        position="static"
        sx={{ flexGrow: 1, textAlign: "center", width: "100vw" }}
      >
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{
              mr: 2,
              "&:hover": {
                cursor: "default",
              },
            }}
            disableTouchRipple
            disableFocusRipple
            disableRipple
          >
            <Fastfood />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Feedle
          </Typography>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 0 }}
            onClick={handleOpen}
          >
            <QuestionMark />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"How To Play?"}{" "}
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <Close />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <DialogContentText component={"div"} id="alert-dialog-description">
            <Stack
              direction={"column"}
              justifyContent={"center"}
              alignItems={"start"}
            >
              <Typography component={"p"} variant={"body1"}>
                {"Guess the "}
                <strong>FEEDLE</strong>
                {" in six tries."}
              </Typography>
              <Typography component={"p"} variant={"body1"}>
                {
                  "Each guess must be a valid five-letter word. Press enter or click the check button to submit."
                }
              </Typography>
              <Typography component={"p"} variant={"body1"}>
                {
                  "After each guess, the color of the tiles will change to show how close your guess was to the word."
                }
              </Typography>
              <Box mt={2} pt={1} sx={{ borderTop: "solid 1px", width: "100%" }}>
                <Typography variant={"h6"} sx={{ color: "text.primary" }}>
                  <strong>Examples</strong>
                </Typography>
                <Stack
                  direction={"column"}
                  justifyContent={"center"}
                  alignItems={"start"}
                >
                  {["BREAD", "SALAD", "ONION"].map((word, idx) => {
                    return (
                      <Stack
                        key={idx}
                        direction={"column"}
                        justifyContent={"center"}
                        alignItems={"start"}
                        spacing={1.5}
                      >
                        <WordInput
                          status={null}
                          word={word}
                          placement={
                            word === "BREAD"
                              ? isRight
                              : word === "SALAD"
                              ? isClose
                              : isWrong
                          }
                        />
                        {word === "BREAD" ? (
                          <Typography>
                            The letter <strong>B</strong> is in the word and in the correct spot.
                          </Typography>
                        ) : word === "SALAD" ? (
                          <Typography>
                            The letter <strong>A</strong> is in the word but in the wrong spot.
                          </Typography>
                        ) : (
                          <Typography>
                            <strong>None</strong> of the letters are in the word in any spot.
                          </Typography>
                        )}
                      </Stack>
                    );
                  })}
                </Stack>
              </Box>
              <Box mt={2} pt={1} sx={{ borderTop: "solid 1px", width: "100%" }}>
                <Typography variant="h5" color={"error"}>
                  ** WARNING **
                </Typography>
                <Typography variant="body1" color={"error"}>
                  If more than one letter appears when you type using your
                  keyboard, simply press one of the on screen keys to correct
                  this behavior.
                </Typography>
              </Box>
            </Stack>
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default Navbar;
