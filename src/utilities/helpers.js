// memoBoard is a representation of caching (memoization, dynamic programming)
// wil be used to check the already visited positions
let memoBoard;
// contains the moves in a matrix
let moves;
// contains the jumps in a matrix
let jumps;

// constant COLORS
const RED = 'red';
const WHITE = 'white';

/**
 * 
 * @param {integer} x represents the heigth
 * @param {integer} y represents the width
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
 * @param {Position} position 
 * 
 * Piece data structure
 */
export const Piece = function(color='', state=false, position={}) {
    this.color = color;
    this.state = state;
    this.position = position;
};

/**
 * 
 * @param {matrix} initialBoard 
 * Return a new board
 */
export const getNewBoard = function(initialBoard){

    const newBoard = [];

    for (let i = 0; i < initialBoard.length; i++) {
        const newRow = [...initialBoard[i]];
        
        for (let j = 0; j < newRow.length; j++) {
            const state = !(j % 2 ^ (i+1) % 2); // state 
            const color = (i < 3) ? WHITE : ((i > 4) ? RED : ''); // color
            newRow[j] = new Piece(color, state, new Position(i, j));
        }
        newBoard.push(newRow);
    }

    return newBoard;
};

/**
 * 
 * @param {matrix} toClone 
 * @param {any} value 
 * 
 * Creates a copy of a matrix and return this matrix
 */
const cloneMatrix = function(toClone, value) {
    const mtxCopy = [];
    const newArr = [];

    for (let i = 0; i < toClone.length; i++) {
        newArr.push(value);
    }

    for (let i = 0; i < toClone.length; i++) {    
        mtxCopy.push([...newArr]);
    }

    return mtxCopy;
};

/**
 * 
 * @param {integer} xFactor This is the up or down direction
 * @param {Position} initialPosition This is the starting point for piece
 * @param {Position} currPosition This is the current point of the piece
 * @param {matrix} board The board itself
 * 
 * This method will fill the global variable: moves, and must be called
 * by using the method: getPossibleMoves
 *
 */
const piecesPossibleMoves = function(xFactor, initialPosition, currPosition, board) {
    const { x, y } = currPosition;
    const boardLen = board.length;

    // Invalid position validation
    if (!validatePosition(currPosition, boardLen)) {
        return;
    }

    // Already visited position validation
    if (memoBoard[x][y]) {
        return;
    }
    // Mark current position as visited
    memoBoard[x][y] = true;

    // Validate that current position isn't the inital position
    if (x !== initialPosition.x) {
        
        // Validate if the current position isn't blocked by other piece
        if (board[x][y].color !== '') {
            return;
        }

        moves.push(currPosition);
    }

    piecesPossibleMoves(xFactor, initialPosition, new Position(x+xFactor, y+1), board);
    piecesPossibleMoves(xFactor, initialPosition, new Position(x+xFactor, y-1), board);

    return;
};

/**
 * 
 * @param {Piece} piece 
 * @param {Board} board 
 * 
 * Given a piece and the board this function return
 * an array with the possibles moves from this piece
 * in the board.
 */
export const getPossibleMoves = function(piece, board) {
    
    const { color, position } = piece;
    const xFactor = color === WHITE ? 1 : -1;
    
    // initialize memoBoard
    memoBoard = cloneMatrix(board, false);
    // initialize moves array
    moves = [];

    // Call method to fill with possible moves
    piecesPossibleMoves(xFactor, position, position, board);

    return moves;
};

/**
 * 
 * @param {integer} xFactor This is the up or down direction
 * @param {Position} initialPosition This is the starting point for piece
 * @param {Position} currPosition This is the current point of the piece
 * @param {matrix} board The board itself
 * 
 * This method will fill the global variable: jumps, and must be called
 * by using the method: getPossibleJumps
 *
 */
const piecesPossibleJumps = function (xFactor, prevPosition, currPosition, board) {
    const { x, y } = currPosition;
    const boardLen = board.length;
    const color = xFactor > 0 ? WHITE : RED;
    const x1 = xFactor > 0 ? xFactor - 1 : xFactor + 1;
    const y1 = prevPosition.y > y ? y - 1 : y + 1;

    console.log({x1, y1, color});

    // Invalid position validation
    if (!validatePosition(currPosition, boardLen)) {
        return;
    }

    // Already visited position validation
    if (memoBoard[x][y]) {
        return;
    }
    // Mark current position as visited
    memoBoard[x][y] = true;

    // Validate that current position isn't the inital position
    if (x !== prevPosition.x) {

        
        

        // Validate if the current position isn't blocked by other piece
        if (board[x][y].color !== '') {
            return;
        }



        // Validate if the current position isn't blocked by other piece
        // if (board[x1][y1].color === color || board[x1][y1].color === '') {
        //     return;
        // }

        jumps.push(currPosition);
    }

    piecesPossibleJumps(xFactor, currPosition, new Position(x + xFactor, y + 2), board);
    piecesPossibleJumps(xFactor, currPosition, new Position(x + xFactor, y - 2), board);

    return;
};


/**
 * 
 * @param {Piece} piece 
 * @param {Board} board 
 * 
 * Given a piece and the board this function return
 * an array with the possibles jumps from this piece
 * in the board.
 */
export const getPossibleJumps = function(piece, board) {
    
    const { color, position } = piece;
    const xFactor = color === WHITE ? 2 : -2;
    
    // initialize memoBoard
    memoBoard = cloneMatrix(board, false);
    // initialize moves array
    jumps = [];

    // Call method to fill with possible moves
    piecesPossibleJumps(xFactor, position, position, board);

    return jumps;
};

// TODO: complete validation for the new piece position
export const validateNewPiecePosition = function(piece, newpos, board) {
    const { color, position } = piece;
    
    const diffx = Math.abs(position.x - newpos.x);
    const diffy = Math.abs(position.y - newpos.y);

    if (!validatePosition(newpos, board.length)) {
        return false;
    }

    // Validate that new position is empty
    if (board[newpos.x][newpos.y].color !== '') {
        return false;
    }

    // Validate forward movement
    if ( (color === WHITE && newpos.x < position.x) || (color === RED && newpos.x > position.x)) {
        return false;
    }

    // Validate diagonal movement
    if ((newpos.x % 2) === (newpos.y % 2)) {
        return false;
    }

    // Validate x and y difference
    if (diffx !== diffy) {
        return false;
    }

    return true;
};

export const validatePosition = function(pos, len) {
    return (pos.x >= 0 && pos.x < len && pos.y >= 0 && pos.y < len);
};