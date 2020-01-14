import React, { useContext } from 'react';
import './Board.css';
import { GameContext } from '../../context';
import Piece from '../Piece/Piece';


function Board() {

  const gameContext = useContext(GameContext);

  const { board } = gameContext;

  return (
    <div className="board inline">
        {
            board.map((v, k) => 
                <div key={k} className="row">
                    {
                        v.map((element, ek) =>
                            <div key={ek} className={(ek % 2 ^ (k+1) % 2) ? "cream block": "brown block"}>
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
