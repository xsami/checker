import React, { createContext, useState } from 'react';
import { getNewBoard } from '../utilities/helpers';

export const Context = createContext({});

export const Provider = props => {
    
  const {
    board: initialBoard,
    children
  } = props;

  const [board, setBoard] = useState(initialBoard);
  const [selectedPiece, setSelectedPiece] = useState({});

  const getNewBoardStatus = (brd, status) => {
    for (let i = 0; i < brd.length; i++) {
      const row = brd[i];
      for (let j = 0; j < row.length; j++) {
        row[j].state = status;
      }
    }
    return brd;
  };

  const setPiece = pieceProps => {
      
    const newBoard = getNewBoardStatus(board, false);
    pieceProps.state = true; // Be sure to do this after getting the new board (factor order of course matters)
    newBoard[pieceProps.position.x][pieceProps.position.y] = pieceProps;


    setSelectedPiece(pieceProps);
    setBoard(newBoard);
  };

  const resetGame = cBoard => {
    setSelectedPiece({});
    setBoard(getNewBoard(cBoard));
  };

  const updateBoard = newBoard => {
    setBoard(newBoard);
    setSelectedPiece({});
  };

  const gameContext = {
    board,
    setBoard,
    selectedPiece,
    setSelectedPiece,
    setPiece,
    resetGame,
    updateBoard
  };

  return <Context.Provider value={gameContext}>{children}</Context.Provider>;
};

export const { Consumer } = Context;
