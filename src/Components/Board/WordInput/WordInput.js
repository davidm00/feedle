import React, {useContext, useLayoutEffect, useState} from "react";
import { FormControl, OutlinedInput } from "@mui/material";
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
  },
}));

const WordInput = ({ status, word }) => {
  const classes = useStyles();
  const {currentAnswer, previousAnswers} = useContext(AnswerContext)
  const [activeWord, setActiveWord] = useState('')
  // console.log(word);

  useLayoutEffect(() => {
    setActiveWord('')
    if(currentAnswer.length < 5){
      let offset = 5 - currentAnswer.length;
      let newWord = `${currentAnswer}${Array(offset).fill('\xa0').join('')}`
      // console.log('New word: ', newWord)
      // console.log('New word length: ', newWord.length)
      setActiveWord(newWord)
    }
    if(currentAnswer.length == 5){
      setActiveWord(currentAnswer)
    }
  }, [currentAnswer, previousAnswers])


  return status ? (
    // Current guess
    <div className={classes.wordContainer} sx={{ flexFlow: 1 }}>
      {activeWord.split('').map((letter, index) => {
        return (
          <FormControl
            className={classes.letterBox}
            key={index}
            variant="outlined"
          >
            <OutlinedInput
              value={letter}
              // onChange={handleChange('weight')}
              aria-describedby="outlined-weight-helper-text"
              inputProps={{
                "aria-label": "letter box",
              }}
            />
          </FormControl>
        );
      })}
    </div>
  ) : word ? (
    // Incorrect but confirmed guess
    <div className={classes.wordContainer} sx={{ flexFlow: 1 }}>
      {word.split('').map((letter, index) => {
        return (
          <FormControl className={classes.letterBox} key={index} variant="outlined">
            <OutlinedInput
              disabled
              value={letter}
              aria-describedby="outlined-weight-helper-text"
              inputProps={{
                "aria-label": "letter box",
              }}
            />
          </FormControl>
        );
      })}
    </div>
  ): (
    // Inactive fields
    <div className={classes.wordContainer} sx={{ flexFlow: 1 }}>
      {[1, 2, 3, 4, 5].map((index) => {
        return (
          <FormControl className={classes.letterBox} key={index} variant="outlined">
            <OutlinedInput
              disabled
              value={''}
              // onChange={handleChange('weight')}
              aria-describedby="outlined-weight-helper-text"
              inputProps={{
                "aria-label": "letter box",
              }}
            />
          </FormControl>
        );
      })}
    </div>
  );
};

export default WordInput;
