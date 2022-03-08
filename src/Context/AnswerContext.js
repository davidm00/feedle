import React, { createContext, useState, useMemo, useEffect } from "react";
import { options } from "../Constants/data";

// create context
const AnswerContext = createContext();

const AnswerContextProvider = ({ children }) => {
  // the value that will be given to the context
  const [feedle, setFeedle] = useState('')
  const [currentAnswer, setCurrentAnswer] = useState("");
  const [previousAnswers, setPreviousAnswers] = useState([
    {
      word: "EIGHT",
      active: false,
      position: 0,
      placement: ['x', 'x', 'x', 'x', 'x']
    },
    {
      word: null,
      active: true,
      position: 1,
      placement: ['x', 'x', 'x', 'x', 'x']
    },
    {
      word: null,
      active: false,
      position: 2,
      placement: ['x', 'x', 'x', 'x', 'x']
    },
    {
      word: null,
      active: false,
      position: 3,
      placement: ['x', 'x', 'x', 'x', 'x']
    },
    {
      word: null,
      active: false,
      position: 4,
      placement: ['x', 'x', 'x', 'x', 'x']
    },
    {
      word: null,
      active: false,
      position: 5,
      placement: ['x', 'x', 'x', 'x', 'x']
    },
  ]);

  useEffect(() => {
    const random = Math.floor(Math.random() * options.words.length);
    // setFeedle(options.words[random])
    setFeedle("asdfa")
    console.log("Feedle: ", options.words[random]);
  }, [])

  const providerValue = useMemo(
    () => ({
      currentAnswer,
      setCurrentAnswer,
      previousAnswers,
      setPreviousAnswers,
      feedle
    }),
    [currentAnswer, previousAnswers]
  );

  return (
    // the Provider gives access to the context to its children
    <AnswerContext.Provider value={providerValue}>
      {children}
    </AnswerContext.Provider>
  );
};

export { AnswerContextProvider, AnswerContext };
