import React, { useContext } from 'react';
import { GameContext } from '../../context';
import './Piece.css';

const Piece = props => {
    let color = props.data.color && props.data.state ? props.data.color: '';
    const { setPiece } = useContext(GameContext);

    const ClickPiece = () => {
        console.log(props);
        return setPiece(props);
    }
    return (
        <div className={color} 
             onClick={() => ClickPiece()}>
        </div>
    );
}

export default Piece;