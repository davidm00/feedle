import React, { createContext, useState, useMemo, useEffect } from "react";
import { options } from "../Constants/data";
import { prevAnswers } from "../Constants/PreviousAnswers";
import { allRows } from "../Constants/Keyboard";
import { getIndexOfChar } from "../Components/Keyboad/verifyWord";

// create context
const AnswerContext = createContext();

// initial states
const initPrevAnswers = prevAnswers;
const initKeys = allRows;

const AnswerContextProvider = ({ children }) => {
  // the value that will be given to the context
  const [currentAnswer, setCurrentAnswer] = useState("");
  const [previousAnswers, setPreviousAnswers] = useState(initPrevAnswers);
  const [feedle, setFeedle] = useState("");
  const [popup, setPopup] = useState("new");
  const [keys, setKeys] = useState(initKeys);

  const generateKeys = () => {
    // console.log("Current Answer: ", currentAnswer);
    let temp = keys;
    // console.log("temp: ", temp);

    [...currentAnswer].map((letter, curIndex) => {
      //get index of row (0, 1, 2)
      let rowIdx = temp.rows
        .map((row, index) => {
          if (row.some((item) => item.letter === letter)) {
            return index;
          }
        })
        .filter((e) => e != undefined)[0];
      // console.log("Row IDX: ", rowIdx);
      // console.log("temp.rows[rowIdx]: ", temp.rows[rowIdx]);

      let letterIdx = temp.rows[rowIdx].findIndex(
        (elem) => elem === temp.rows[rowIdx].find((e) => e.letter === letter)
      );
      // console.log("Letter IDX: ", letterIdx);
      // console.log("Row: ", temp.rows[rowIdx]);
      // console.log("Letter in row: ", temp.rows[rowIdx][letterIdx]);

      // console.log("curIndex: ", curIndex);
      // console.log("Letter: ", letter.toLowerCase());
      // console.log("feedle in array: ", [...feedle])
      // console.log(
      //   "feedle index of current letter: ",
      //   [...feedle].findIndex((fLetter) => fLetter === letter.toLowerCase())
      // );
      // console.log(
      //   "First condition: ",
      //   curIndex === [...feedle].findIndex((fLetter) => fLetter === letter.toLowerCase())
      // );
      // console.log("target positions: ", getIndexOfChar(feedle, letter));
      // console.log(
        // "New first condition: ",
        // getIndexOfChar(feedle, letter).includes(curIndex)
      // );
      // console.log(
        // "Second condition: ",
        // feedle.includes(temp.rows[rowIdx][letterIdx].letter.toLowerCase())
      // );

      // console.log(
        // "Result of first and second condition: ",
        // getIndexOfChar(feedle, letter).includes(curIndex) &&
          // feedle.includes(temp.rows[rowIdx][letterIdx].letter.toLowerCase())
      // );

      if (
        getIndexOfChar(feedle, letter).includes(curIndex) &&
        feedle.includes(temp.rows[rowIdx][letterIdx].letter.toLowerCase())
      ) {
        temp.rows[rowIdx][letterIdx] = {
          letter: letter,
          type: "letter",
          status: "correct",
        };
        // console.log("Correct New Row: ", temp.rows[rowIdx][letterIdx]);
      } else if (
        feedle.includes(temp.rows[rowIdx][letterIdx].letter.toLowerCase()) &&
        temp.rows[rowIdx][letterIdx].status != "correct"
      ) {
        temp.rows[rowIdx][letterIdx] = {
          letter: letter,
          type: "letter",
          status: "contained",
        };
        // console.log("Contains New Row: ", temp.rows[rowIdx][letterIdx]);
      } else if(temp.rows[rowIdx][letterIdx].status === "default") {
        temp.rows[rowIdx][letterIdx] = {
          letter: letter,
          type: "letter",
          status: "incorrect",
        };
      }
      // console.log(" ");
      // console.log(" ");
      // console.log(" ");
    });
    // console.log("Keys: ", keys);
    setKeys(temp);
  };

  const generateFeedle = () => {
    const random = Math.floor(Math.random() * options.words.length);
    console.log("Feedle: ", options.words[random]);
    return options.words[random];
  };

  useEffect(() => {
    let newWord = generateFeedle();
    setFeedle(newWord);
    setFeedle("onion");
  }, []);

  const providerValue = useMemo(
    () => ({
      currentAnswer,
      setCurrentAnswer,
      previousAnswers,
      setPreviousAnswers,
      feedle,
      setFeedle,
      popup,
      setPopup,
      generateFeedle,
      keys,
      generateKeys,
      setKeys,
    }),
    [currentAnswer, previousAnswers, feedle, popup, keys]
  );

  return (
    // the Provider gives access to the context to its children
    <AnswerContext.Provider value={providerValue}>
      {children}
    </AnswerContext.Provider>
  );
};

export { AnswerContextProvider, AnswerContext };
