import React, { useContext } from 'react';
import './Config.css';
import { GameContext } from '../../context';
import { getPossibleMoves } from '../../utilities/helpers';

function CleanMoves(arr) {
  return (
    <ul>
      {
          arr.map((value, index) => (
              <li key={index}>
              You can move to position: [{value.x + 1}, {value.y + 1}]
              </li>
            ))
      }
    </ul>
  )
}

function Config() {

    const {board, selectedPiece, resetGame} = useContext(GameContext);
    const { data } = selectedPiece;
    const flagDetails = data !== undefined && data.state ? <code>Possible moves<br />{CleanMoves(getPossibleMoves(data, board))} </code> : <div></div>
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