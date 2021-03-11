import piecesService from './PiecesService';
import { Castling } from './CastlingService';

class MovementsService {
    constructor() {
        
        /**
         * Array of all lettre columns of the board.
         */
        this.lettreToNumber = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];

        /**
         * Map Object of all pieces at the begining of the game.
         */
        this.initPiecesPosition = {
            /** Rooks **/
            'A1': 'Rw',
            'H1': 'Rw',
            'A8': 'Rb',
            'H8': 'Rb',
        
            /** Knights **/
            'B1': 'Nw',
            'G1': 'Nw',
            'B8': 'Nb',
            'G8': 'Nb',
        
            /** Bishops **/
            'C1': 'Bw',
            'F1': 'Bw',
            'C8': 'Bb',
            'F8': 'Bb',
        
            /** Kings **/
            'D1': 'Kw',
            'D8': 'Kb',
        
            /** Queens **/
            'E1': 'Qw',
            'E8': 'Qb',
        
            /** white Pawns **/
            'A2': 'Pw',
            'B2': 'Pw',
            'C2': 'Pw',
            'D2': 'Pw',
            'E2': 'Pw',
            'F2': 'Pw',
            'G2': 'Pw',
            'H2': 'Pw',
        
            /** black Pawns **/
            'A7': 'Pb',
            'B7': 'Pb',
            'C7': 'Pb',
            'D7': 'Pb',
            'E7': 'Pb',
            'F7': 'Pb',
            'G7': 'Pb',
            'H7': 'Pb',
        };

