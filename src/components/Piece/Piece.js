import React, { useContext } from 'react';
import { GameContext } from '../../context';
import './Piece.css';

const Piece = props => {
    const { data } = props; 
    const { color, state } = data;

    const { setPiece } = useContext(GameContext);
    
    return (
        <div className={`${color} ${state}`} 
             onClick={() => setPiece(props.data)}>
        </div>
    );
}

export default Piece;