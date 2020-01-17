import React, { useContext } from 'react';
import './Config.css';
import { GameContext } from '../../context';
import { getPossibleMoves, getPossibleJumps } from '../../utilities/helpers';

function CleanMoves(arr) {
  return (
    <ul>
      {
          arr.map((value, index) => (
              <li key={index}>
              You can move to position: [{value.x}, {value.y}]
              </li>
            ))
      }
    </ul>
  )
}

function Config() {

    const {board, selectedPiece, resetGame} = useContext(GameContext);
    const { data } = selectedPiece;
    const flagDetails = data !== undefined && data.state ? 
      <div>
        <code>Possible moves<br />{CleanMoves(getPossibleMoves(data, board))} </code>
        <code>Possible jumps<br />{CleanMoves(getPossibleJumps(data, board))} </code>
      </div>
      : <div></div>;

    return (
      <div className="config inline">
          
          <div className="header">
            <div className="title">Checkers</div>
            <div className='madeby'>Made by: xsami</div>
            <div className="play-button">
              <button className="btn"
                      onClick={() => resetGame(board) }>
                PLAY
              </button>
            </div>
          </div>
          
          <div className="details">
              <h2>Details</h2>
              {flagDetails}
          </div>
      </div>
    );
  }
  
  export default Config;