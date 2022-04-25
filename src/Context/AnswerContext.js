import React, { createContext, useState, useMemo, useEffect } from "react";
import { options } from "../Constants/data";
import { prevAnswers } from "../Constants/PreviousAnswers";
import { allRows } from "../Constants/Keyboard";
import { getIndexOfChar, verifyWord } from "../Utilities/verifyWord";

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

  const handleKey = (key) => {
    // console.log("IN CONTEXT: ", key)
    if(key.keyCode === 8){
      // Backspace
      if (currentAnswer.toLowerCase() !== feedle || currentAnswer === "") {
        let newAnswer;
        if (currentAnswer.length > 0) {
          newAnswer = `${currentAnswer.trim().slice(0, -1)}`;
          setCurrentAnswer(newAnswer);
          setPopup("");
        }
      }
    }
    if(key.keyCode === 13){
      // Enter
      checkWord();
    }
    if(key.keyCode < 91 && key.keyCode > 64 ){
      // Key
      if (currentAnswer.toLowerCase() !== feedle || currentAnswer === "") {
        let newAnswer = `${currentAnswer}${key.key.toUpperCase()}`;
        if (currentAnswer.length < 5) {
          setCurrentAnswer(newAnswer);
        }
      }
    }
  }

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

  useEffect(() => {
    let newWord = generateFeedle();
    setFeedle(newWord);
    // setFeedle("onion");
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
      handleKey
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
