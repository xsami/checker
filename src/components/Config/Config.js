import React, { useContext } from 'react';
import './Config.css';
import { GameContext } from '../../context';

function Position(x=0, y=0) {
    this.x = x;
    this.y = y;
}

function Piece(color='', state=false, moves=[], jumps=[], position={}) {
    this.color = color;
    this.state = state;
    this.moves = moves;
    this.jumps = jumps;
    this.position = position;
}

function getNewBoard(initialBoard){

    const newBoard = [];

    for (let i = 0; i < initialBoard.length; i++) {
        const newRow = [...initialBoard[i]];
        
        for (let j = 0; j < newRow.length; j++) {
            const state = !(j % 2 ^ (i+1) % 2); // state 
            const color = (i < 3) ? 'white' : ((i > 4) ? 'red' : ''); // color
            newRow[j] = new Piece(color, state, [], [], new Position(i, j));
        }
        newBoard.push(newRow);
    }

    return newBoard;
}

function Config() {
    const gameContext = useContext(GameContext);

    const {board, setBoard } = gameContext;

    return (
      <div className="config inline">
          <h1>Checkers</h1>
          <code>Made by: xsami</code>
          <button className="play" onClick={() => setBoard(getNewBoard(board))}>
              Start
          </button>
      </div>
    );
  }
  
  export default Config;