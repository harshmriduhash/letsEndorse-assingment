import piecesService from './PiecesService';
import movementsService from './MovementsService';

class CastlingService {

    /* Castling type */
    static CASTLING_SHORT = 'castling short';
    static CASTLING_LONG = 'castling long';

    /* Castling status */
    static CASTLING_IS_POSSIBLE = 'castling is possible';
    static CASTLING_IS_FORBIDDEN = 'castling is forbidden';
    static CASTLING_IS_CURRENTLY_NOT_POSSIBLE = 'castling is temporary not possible';

    constructor() {
        this.castingLines = {
            [piecesService.BLACK_PIECE] : {
                [CastlingService.CASTLING_SHORT] : [
                    'A8','B8','C8','D8' 
                ],
                [CastlingService.CASTLING_LONG] : [
                    'D8','E8','F8','G8','H8' 
                ],
            },
            [piecesService.WHITE_PIECE] : {
                [CastlingService.CASTLING_SHORT] : [
                    'A1','B1','C1','D1' 
                ],
                [CastlingService.CASTLING_LONG] : [
                    'D1','E1','F1','G1','H1' 
                ],
            },
        };

        this.initCastling = {
            [piecesService.WHITE_PIECE] : {
                [CastlingService.CASTLING_SHORT] : CastlingService.CASTLING_IS_CURRENTLY_NOT_POSSIBLE,
                [CastlingService.CASTLING_LONG] : CastlingService.CASTLING_IS_CURRENTLY_NOT_POSSIBLE
            },
            [piecesService.BLACK_PIECE] : {
                [CastlingService.CASTLING_SHORT] : CastlingService.CASTLING_IS_CURRENTLY_NOT_POSSIBLE,
                [CastlingService.CASTLING_LONG] : CastlingService.CASTLING_IS_CURRENTLY_NOT_POSSIBLE
            },
        };
    }

    evaluateCastling = (selectedPiece, piecesMap, castlingState) => {
        this.color = piecesService.getPieceColor(selectedPiece);
        this.castlingState = Object.assign({}, castlingState);
        this.piecesMap = piecesMap;
        this.opponentPiecesMovements = undefined;

        // If castling is forbidden then stop the process.
        if (this.castlingShortIsForbidden() && this.castlingLongIsForbidden()) {
            return this.castlingState;
        }

        // Verify that King has moved.
        this.verifyKingMoved();

        // Verify if the two Rooks have moved.
        this.verifyShortRookMoved();
        this.verifyLongRookMoved();

        // If castling is forbidden then stop the process.
        let shortIsForbidden = this.castlingShortIsForbidden();
        let longIsForbidden = this.castlingLongIsForbidden();
        if (shortIsForbidden && longIsForbidden) {
            return this.castlingState;
        }

        
        if (!shortIsForbidden) {
            // Verify the line of casting short is empty of piece.
            const shortLineIsEmpty = this.shortCastlingLineIsEmpty();
            if (shortLineIsEmpty) {
                // Verify the line of casting short is not intersected by the opponent pieces.
               this.shortCastlingLineIntersection();
            }
        }

        if (!longIsForbidden) {
            // Verify the line of casting long is empty of piece.
            const longLineIsEmpty = this.longCastlingLineIsEmpty();
            if (longLineIsEmpty) {
                // Verify the line of casting long is not intersected by the opponent pieces.
                this.longCastlingLineIntersection();
            }
        }
        return this.castlingState;
    }

    /**
     * Verify the line of casting short is not intersected by the opponent pieces.
     */
    shortCastlingLineIntersection = () => {
        const opponentColor = (this.color === piecesService.WHITE_PIECE) ? piecesService.BLACK_PIECE :piecesService.WHITE_PIECE;
        this.opponentPiecesMovements = movementsService.getPiecesMovements(opponentColor, this.piecesMap);
        const intersection = this.castingLines[this.color][CastlingService.CASTLING_SHORT].filter(x => this.opponentPiecesMovements.includes(x));
        if (intersection.length > 0) {
            this.castlingState[this.color][CastlingService.CASTLING_SHORT] = CastlingService.CASTLING_IS_CURRENTLY_NOT_POSSIBLE;
        }
        else {
            this.castlingState[this.color][CastlingService.CASTLING_SHORT] = CastlingService.CASTLING_IS_POSSIBLE;
        }
    }

    /**
     * Verify the line of casting long is not intersected by the opponent pieces.
     */
    longCastlingLineIntersection = () => {
        const opponentColor = (this.color === piecesService.WHITE_PIECE) ? piecesService.BLACK_PIECE :piecesService.WHITE_PIECE;
        if (this.opponentPiecesMovements === undefined) {
            this.opponentPiecesMovements = movementsService.getPiecesMovements(opponentColor, this.piecesMap);
        }
        const intersection = this.castingLines[this.color][CastlingService.CASTLING_LONG].filter(x => this.opponentPiecesMovements.includes(x)); 
        if (intersection.length > 0) {
            this.castlingState[this.color][CastlingService.CASTLING_LONG] = CastlingService.CASTLING_IS_CURRENTLY_NOT_POSSIBLE;
        }
        else {
            this.castlingState[this.color][CastlingService.CASTLING_LONG] = CastlingService.CASTLING_IS_POSSIBLE;
        }
    }

