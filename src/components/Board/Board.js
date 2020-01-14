import React from 'react';
import './Board.css';

const board = [
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0]
]


function Board() {
  return (
    <div className="board">
        {
            board.map((v, k) => 
                <div key={k} className="row">
                    {
                        v.map((element, ek) =>
                            <div key={ek} className={(ek % 2 ^ (k+1) % 2) ? "cream block": "brown block"}>
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
