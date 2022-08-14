import React from 'react';
import './App.css';
import {Main} from "./pages/Main";
import {BoardProvider} from "./contexts/BoardContext";

function App() {
  return (
      <div className="App">
          <BoardProvider>
              <Main />
          </BoardProvider>
      </div>
  );
}

export default App;
