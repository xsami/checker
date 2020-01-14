import React, { createContext, useState } from "react";

export const Context = createContext({});

export const Provider = props => {
    
  const {
    board: initialBoard,
    children
  } = props;

  const [board, setBoard] = useState(initialBoard);

  const gameContext = {
    board,
    setBoard
  };

  return <Context.Provider value={gameContext}>{children}</Context.Provider>;
};

export const { Consumer } = Context;
