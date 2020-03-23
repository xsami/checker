// memoBoard is a representation of caching (memoization, dynamic programming)
// wil be used to check the already visited positions
let memoBoard;
// contains the moves in a matrix
let moves;
// contains the jumps in a matrix
let jumps;

// constant COLORS
export const RED = 'red';
export const WHITE = 'white';

// constant range to jump for a piece
export const MAX_RANGE_JUMP = 2;

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
            const oddFlag = ((i % 2) !== (j % 2)); 
            const color = (oddFlag ?  (i < 3) ? WHITE : ((i > 4) ? RED : ''): ''); // color
            newRow[j] = new Piece(color, false, new Position(i, j));
        }
        newBoard.push(newRow);
    }

    return newBoard;
};

// TODO: perform the action to know if a piece will become King
const canBecomeKing = function(piece, board) {

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

        // Validate jump, to eat an enemy piece
        if (!validateJump(new Piece(color, false, prevPosition), currPosition, board)) {
            return;
        }

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


/**
 * 
 * @param {Piece} piece the piece that will be evaluated
 * @param {Position} newpos the new position to be placed
 * @param {Matrix} board the board in which will be performed the action
 * 
 * Validate if you're making a legal jump
 */
export const validateJump = function(piece, newpos, board) {

    const diffx = Math.abs(piece.position.x - newpos.x);
    const xFactor = piece.color === WHITE ? -1 : 1;
    const yFactor = piece.position.y > newpos.y ? 1: -1;

    // Validate if jump over a piece
    if (diffx === MAX_RANGE_JUMP) {
        // Validate you're an enemy piece
        const tmpMiddlePiece = board[newpos.x + xFactor][newpos.y + yFactor];
        if (tmpMiddlePiece.color === piece.color || tmpMiddlePiece.color === '') {
            return false;
        }
    }
    return true;
};


/**
 * 
 * @param {Piece} piece the piece that will be moved
 * @param {Position} newpos the new postion which wants to be moved
 * @param {Matrix} board the board in wich the piece is placed
 * 
 * Validation for the new piece position
 */
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

    // Validate that a piece cannot jump over 2 (MAX_RANGE_JUMP) pieces
    if (diffx > MAX_RANGE_JUMP) {
        return false;
    }

    // Validate jump, to eat an enemy piece
    if (!validateJump(piece, newpos, board)) {
        return false;
    }

    return true;
};

/**
 * 
 * @param {Position} pos position to validate
 * @param {integer} len the length of the board
 * 
 * This function return true if a position(x, y) can
 * be found inside a board of size n x n
 */
export const validatePosition = function(pos, len) {
    return (pos.x >= 0 && pos.x < len && pos.y >= 0 && pos.y < len);
};


const removeDuplicatedPositions = function(array) {
    let result = [];
    array.forEach(element => {
        element.forEach(e => {
            result.push(e);
        });
    });

    return [...result];
};

/**
 * 
 * @param {Matrix} board 
 * @param {string} color 
 * 
 * Get all the possible moves for the "color" (white, red) pieces
 */
export const getAllPossibleMoves = function(board, color) {
    
    let result = [];

    board.forEach(row => {
        row.forEach(piece => {
            if (piece.color === color) {
                result = [...result, getPossibleMoves(piece, board)];
            }
        });
    });
    return removeDuplicatedPositions(result);
};