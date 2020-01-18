import React, { useContext } from 'react';
import './Board.css';
import { GameContext } from '../../context';
import Piece from '../Piece/Piece';
import { Position, Piece as PObj, validateNewPiecePosition, MAX_RANGE_JUMP, validateJump, WHITE} from '../../utilities/helpers';

function Board() {

  const gameContext = useContext(GameContext);

  const { board, selectedPiece, updateBoard } = gameContext;
  // Logic to validate and if its true, perform the move    
  const tryToMovePiece = newpos => {
 
    const currentPiece = selectedPiece;
    // Validate that there's a piece selected
    if (!currentPiece.position) {
        return;
    }

    if (!validateNewPiecePosition(currentPiece, newpos, board)) {
        return;
    }

    const { color, position } = currentPiece;
    const newBoard = board;
    const diffx = Math.abs(currentPiece.position.x - newpos.x);
    const xFactor = currentPiece.color === WHITE ? -1 : 1;
    const yFactor = currentPiece.position.y > newpos.y ? 1: -1;

    newBoard[position.x][position.y] = new PObj('', false, position);
    newBoard[newpos.x][newpos.y] = new PObj(color, false, newpos);
    
    // If it's jumping remove the previus piece
    if (diffx === MAX_RANGE_JUMP &&  validateJump(currentPiece, newpos, board)) {

        newBoard[newpos.x + xFactor][newpos.y + yFactor] = new PObj('', false, 
            new Position(newpos.x + xFactor, newpos.y + yFactor));
    }
    
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