    /**
     * Verify the line of casting short is empty of piece.
     */
    shortCastlingLineIsEmpty = () => {
        let isEmpty = false;
        if (this.color === piecesService.WHITE_PIECE) {
            if (this.piecesMap['B1'] === undefined && this.piecesMap['C1'] === undefined) {
                isEmpty = true;
            }
        }
        else {
            if (this.piecesMap['B8'] === undefined && this.piecesMap['C8'] === undefined) {
                isEmpty = true;
            }
        }

        if (isEmpty) {
            this.castlingState[this.color][CastlingService.CASTLING_SHORT] = CastlingService.CASTLING_IS_POSSIBLE;
        }
        else {
            this.castlingState[this.color][CastlingService.CASTLING_SHORT] = CastlingService.CASTLING_IS_CURRENTLY_NOT_POSSIBLE;
        }
        return isEmpty;
    }

    /**
     * Verify the line of casting long is empty of piece.
     */
    longCastlingLineIsEmpty = () => {
        let isEmpty = false;
        if (this.color === piecesService.WHITE_PIECE) {
            if (this.piecesMap['E1'] === undefined && this.piecesMap['F1'] === undefined && this.piecesMap['G1'] === undefined) {
                isEmpty = true;
            }
        }
        else {
            if (this.piecesMap['E8'] === undefined && this.piecesMap['F8'] === undefined && this.piecesMap['G8'] === undefined) {
                isEmpty = true;
            }
        }

        if (isEmpty) {
            this.castlingState[this.color][CastlingService.CASTLING_LONG] = CastlingService.CASTLING_IS_POSSIBLE;
        }
        else {
            this.castlingState[this.color][CastlingService.CASTLING_LONG] = CastlingService.CASTLING_IS_CURRENTLY_NOT_POSSIBLE;
        }
        return isEmpty;
    }

    /**
     * Verify if the Long Rook has moved and write state.
     * 
     * Set only the castling to forbidden if needed. 
     */
    verifyLongRookMoved = () => {
        let rookMoved = false;
        if (this.color === piecesService.WHITE_PIECE) {
                // Check the white Rook location.
                if (this.piecesMap['H1'] !== 'Rw') {
                    rookMoved = true;
                }
        }
        else {
            // Check the black Rook location.
            if (this.piecesMap['H8'] !== 'Rb') {
                rookMoved = true;
            }

        }
        if (rookMoved) {
            this.castlingState[this.color][CastlingService.CASTLING_LONG] = CastlingService.CASTLING_IS_FORBIDDEN;
        }
        return rookMoved;
    }

    /**
     * Verify if the Short Rook has moved and write state.
     * 
     * Set only the castling to forbidden if needed. 
     */
    verifyShortRookMoved = () => {
        let rookMoved = false;
        if (this.color === piecesService.WHITE_PIECE) {
                // Check the white Rook location.
                if (this.piecesMap['A1'] !== 'Rw') {
                    rookMoved = true;
                }
        }
        else {
            // Check the black Rook location.
            if (this.piecesMap['A8'] !== 'Rb') {
                rookMoved = true;
            }

        }
        if (rookMoved) {
            this.castlingState[this.color][CastlingService.CASTLING_SHORT] = CastlingService.CASTLING_IS_FORBIDDEN;
        }
        return rookMoved;
    }

    /**
     * Verify if the King has moved and write state.
     * 
     * Set only the castling to forbidden if needed. 
     */
    verifyKingMoved = () => {
        let kingMoved = false;
        if (this.color === piecesService.WHITE_PIECE) {
            // Check the white King location.
            if (this.piecesMap['D1'] !== 'Kw') {
                kingMoved = true;
            }
        }
        else {
            // Check the black King location.
            if (this.piecesMap['D8'] !== 'Kb') {
                kingMoved = true;
            }
        }
        if (kingMoved) {
            this.castlingState[this.color][CastlingService.CASTLING_SHORT] = CastlingService.CASTLING_IS_FORBIDDEN;
            this.castlingState[this.color][CastlingService.CASTLING_LONG] = CastlingService.CASTLING_IS_FORBIDDEN;
        }
        return kingMoved;
    }

    castlingShortIsForbidden = () => {
        let isForbidden = false;
        if (this.castlingState[this.color][CastlingService.CASTLING_SHORT] === CastlingService.CASTLING_IS_FORBIDDEN) {
            isForbidden = true;
        }
        return isForbidden;
    }

    castlingLongIsForbidden = () => {
        let isForbidden = false;
        if (this.castlingState[this.color][CastlingService.CASTLING_LONG] === CastlingService.CASTLING_IS_FORBIDDEN) {
            isForbidden = true;
        }
        return isForbidden;
    }
}

export const castlingService = new CastlingService();
export const Castling = CastlingService;