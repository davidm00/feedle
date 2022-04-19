import React from "react";
import Navbar from "./Common/Navbar";
import Game from "./Components/Game/Game";
import { AnswerContextProvider } from "./Context/AnswerContext";

function App() {
  
  return (
    <div className="App">
      <Navbar />
      <AnswerContextProvider>
        <Game />
      </AnswerContextProvider>
    </div>
  );
}

export default App;
