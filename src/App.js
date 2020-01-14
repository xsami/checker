import React from 'react';
import './App.css';
import Board from './components/Board/Board';
import Config from './components/Config/Config';
import { GameContextProvider } from './context';

function App() {
  const board = [
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0]
  ]; 
  return (
    
    <div className="App">
      <GameContextProvider board={board}>
      <Config></Config>
      <Board></Board>
      </GameContextProvider>
    </div>
  );
}

export default App;