        this.EMPTY = 'empty';
        this.FILLED_BY_OTHER = 'filled-by-other';
        this.FILLED_BY_OWN = 'filled-by-own';
    }
    /**
     * Verify if the opponent is blocked or not'.
     * 
     * @param {String} opponentColor 
     *      Color of the next player.
     * @param {Object} piecesMap 
     *      The map of all pieces on board.
     */
    playerIsBlocked = (opponentColor, piecesMap) => {
        let isBlocked = true;
        for(const position in piecesMap) {
            const selectedPiece = piecesService.getPieceName(piecesMap[position], position);
            if (piecesService.getPieceColor(selectedPiece) === opponentColor) {
                let movements = this.getAvailableMovement(selectedPiece, piecesMap);
                movements = this.removeIllegalMovements(selectedPiece, piecesMap, movements);
                if (movements.length > 0) {
                    isBlocked = false;
                    break;
                }
            }
        }
        return isBlocked;
    }

    /**
     * Verify if the opponent is in check position.
     *
     * @param {String} opponentColor 
     *      Color of the next player.
     * @param {Object} pieceMap 
     *      The map of all pieces on board.
     */
    isCheck = (opponentColor, piecesMap) => {
        let isCheck = false;
        let kingPosition = '';
        let color = piecesService.WHITE_PIECE;
        if (opponentColor === piecesService.WHITE_PIECE) {
            color = piecesService.BLACK_PIECE;
        }
        // King of the opponent
        const king = piecesService.KING + opponentColor;

        // Get the position of the king of the opponent player.
        for (const position in piecesMap) {
            const pieceName = piecesMap[position];
            if (pieceName === king) {
                kingPosition = position;
                break;
            }
        }

        // Get all movements of the opponent after the move.
        const movements = this.getPiecesMovements(color, piecesMap);
            
        // If the King of the opponent is in the available movements.
        if (movements.indexOf(kingPosition) !== -1) {
            isCheck = true;
        }
        return isCheck;
    }
    /**
     * For each possible movement, verify if you apply the movement your King is in check position.
     * If it's the case the movement is illegual.
     * 
     * @param {String} selectedPiece 
     *      The selected piece user wants to move.
     * @param {Object} piecesMap
     *      The map of all pieces on board.
     * @param {Array} movements
     *      The list of all possible movements for the selected piece.
     */
    removeIllegalMovements = (selectedPiece, piecesMap, movements) => {
        let legalMovements = [];
        const playerColor = piecesService.getPieceColor(selectedPiece);
        const opponentColor = (playerColor === piecesService.WHITE_PIECE) ? piecesService.BLACK_PIECE : piecesService.WHITE_PIECE;
        const king = piecesService.KING + playerColor;
        let kingPosition = '';

        // Get the position of the king of the current player.
        for (const position in piecesMap) {
            const pieceName = piecesMap[position];
            if (pieceName === king) {
                kingPosition = position;
                break;
            }
        }
        
        for (const key in movements) {
            // Apply the movement on a fake pieces map.
            let fakeMap = Object.assign({}, piecesMap);
            const movementPosition = movements[key];
            fakeMap = this.move(selectedPiece, movementPosition, movements, fakeMap);

            // Get all movements of the opponent after the move.
            const opponentMovements = this.getPiecesMovements(opponentColor, fakeMap);
            
            // If the King of the player is not in a check position then add to legal movements.
            if (piecesService.isKing(selectedPiece)) {
                if (opponentMovements.indexOf(movementPosition) === -1) {
                    legalMovements.push(movementPosition);
                }
            }
            else {
                if (opponentMovements.indexOf(kingPosition) === -1) {
                    legalMovements.push(movementPosition);
                }
            }

        }
        return legalMovements;
    }

    /**
     * Check if a square is empty and check which piece is on it.
     * 
     * @param {String} newPosition 
     *      Location of the square to be check. 
     */
    checkSquareAvailability = (newPosition) => {
        if (this.piecesPosition[newPosition] !== undefined) {
            const pieceName = this.piecesPosition[newPosition];
            const color = piecesService.getPieceColor(pieceName);
            if (this.pieceColor === color) {
                return this.FILLED_BY_OWN;
            }
            else {
                return this.FILLED_BY_OTHER;
            }
        }
        return this.EMPTY;
    }

    /**
     * Set the new position in the array of available positions.
     *
     * @param {string} newPosition
     *      New position of a piece.
     */
    pushNewPosition = (newPosition) => {
        const squareStatus = this.checkSquareAvailability(newPosition);
        if (squareStatus !== this.FILLED_BY_OWN) {
            this.availableMovements.push(newPosition);
        }
        return squareStatus;
    }

    /**
     * Get all movements of pieces of the same color.
     * 
     * @param {String} color 
     *      Color of pieces to verify.
     * @param {Object} piecesMap 
     *      Location map of all pieces.
     */
    getPiecesMovements = (color, piecesMap) => {
        let movements = [];
        for (const position in piecesMap) {
            const pieceName = piecesMap[position];
            const pieceNameAndPosition = piecesService.getPieceName(pieceName, position);
            const pieceColor = piecesService.getPieceColor(pieceNameAndPosition);
            if (pieceColor === color) {
                const pieceMovements = this.getAvailableMovement(pieceNameAndPosition, piecesMap);
                movements = movements.concat(pieceMovements);
            }
        }
        return movements;
    }    

    /**
     * Get all available movements for a piece.
     * 
     * @param {string} selectedPiece 
     *      The complete piece name (name-position).
     * @param {string} piecesPosition 
     *      Positions of pieces on the board.
     * @param {string} castling 
     *      The castling states.
     * 
     * @return {Array}
     *      The list of available movements.
     */
    getAvailableMovement = (selectedPiece, piecesPosition, castlingState = undefined) => {
        this.pieceType = piecesService.getPieceType(selectedPiece);
        this.pieceColor = piecesService.getPieceColor(selectedPiece);
        this.positionColumn = piecesService.getPositionColumn(selectedPiece);
        this.positionRow = piecesService.getPositionRow(selectedPiece);
        this.columnNumber = this.convertToNumber(this.positionColumn);
        this.piecesPosition = piecesPosition;
        this.availableMovements = [];

        switch(this.pieceType) {
            case piecesService.PAWN:
                this.getPawnAvailablePositions();
                break;

            case piecesService.ROOK:
                this.getRookAvailablePositions();
                break;

            case piecesService.KNIGHT:
                this.getKnightAvailablePositions();
                break;

            case piecesService.BISHOP:
                this.getBishopAvailablePositions();
                break;

            case piecesService.QUEEN:
                this.getQueenAvailablePositions();
                break;
            
            case piecesService.KING:
                this.getKingAvailablePositions(castlingState);
                break;
            
            default:

        }
        return this.availableMovements;
    }

    /**
     * Get all the possible move for the selected Pawn.
     */
    getPawnAvailablePositions = () => {
        let newPosition;
        if (this.pieceColor === piecesService.WHITE_PIECE) {
            newPosition = this.positionColumn + (parseInt(this.positionRow) + 1);
            // Can go straight only if there is no piece in the front of it.
            if (this.piecesPosition[newPosition] === undefined) {
                this.pushNewPosition(newPosition);
                if (parseInt(this.positionRow) === 2) {
                    newPosition = this.positionColumn + (parseInt(this.positionRow) + 2);
                    // Can go straight only if there is no piece in the front of it.
                    if (this.piecesPosition[newPosition] === undefined) {
                        this.pushNewPosition(newPosition);
                    }
                }
            }
            // Check for upper left position
            const leftColumn = this.convertToNumber(this.positionColumn) - 1;
            this.pushPawnDiagonalAsNewPosition(leftColumn, parseInt(this.positionRow) + 1);

            // Check for upper right position
            const rightColumn = this.convertToNumber(this.positionColumn) + 1;
            this.pushPawnDiagonalAsNewPosition(rightColumn, parseInt(this.positionRow) + 1);
            
        }
        else {
            newPosition = this.positionColumn + (parseInt(this.positionRow) - 1);
            // Can go straight only if there is no piece in the front of it.
            if (this.piecesPosition[newPosition] === undefined) {
                this.pushNewPosition(newPosition);
                if (parseInt(this.positionRow) === 7 ) {
                    newPosition = this.positionColumn + (parseInt(this.positionRow) - 2);
                    // Can go straight only if there is no piece in the front of it.
                    if (this.piecesPosition[newPosition] === undefined) {
                        this.pushNewPosition(newPosition);
                    }
                }
            }
            // Check for lower left position
            const leftColumn = this.convertToNumber(this.positionColumn) - 1;
            this.pushPawnDiagonalAsNewPosition(leftColumn, parseInt(this.positionRow) - 1);

            // Check for lower right position
            const rightColumn = this.convertToNumber(this.positionColumn) + 1;
            this.pushPawnDiagonalAsNewPosition(rightColumn, parseInt(this.positionRow) - 1);
        }
    }

    /**
     * Add a Pawn diagonal position to the available movements.
     * 
     * Can go diagonaly only if there is an opponent piece.
     * 
     * @param {String} columnNumber 
     *      Column number of the new position. 
     * @param {*} rowNumber 
     *      Row number of the new position.
     */
    pushPawnDiagonalAsNewPosition = (columnNumber, rowNumber) => {
        if (columnNumber < 9 && columnNumber > 0) {
            const newPosition = this.convertToLetter(columnNumber) + rowNumber;
            if (this.piecesPosition[newPosition] !== undefined) {
                const color = piecesService.getPieceColor(this.piecesPosition[newPosition]);
                if (color !== this.pieceColor) {
                    this.pushNewPosition(newPosition);
                }
            }
        }
    }

    /**
     * Get all the possible move for the selected Rook.
     */
    getRookAvailablePositions = () => {
        let newPosition;
        let squareStatus; 
        for (let i = 1; i < 9; i++) {
            const columnNumber = parseInt(this.columnNumber) + i;
            if (columnNumber > 8) {
                break;
            }
            newPosition = this.convertToLetter(columnNumber) + this.positionRow;
            squareStatus = this.pushNewPosition(newPosition);
            if (squareStatus !== this.EMPTY) {
                break;
            }
        }
        for (let i = 1; i < 9; i++) {
            const columnNumber = parseInt(this.columnNumber) - i;
            if (columnNumber < 1) {
                break;
            }
            newPosition = this.convertToLetter(columnNumber) + this.positionRow;
            squareStatus = this.pushNewPosition(newPosition);
            if (squareStatus !== this.EMPTY) {
                break;
            }
        }
        for (let i = 1; i < 9; i++) {
            const rowNumber = parseInt(this.positionRow) + i;
            if (rowNumber > 8) {
                break;
            }
            newPosition = this.positionColumn + rowNumber;
            squareStatus = this.pushNewPosition(newPosition);
            if (squareStatus !== this.EMPTY) {
                break;
            }
        }

        for (let i = 1; i < 9; i++) {
            const rowNumber = parseInt(this.positionRow) - i;
            if (rowNumber < 1) {
                break;
            }
            newPosition = this.positionColumn + rowNumber;
            squareStatus = this.pushNewPosition(newPosition);
            if (squareStatus !== this.EMPTY) {
                break;
            }
        }
    }

    /**
     * Get all the possible move for the selected Knight.
     */
    getKnightAvailablePositions = () => {
        let newPosition;
        const movements = [-2, -1, 1, 2];
        for (let keyColumn in movements) {
            for (let keyLine in movements) {
                const movColumn = movements[keyColumn];
                const movLine = movements[keyLine];
                if (Math.abs(movColumn) === Math.abs(movLine)) {
                    continue;
                }
                const column = parseInt(this.columnNumber) + movColumn;
                const line = parseInt(this.positionRow) + movLine;
                if (column > 0 && column < 9 && line > 0 && line < 9) {
                    newPosition = this.convertToLetter(column) + line;
                    this.pushNewPosition(newPosition);
                }
            }
        }
    }

    /**
     * Get all the possible move for the selected Bishop.
     */
    getBishopAvailablePositions = () => {
        let newPosition;
        let setUpperRight = true;
        let setUpperLeft = true;
        let setLowerRight = true;
        let setLowerLeft = true;
        let squareStatus;
        for (let i = 1; i < 9; i++) {
            const upperColumn = parseInt(this.columnNumber) + i;
            const upperRow = parseInt(this.positionRow) + i;
            const lowerColumn = parseInt(this.columnNumber) - i;
            const lowerRow = parseInt(this.positionRow) - i;
            if (upperColumn < 9 && upperRow < 9 && setUpperRight) {
                newPosition = this.convertToLetter(upperColumn) + upperRow;
                squareStatus = this.pushNewPosition(newPosition);
                if (squareStatus !== this.EMPTY) {
                    setUpperRight = false;
                }
            }

            if (lowerColumn > 0 && lowerRow > 0 && setLowerLeft) {
                newPosition = this.convertToLetter(lowerColumn) + lowerRow;
                squareStatus = this.pushNewPosition(newPosition);
                if (squareStatus !== this.EMPTY) {
                    setLowerLeft = false;
                }
            }

            if (lowerColumn > 0 && upperRow < 9 && setUpperLeft) {
                newPosition = this.convertToLetter(lowerColumn) + upperRow;
                squareStatus = this.pushNewPosition(newPosition);
                if (squareStatus !== this.EMPTY) {
                    setUpperLeft = false;
                }
            }

            if (upperColumn < 9 && lowerRow > 0 && setLowerRight) {
                newPosition = this.convertToLetter(upperColumn) + lowerRow;
                squareStatus = this.pushNewPosition(newPosition);
                if (squareStatus !== this.EMPTY) {
                    setLowerRight = false;
                }
            }
        }
    }

    /**
     * Get all the possible move for the selected Queen.
     */
    getQueenAvailablePositions = () => {
        this.getRookAvailablePositions();
        this.getBishopAvailablePositions();
    }

    /**
     * Get all the possible move for the selected King.
     */
    getKingAvailablePositions = (castlingState = undefined) => {
        let newPosition;
        for (let columnIndex = -1; columnIndex < 2; columnIndex++) {
            for (let rowIndex = -1; rowIndex < 2; rowIndex++) {
                if (columnIndex === 0 && rowIndex === 0)
                    continue;
                const newColumn = parseInt(this.columnNumber) + columnIndex;
                const newRow = parseInt(this.positionRow) + rowIndex;
                if (newColumn > 0 && newColumn < 9 && newRow > 0 && newRow < 9) {
                    newPosition = this.convertToLetter(newColumn) + newRow;
                    this.pushNewPosition(newPosition);
                }
            }
        }
        if (castlingState !== undefined) {
            if(this.pieceColor === piecesService.WHITE_PIECE) {
                if (castlingState[piecesService.WHITE_PIECE][Castling.CASTLING_SHORT] === Castling.CASTLING_IS_POSSIBLE) {
                    this.pushNewPosition('B1');
                }
                if (castlingState[piecesService.WHITE_PIECE][Castling.CASTLING_LONG] === Castling.CASTLING_IS_POSSIBLE) {
                    this.pushNewPosition('F1');
                }
            }
            else {
                if (castlingState[piecesService.BLACK_PIECE][Castling.CASTLING_SHORT] === Castling.CASTLING_IS_POSSIBLE) {
                    this.pushNewPosition('B8');
                }
                if (castlingState[piecesService.BLACK_PIECE][Castling.CASTLING_LONG] === Castling.CASTLING_IS_POSSIBLE) {
                    this.pushNewPosition('F8');
                }
            }
        }
    }

    /**
     * Move a piece to another square.
     * 
     * @param {String} selectedPiece 
     *      The selected piece to be move.
     * @param {String} targetPosition 
     *      The piece position to be moved to. 
     * @param {Array} availableMovements 
     *      Array of possible movements for the selected piece.
     * @param {Object} piecesMap 
     *      Map of all locations of pieces.
     */
    move = (selectedPiece, targetPosition, availableMovements, piecesMap) => {
        let newPiecesMap = Object.assign({}, piecesMap);
        newPiecesMap = this.removePawnOnEnPassantMovement(selectedPiece, targetPosition, newPiecesMap);
        const currentPosition = piecesService.getCurrentPosition(selectedPiece);
        const currentPiece = piecesService.getPiece(selectedPiece);
        const currentPieceType = piecesService.getPieceType(selectedPiece);
        if (availableMovements.indexOf(targetPosition) !== -1) {
            delete newPiecesMap[currentPosition];
            newPiecesMap[targetPosition] = currentPiece;

            // Apply the Castling move. 
            if (currentPieceType === piecesService.KING) {
                const currentColumn = piecesService.getPositionColumn(currentPosition);
                const targetColumn = piecesService.getPositionColumn(targetPosition);
                // If the king want to move to 2 columns.
                if (Math.abs(parseInt(this.convertToNumber(targetColumn)) - parseInt(this.convertToNumber(currentColumn))) === 2) {
                    switch(targetPosition) {
                        case 'B1':
                            delete newPiecesMap['A1'];
                            newPiecesMap['C1'] = 'Rw';
                        break;

                        case 'B8':
                            delete newPiecesMap['A8'];
                            newPiecesMap['C8'] = 'Rb';
                        break;

                        case 'F1':
                            delete newPiecesMap['H1'];
                            newPiecesMap['E1'] = 'Rw';
                            break;

                        case 'F8':
                            delete newPiecesMap['H8'];
                            newPiecesMap['E8'] = 'Rb';
                        break;
                        default:

                    }
                }
            }

            // this.debugMap(newPiecesMap, 'New Piece moved');
            return newPiecesMap;
        }
        // this.debugMap(piecesMap, 'Old map');
        return piecesMap;
    }

    removePawnOnEnPassantMovement = (selectedPiece, position, piecesMap) => {
        // If it's a Pawn.
        if (piecesService.isPawn(selectedPiece)) {
            // If it changes his column.
            if (piecesService.getPositionColumn(selectedPiece) !== piecesService.getPositionColumn(position)) {
                // If there is no piece on it's target square position.
                if (piecesMap[position] === undefined) {
                    let row = parseInt(piecesService.getPositionRow(position));
                    const column = piecesService.getPositionColumn(position);
                    let pawnToDeletePosition = '';

                    // if there is a pawn of a different color behind it.
                    if (piecesService.getPieceColor(selectedPiece) === piecesService.WHITE_PIECE) {
                        row = row - 1;
                        pawnToDeletePosition = column + row;
                    }
                    else {
                        row = row + 1;
                        pawnToDeletePosition = column + row;
                    }
                    const pawnToDelete = piecesMap[pawnToDeletePosition];
                    if (pawnToDelete !== undefined 
                        && piecesService.isPawn(pawnToDelete)
                        && piecesService.getPieceColor(pawnToDelete) !== piecesService.getPieceColor(selectedPiece)) {
                        // delete pawn due to "En passant" functionnality.
                        delete piecesMap[pawnToDeletePosition];
                    }
                }
            }
        }
       return piecesMap;
    }

    /**
     * Help function used to see board data in JavaScript console.
     * 
     * @param {Object} map 
     *      Map Object of pieces.
     * @param {String} label 
     *      Title to be shown before the map.
     */
    debugMap = (map, label = 'Map') => {
        const space = 35 - label.length;
        console.log('---------------------------------------');
        let headText = '|';
        for(let i = 0 ; i < (space/2); i++) {
            headText = headText + ' ';
        }
        headText = headText + label;
        for(let i = 0 ; i < (space/2); i++) {
            headText = headText + ' ';
        }
        headText = headText + '|';
        console.log(headText);
        console.log('---------------------------------------');
        console.log(' ');
        for(let iLine = 8 ; iLine > 0; iLine--) {
            
            let line = '';
            for(let iColumn = 1 ; iColumn < 9; iColumn++) {
                const square = this.convertToLetter(iColumn) + iLine;
                if (map[square] === undefined) {
                    line = line + '  ';
                }
                else {
                    line = line + map[square];
                }
                line = line + ' ';
            }
            console.log(line);
        }
    }

    /**
     * Convert a column number to the equivant letter.
     *
     * @param {String} number 
     */
    convertToLetter = (number) => {
        let lettre;
        if (number > 0 && number < 9) {
            lettre = this.lettreToNumber[parseInt(number)-1];
        }
        return lettre;
    }

        /**
     * Convert a column lettre to the equivant number.
     *
     * @param {String} number 
     */
    convertToNumber = (lettre) => {
        let number = this.lettreToNumber.indexOf(lettre);
        if (number !== -1) {
            number = number + 1;
        }
        return number;
    }
}

const movementsService = new MovementsService();
export default movementsService;