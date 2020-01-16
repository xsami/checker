import React, { useContext } from 'react';
import './Config.css';
import { GameContext } from '../../context';
import { getNewBoard, getPossibleMoves } from '../../utilities/helpers';

function CleanMoves(arr) {
  return (
    <ul>
      {
          arr.map((value, index) => (
          <li key={index}>You can move to position: [{value.x}, {value.y}]</li>))
      }
    </ul>
  )
}

function Config() {

    const {board, setBoard, selectedPiece} = useContext(GameContext);
    const { data } = selectedPiece;
    const flagDetails = data !== undefined && data.state ? <code>Possible moves<br />{CleanMoves(getPossibleMoves(data, board))} </code> : <div></div>
    return (
      <div className="config inline">
          
          <div className="header">
            <h1>Checkers</h1>
            <code>Made by: xsami</code>
            <button className="play" onClick={() => setBoard(getNewBoard(board))}>
                Start
            </button>
          </div>
          
          <div className="details">
              <h2>Details</h2>
              {flagDetails}
          </div>
      </div>
    );
  }
  
  export default Config;