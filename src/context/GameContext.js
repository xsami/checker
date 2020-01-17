import React, { createContext, useState } from "react";
import { getNewBoard } from "../utilities/helpers";

export const Context = createContext({});

export const Provider = props => {
    
  const {
    board: initialBoard,
    children
  } = props;

  const [board, setBoard] = useState(initialBoard);
  const [selectedPiece, setSelectedPiece] = useState({});

  const setPiece = pieceProps => {
      setSelectedPiece(pieceProps);
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
