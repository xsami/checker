import React, { useContext } from 'react';
import './Board.css';
import { GameContext } from '../../context';
import Piece from '../Piece/Piece';
import { Position, Piece as PObj, validateNewPiecePosition } from '../../utilities/helpers';

function Board() {

  const gameContext = useContext(GameContext);

  const { board, selectedPiece, updateBoard } = gameContext;

  // Logic to validate and if its true, perform the move    
  const tryToMovePiece = newpos => {

    if (!validateNewPiecePosition(selectedPiece, newpos, board)) {
        return;
    }

    const newBoard = board;
    newBoard[newpos.x][newpos.y] = new PObj(selectedPiece.color, selectedPiece.state, newpos);
    // TODO: if is jumping remove the previus piece

    
    // Then update the board
    updateBoard(newBoard);
  };

  return (
    <div className="board inline">
        {
            board.map((v, k) => 
                <div key={k} className="row">
                    {
                        v.map((element, ek) =>
                            <div key={ek} 
                                className={(ek % 2 ^ (k+1) % 2) ? "cream block": "brown block"}
                                onClick={() => tryToMovePiece(new Position(k, ek))}>
                                <Piece data={element}></Piece>
                            </div>
                        )
                    }            
                </div>
            )
        }
    </div>
  );
}

export default Board;
