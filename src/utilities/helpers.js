/**
 * 
 * @param {integer} x 
 * @param {integer} y
 * 
 * Position data structure 
 */
export const Position = function(x=0, y=0) {
    this.x = x;
    this.y = y;
};

/**
 * 
 * @param {string} color 
 * @param {boolean} state 
 * @param {array} moves 
 * @param {array} jumps 
 * @param {Position object} position 
 * 
 * Piece data structure
 */
export const Piece = function(color='', state=false, moves=[], jumps=[], position={}) {
    this.color = color;
    this.state = state;
    this.moves = moves;
    this.jumps = jumps;
    this.position = position;
};

/**
 * 
 * @param {matriz} initialBoard 
 * Return a new board
 */
export const getNewBoard = function(initialBoard){

    const newBoard = [];

    for (let i = 0; i < initialBoard.length; i++) {
        const newRow = [...initialBoard[i]];
        
        for (let j = 0; j < newRow.length; j++) {
            const state = !(j % 2 ^ (i+1) % 2); // state 
            const color = (i < 3) ? 'white' : ((i > 4) ? 'red' : ''); // color
            newRow[j] = new Piece(color, state, [], [], new Position(i, j));
        }
        newBoard.push(newRow);
    }

    return newBoard;
};


export const getPossibleMoves = function(piece, board) {
    return '<div>yes</div>'
}