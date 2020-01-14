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
    const whitePiece = new Piece('white', true, [], [], new Position());
    const redPiece = new Piece('red', true, [], [], new Position());
    const newBoard = [];

    for (let i = 0; i < initialBoard.length; i++) {
        const row = initialBoard[i];
        const newRow = [...row];
        for (let j = 0; j < row.length; j++) {
            let element = new Piece();
            const decition = !(j % 2 ^ (i+1) % 2); // dark position
            if (i < 3 && decition) {
                // whites
                element = whitePiece;
                element.position = new Position(i, j);
            } else if (i > 4 && decition) {
                // reds
                element = redPiece;
                element.position = new Position(i, j);
            }
            newRow[j] = element;
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