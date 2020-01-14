import React from 'react';
import './Piece.css';

const Piece = props => {
    const color = props.data.color ? props.data.color: '';
    
    return (
        <div className={color}>
        </div>
    );
}

export default Piece;