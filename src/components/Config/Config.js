import React, { useContext } from 'react';
import './Config.css';
import { GameContext } from '../../context';
import { getNewBoard } from '../../utilities/helpers';


function Config() {

    const {board, setBoard, selectedPiece} = useContext(GameContext);
    
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
              {
                selectedPiece.state ? <code>Possible moves</code> : <div>something</div>
              }
          </div>
      </div>
    );
  }
  
  export default Config;