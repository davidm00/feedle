
import React from 'react';

import { Box } from "@mui/material";
import Navbar from "./Common/Navbar";
import Game from "./Components/Game/Game";
import { AnswerContextProvider } from "./Context/AnswerContext";

function App() {
  return (
    <Box width={"100%"} height={"100%"} className="App">
      <AnswerContextProvider>
      <Navbar />
        <Box component={"div"}>
          <Game />
        </Box>
      </AnswerContextProvider>
    </Box>
  );
}

export default App;
